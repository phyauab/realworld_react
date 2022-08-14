import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/common/User";

export interface AppState {
  user?: User;
  isLogin: Boolean;
}

const initialState: AppState = {
  user: undefined,
  isLogin: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<User | undefined>) => {
      state.user = user;
      if (user) {
        state.isLogin = true;
        // localStorage.setItem("user", JSON.stringify(user));
      } else {
        state.isLogin = false;
      }
    },
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;
