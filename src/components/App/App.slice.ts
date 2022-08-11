import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/common/User.";

export interface AppState {
  user?: User;
}

const initialState: AppState = {
  user: undefined,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
    },
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;
