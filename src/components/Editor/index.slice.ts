import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorArticleRequest } from "../../models/article/EditorArticleRequest";
import { EditorArticleState } from "../../models/article/EditorArticle";
import { ValidationErrorResponse } from "../../models/common/ValidationErrorResponse";
import articleService from "../../services/article";

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

export const fetchArticle = createAsyncThunk(
  "editor/article",
  async (slug: string, thunkAPI) => {
    const response = await articleService.getArticle(slug);
    return response.data.article;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.editorArticleRequest.article = {
        title: action.payload.title,
        description: action.payload.description,
        body: action.payload.body,
        tagList: action.payload.tagList,
      };
    });
  },
});

export const { updateField, setError, resetState } = slice.actions;
export default slice.reducer;
