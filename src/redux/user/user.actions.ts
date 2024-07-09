import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, initialState } from "./user.interface";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice;
