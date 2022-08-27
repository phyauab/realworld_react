import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import myAxios from "../../common/axios";
import { User } from "../../models/common/User";

export interface AppState {
  user?: User;
  isLogin: Boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  user: undefined,
  isLogin: false,
  isLoading: true,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<User | undefined>) => {
      state.user = user;
      if (user) {
        state.isLogin = true;
        localStorage.setItem("realworld_token", user.token);
        myAxios.defaults.headers.common[
          "Authorization"
        ] = `Token ${user.token}`;
      } else {
        state.isLogin = false;
        state.user = undefined;
        localStorage.removeItem("realworld_token");
        delete myAxios.defaults.headers.common["Authorization"];
      }
    },
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isLoading = isLoading;
    },
  },
});

export const { setUser, setIsLoading } = slice.actions;
export default slice.reducer;
