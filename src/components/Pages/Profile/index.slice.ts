import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";
import { ArticleTab } from "../../../models/common/ArticleTab";
import { Profile } from "../../../models/profile/Profile";
import articleService from "../../../services/article";

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
      getArticles: articleService.listArticles,
      isAlwaysShow: true,
      isSelected: true,
      loginRequired: false,
      params: {
        limit: 10,
        offset: 0,
      },
    },
    {
      title: "Favorited Articles",
      getArticles: articleService.listArticles,
      isAlwaysShow: true,
      isSelected: false,
      loginRequired: false,
      params: {
        limit: 10,
        offset: 0,
      },
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
    setSelectedTab: (state, { payload: index }: PayloadAction<number>) => {
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
  setSelectedTab,
  setArticles,
  resetState,
} = slice.actions;
export default slice.reducer;
