import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../models/article/Article";
import { ArticleListParam } from "../../models/article/ArticleListParam";
import { MultipleArticleResponse } from "../../models/article/MutipleArticleResponse";
import articleService from "../../services/article";

export interface ArticleListViewerState {
  articles: MultipleArticleResponse;
}

const initialState: ArticleListViewerState = {
  articles: {
    articles: [],
    articlesCount: 0,
  },
};

export const getArticles = createAsyncThunk(
  "articleListViwer",
  async (
    { params, mode }: { params: ArticleListParam; mode: string },
    thunkAPI
  ) => {
    switch (mode) {
      case "list":
      case "tag":
      case "author":
      case "favorited":
        return (await articleService.listArticles(params)).data;
      case "feed":
        return (await articleService.feedArticles(params)).data;
      default:
        return (await articleService.listArticles(params)).data;
    }
  }
);

const slice = createSlice({
  name: "articleListViewer",
  initialState,
  reducers: {
    setArticles: (
      state,
      { payload: articles }: PayloadAction<MultipleArticleResponse>
    ) => {
      state.articles = articles;
    },
    setArticle: (
      state,
      {
        payload: { article, index },
      }: PayloadAction<{ article: Article; index: number }>
    ) => {
      if (!state.articles) return;
      state.articles.articles[index] = article;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.articles.articles = action.payload.articles;
    });
  },
});

export const { setArticles, setArticle, resetState } = slice.actions;
export default slice.reducer;
