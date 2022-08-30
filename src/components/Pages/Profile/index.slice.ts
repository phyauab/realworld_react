import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";
import { ArticleTab } from "../../../models/common/ArticleTab";
import { Profile } from "../../../models/profile/Profile";

export interface ProfileState {
  profile?: Profile;
  isLoading: boolean;
  isFollowing: boolean;
  tabs: ArticleTab[];
  articles: MultipleArticleResponse;
}

const initialState: ProfileState = {
  profile: undefined,
  isLoading: false,
  isFollowing: false,
  tabs: [
    {
      title: "My Articles",
      isAlwaysShow: true,
      isSelected: true,
      loginRequired: false,
      mode: "author",
    },
    {
      title: "Favorited Articles",
      isAlwaysShow: true,
      isSelected: false,
      loginRequired: false,
      mode: "favorited",
    },
  ],
  articles: {
    articles: [],
    articlesCount: 0,
  },
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload: profile }: PayloadAction<Profile>) => {
      state.profile = profile;
    },
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isLoading = isLoading;
    },
    setIsFollowing: (
      state,
      { payload: isFollowing }: PayloadAction<boolean>
    ) => {
      state.isFollowing = isFollowing;
    },
    setTab: (state, { payload: index }: PayloadAction<number>) => {
      state.tabs.forEach((tab: ArticleTab) => (tab.isSelected = false));
      state.tabs[index].isSelected = true;
    },
    setArticles: (
      state,
      { payload: articles }: PayloadAction<MultipleArticleResponse>
    ) => {
      state.articles = articles;
    },
    resetState: () => initialState,
  },
});

export const {
  setProfile,
  setIsLoading,
  setIsFollowing,
  setTab,
  setArticles,
  resetState,
} = slice.actions;
export default slice.reducer;
