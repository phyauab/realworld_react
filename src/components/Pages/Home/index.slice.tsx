import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
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
    setArticle: (
      state,
      {
        payload: { article, index },
      }: PayloadAction<{ article: Article; index: number }>
    ) => {
      if (!state.globalFeeds) return;
      state.globalFeeds.articles[index] = article;
    },
  },
});

export const { setGlobalFeeds, setArticle } = slice.actions;
export default slice.reducer;
