import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateUserRequest } from "../../../models/user/UpdateUserRequest";

export interface SettingState {
  updateUserRequest: UpdateUserRequest;
  isLoading: boolean;
}

const initialState: SettingState = {
  updateUserRequest: {
    user: {
      email: undefined,
      username: undefined,
      password: undefined,
      image: undefined,
      bio: undefined,
    },
  },
  isLoading: false,
};

const slice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{
        name: keyof UpdateUserRequest["user"];
        value: string | undefined;
      }>
    ) => {
      if (value === "") {
        value = undefined;
      }
      state.updateUserRequest.user[name] = value;
    },
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      console.log("here");
      state.isLoading = isLoading;
    },
    resetState: () => initialState,
  },
});

export const { resetState, updateField, setIsLoading } = slice.actions;
export default slice.reducer;
