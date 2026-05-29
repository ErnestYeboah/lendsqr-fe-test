import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface User {
  joinedAt: string;
  name: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: number;
  residence: string;
  educationLevel: string;
  status: string;
  company: string;
  durationOfEmployment: number;
  loanRepayment: string;
  income: string;
  guarantorEmail: string;
  guarantorPhoneNumber: string;
  sector: string;
  id: string;
}

interface State {
  users: User[];
  usersByPage: Record<number, User[]>;
  fetchedPages: number[];
  totalUsers: number;
  status: "idle" | "pending" | "success" | "failed";
  showSideBar: boolean;
  selectedUser: User | null;
}

interface FetchUsersResponse {
  users: User[];
  page: number;
  totalUsers: number;
}

const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem("selectedUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("selectedUser", JSON.stringify(user));
};

const updateUserInCollections = (state: State, updatedUser: User) => {
  state.users = state.users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user,
  );

  Object.keys(state.usersByPage).forEach((page) => {
    state.usersByPage[Number(page)] = state.usersByPage[Number(page)].map(
      (user) => (user.id === updatedUser.id ? updatedUser : user),
    );
  });

  if (state.selectedUser?.id === updatedUser.id) {
    state.selectedUser = updatedUser;
    saveUserToLocalStorage(updatedUser);
  }
};

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  number | undefined,
  { state: { users: State } }
>(
  "fetch_users",
  async (payload: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://lendsqr-api-zxvj.onrender.com/users?_page=${payload}_limit=10`,
      );
      return {
        users: response.data.data,
        page: payload,
        totalUsers: response.data.items,
      };
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data || "Could not fetch users");
      }
      return rejectWithValue(
        "An error occured , please check your internet connection",
      );
    }
  },
  {
    condition: (payload = 1, { getState }) => {
      const { usersByPage, status } = getState().users;

      return status !== "pending" && !usersByPage[payload];
    },
  },
);

const initialState: State = {
  users: [],
  usersByPage: {},
  fetchedPages: [],
  totalUsers: 0,
  status: "idle",
  showSideBar: false,
  selectedUser: getUserFromLocalStorage(),
};

export const UsersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    toggleSideBar(state, action: { payload: boolean }) {
      state.showSideBar = action.payload;
    },
    activateUser(state, action: { payload: User }) {
      updateUserInCollections(state, action.payload);
    },
    blacklistUser(state, action: { payload: User }) {
      updateUserInCollections(state, action.payload);
    },

    saveUser(state, action: { payload: User }) {
      const user = action.payload;
      state.selectedUser = user;
      saveUserToLocalStorage(user);
    },

    clearSelectedUser(state) {
      state.selectedUser = null;
      localStorage.removeItem("selectedUser");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { page, users, totalUsers } = action.payload;

        state.status = "success";
        state.users = [...state.users, ...users];
        state.usersByPage[page] = users;
        state.fetchedPages.push(page);
        state.totalUsers = totalUsers;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
        toast.error("An error occured , could not fetch user data");
      });
  },
});

export default UsersSlice.reducer;
export const usersReducer = (state: { users: State }) => state.users;
export const {
  toggleSideBar,
  activateUser,
  blacklistUser,
  saveUser,
  clearSelectedUser,
} = UsersSlice.actions;
