import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../models/auth/LoginRequest";

interface LoginState {
  loginRequest: LoginRequest;
  hi: string;
}

const initialState: LoginState = {
  loginRequest: {
    user: {
      email: "",
      password: "",
    },
  },
  hi: "hi",
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof LoginRequest["user"]; value: string }>
    ) => {
      state.loginRequest.user[name] = value;
    },
  },
});

export const { updateField } = slice.actions;
export default slice.reducer;
