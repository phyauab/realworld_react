import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditorArticleState } from "../../../models/article/EditorArticle";

const initialState: EditorArticleState = {
  title: "",
  description: "",
  body: "",
  tags: undefined,
};

const slice = createSlice({
  name: "createArticle",
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
  },
});

export const { updateField } = slice.actions;
export default slice.reducer;
