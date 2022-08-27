import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { Profile } from "../../../models/profile/Profile";

export interface ArticleState {
  article?: Article;
  isLoading: boolean;
  isFollowing: boolean;
  isFavoriting: boolean;
}

const initialState: ArticleState = {
  article: undefined,
  isLoading: false,
  isFollowing: false,
  isFavoriting: false,
};

const slice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticle(state, { payload: article }: PayloadAction<Article>) {
      state.article = article;
    },
    setIsLoading(state, { payload: isLoading }: PayloadAction<boolean>) {
      state.isLoading = isLoading;
    },
    setIsFollowing(state, { payload: isFollowing }: PayloadAction<boolean>) {
      state.isFollowing = isFollowing;
    },
    setIsFavoriting(state, { payload: isFavoriting }: PayloadAction<boolean>) {
      state.isFavoriting = isFavoriting;
    },
    setAuthor(state, { payload: author }: PayloadAction<Profile>) {
      if (state.article) {
        state.article.author = author;
      }
    },
    resetState: () => initialState,
  },
});

export const {
  setArticle,
  setIsLoading,
  setIsFollowing,
  setIsFavoriting,
  setAuthor,
  resetState,
} = slice.actions;
export default slice.reducer;
