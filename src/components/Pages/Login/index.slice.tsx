import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import { ValidationErrorResponse } from "../../../models/common/ValidationErrorResponse";

export interface LoginState {
  loginRequest: LoginRequest;
  error?: ValidationErrorResponse;
}

const initialState: LoginState = {
  loginRequest: {
    user: {
      email: "",
      password: "",
    },
  },
  error: undefined,
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
    setError: (
      state,
      { payload: e }: PayloadAction<ValidationErrorResponse | undefined>
    ) => {
      state.error = e;
    },
  },
});

export const { updateField, setError } = slice.actions;
export default slice.reducer;
