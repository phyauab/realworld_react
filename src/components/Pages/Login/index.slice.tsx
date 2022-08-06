import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../../../models/auth/LoginRequest";

const initialState: LoginRequest = {
  user: {
    email: "",
    password: "",
  },
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
      console.log(name);
      state.user[name] = value;
    },
    login: () => {},
  },
});

export const { updateField } = slice.actions;
export default slice.reducer;
