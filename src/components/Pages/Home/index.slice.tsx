import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";

export interface HomeState {
  feeds?: MultipleArticleResponse;
  feedToggle: string;
  tags?: string[];
  tag?: string;
}

const initialState: HomeState = {
  feeds: undefined,
  feedToggle: "globalFeed",
  tags: undefined,
  tag: undefined,
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setFeeds: (
      state,
      { payload: feeds }: PayloadAction<MultipleArticleResponse>
    ) => {
      state.feeds = feeds;
    },
    setArticle: (
      state,
      {
        payload: { article, index },
      }: PayloadAction<{ article: Article; index: number }>
    ) => {
      if (!state.feeds) return;
      state.feeds.articles[index] = article;
    },
    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags;
    },
    setTag: (state, { payload: tag }: PayloadAction<string | undefined>) => {
      state.tag = tag;
    },
    setFeedToggle: (state, { payload: feedToggle }: PayloadAction<string>) => {
      state.feedToggle = feedToggle;
    },
  },
});

export const { setFeeds, setArticle, setTags, setTag, setFeedToggle } =
  slice.actions;
export default slice.reducer;
