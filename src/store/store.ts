import { configureStore } from "@reduxjs/toolkit";
import Usersreducer from "./features/users_slice";

export const store = configureStore({
  reducer: {
    users: Usersreducer,
  },
});

export type AppDispatch = typeof store.dispatch;
