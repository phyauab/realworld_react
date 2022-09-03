import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleTab } from "../../../models/common/ArticleTab";
import tagService from "../../../services/tag";

export interface HomeState {
  tabs: ArticleTab[];
  tags: string[];
  selectedTag?: string;
}

const initialState: HomeState = {
  tabs: [
    {
      title: "Your Feed",
      mode: "feed",
      loginRequired: true,
      isSelected: true,
      isAlwaysShow: true,
    },
    {
      title: "Global Feed",
      mode: "list",
      loginRequired: false,
      isSelected: false,
      isAlwaysShow: true,
    },
    {
      title: "",
      mode: "tag",
      isAlwaysShow: false,
      isSelected: false,
      loginRequired: false,
    },
  ],
  tags: [],
  selectedTag: undefined,
};

export const fetchTags = createAsyncThunk("home/tags", async (thunkAPI) => {
  const response = await tagService.getTags();
  return response.data.tags;
});

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags;
    },
    setTag: (state, { payload: tag }: PayloadAction<string>) => {
      state.tabs.forEach((tab: ArticleTab) => (tab.isSelected = false));
      state.tabs[state.tabs.length - 1].title = tag;
      state.tabs[state.tabs.length - 1].isSelected = true;
    },
    setSelectedTab: (state, { payload: index }: PayloadAction<number>) => {
      state.tabs.forEach((tab: ArticleTab) => (tab.isSelected = false));
      state.tabs[index].isSelected = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export const { setTags, setTag, setSelectedTab } = slice.actions;
export default slice.reducer;
