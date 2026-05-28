import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
}

interface FetchUsersResponse {
  users: User[];
  page: number;
  totalUsers: number;
}

export const fetchUsers = createAsyncThunk<
  FetchUsersResponse,
  number | undefined,
  { state: { users: State } }
>(
  "fetch_users",
  async (payload: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?_page=${payload}&_per_page=10`,
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
};

export const UsersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    toggleSideBar(state, action: { payload: boolean }) {
      state.showSideBar = action.payload;
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
      });
  },
});

export default UsersSlice.reducer;
export const usersReducer = (state: { users: State }) => state.users;
export const { toggleSideBar } = UsersSlice.actions;
