import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../../models/profile/Profile";

export interface ProfileState {
  profile?: Profile;
  isLoading: boolean;
  isFollowing: boolean;
}

const initialState: ProfileState = {
  profile: undefined,
  isLoading: false,
  isFollowing: false,
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      state.profile = profile;
    },
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isLoading = isLoading;
    },
    setIsFollowing: (
      state,
      { payload: isFollowing }: PayloadAction<boolean>
    ) => {
      state.isFollowing = isFollowing;
    },
    resetState: () => initialState,
  },
});

export const { setProfile, setIsLoading, setIsFollowing, resetState } =
  slice.actions;
export default slice.reducer;
