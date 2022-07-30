import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    email: string;
    password: string;
  };
}

const initialState: LoginState = {
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
      }: PayloadAction<{ name: keyof LoginState["user"]; value: string }>
    ) => {
      console.log(name);
      state.user[name] = value;
    },
  },
});

export const { updateField } = slice.actions;
export default slice.reducer;
