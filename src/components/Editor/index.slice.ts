import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorArticleState } from "../../models/article/EditorArticle";

const initialState: EditorArticleState = {
  title: "",
  description: "",
  body: "",
  tags: undefined,
};

const slice = createSlice({
  name: "editorArticle",
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
      state[name] = value;
    },
    resetState: (state) => {
      state.title = "";
      state.description = "";
      state.body = "";
      state.tags = undefined;
    },
  },
});

export const { updateField, resetState } = slice.actions;
export default slice.reducer;
