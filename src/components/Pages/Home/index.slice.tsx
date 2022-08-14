import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";

export interface HomeState {
  globalFeeds?: MultipleArticleResponse;
  tags?: string[];
}

const initialState: HomeState = {
  globalFeeds: undefined,
  tags: undefined,
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
    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags;
    },
  },
});

export const { setGlobalFeeds, setArticle, setTags } = slice.actions;
export default slice.reducer;
