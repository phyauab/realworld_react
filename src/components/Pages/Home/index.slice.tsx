import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";

export interface HomeState {
  globalFeeds?: MultipleArticleResponse;
}

const initialState: HomeState = {
  globalFeeds: undefined,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setGlobalFeeds: (
      state,
      { payload: globalFeeds }: PayloadAction<MultipleArticleResponse>
    ) => {
      state.globalFeeds = globalFeeds;
    },
  },
});

export const { setGlobalFeeds } = slice.actions;
export default slice.reducer;
