import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { Comment } from "../../../models/comment/Comment";
import { CommentRequest } from "../../../models/comment/CommentRequest";
import { MultipleCommentResponse } from "../../../models/comment/MultipleCommentResponse";
import { Profile } from "../../../models/profile/Profile";

export interface ArticleState {
  article?: Article;
  comments: MultipleCommentResponse;
  commentRequest: CommentRequest;
  isLoading: boolean;
  isFollowing: boolean;
  isFavoriting: boolean;
}

const initialState: ArticleState = {
  article: undefined,
  comments: { comments: [] },
  commentRequest: { comment: { body: "" } },
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
    updateComment(state, { payload: comment }: PayloadAction<string>) {
      state.commentRequest.comment.body = comment;
    },
    setComments(
      state,
      {
        payload: multipleCommentResponse,
      }: PayloadAction<MultipleCommentResponse>
    ) {
      state.comments = multipleCommentResponse;
    },
    appendComment(state, { payload: comment }: PayloadAction<Comment>) {
      state.comments.comments = [comment, ...state.comments.comments];
    },
    removeComment(state, { payload: id }: PayloadAction<Number>) {
      state.comments.comments = state.comments.comments.filter(
        (comment: Comment) => comment.id !== id
      );
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
  updateComment,
  setComments,
  appendComment,
  removeComment,
  resetState,
} = slice.actions;
export default slice.reducer;
