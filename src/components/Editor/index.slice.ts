import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorArticleRequest } from "../../models/article/EditorArticleRequest";
import { EditorArticleState } from "../../models/article/EditorArticle";
import { ValidationErrorResponse } from "../../models/common/ValidationErrorResponse";

export interface EditorState {
  editorArticleRequest: EditorArticleRequest;
  error?: ValidationErrorResponse;
}

const initialState: EditorState = {
  editorArticleRequest: {
    article: {
      title: "",
      description: "",
      body: "",
      tagList: undefined,
    },
  },
  error: undefined,
};

const slice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateField: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{
        name: keyof EditorArticleState;
        value: string;
      }>
    ) => {
      if (name === "tags") {
        state.editorArticleRequest.article.tagList = value.split(",");
      } else {
        state.editorArticleRequest.article[name] = value;
      }
    },
    setError: (
      state,
      { payload: e }: PayloadAction<ValidationErrorResponse | undefined>
    ) => {
      state.error = e;
    },
    resetState: () => initialState,
  },
});

export const { updateField, setError, resetState } = slice.actions;
export default slice.reducer;
