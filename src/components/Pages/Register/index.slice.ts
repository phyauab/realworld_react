import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRequest } from "../../../models/auth/RegisterRequest";
import { ValidationErrorResponse } from "../../../models/common/ValidationErrorResponse";

export interface RegisterState {
  registerRequest: RegisterRequest;
  error?: ValidationErrorResponse;
  isLoading: boolean;
}

const initialState: RegisterState = {
  registerRequest: {
    user: {
      username: "",
      email: "",
      password: "",
    },
  },
  error: undefined,
  isLoading: false,
};

const slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: keyof RegisterRequest["user"]; value: string }>
    ) => {
      state.registerRequest.user[name] = value;
    },
    setError: (
      state,
      { payload: e }: PayloadAction<ValidationErrorResponse | undefined>
    ) => {
      state.error = e;
    },
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isLoading = isLoading;
    },
    resetState: () => initialState,
  },
});

export const { updateField, setError, setIsLoading, resetState } =
  slice.actions;
export default slice.reducer;
