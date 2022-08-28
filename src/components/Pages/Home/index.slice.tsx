import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../../models/article/Article";
import { MultipleArticleResponse } from "../../../models/article/MutipleArticleResponse";
import { ArticleTab } from "../../../models/common/ArticleTab";
import articleService from "../../../services/article";

export interface HomeState {
  tabs: ArticleTab[];
  selectedTab: string;
  articles: MultipleArticleResponse;
  tags: string[];
  selectedTag?: string;
}

const initialState: HomeState = {
  tabs: [
    {
      title: "Your Feed",
      getArticles: articleService.feedArticles,
      loginRequired: true,
      isSelected: true,
      isAlwaysShow: true,
    },
    {
      title: "Global Feed",
      getArticles: articleService.listArticles,
      loginRequired: false,
      isSelected: false,
      isAlwaysShow: true,
    },
    {
      title: "",
      getArticles: articleService.listArticles,
      isAlwaysShow: false,
      isSelected: false,
      loginRequired: false,
    },
  ],
  articles: {
    articles: [],
    articlesCount: 0,
  },
  selectedTab: "globalFeed",
  tags: [],
  selectedTag: undefined,
};

const slice = createSlice({
  name: "home",
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
    setTags: (state, { payload: tags }: PayloadAction<string[]>) => {
      state.tags = tags;
    },
    setSelectedTag: (state, { payload: tag }: PayloadAction<string>) => {
      state.tabs.forEach((tab: ArticleTab) => (tab.isSelected = false));
      state.tabs[state.tabs.length - 1].title = tag;
      state.tabs[state.tabs.length - 1].isSelected = true;
    },
    setSelectedTab: (state, { payload: index }: PayloadAction<number>) => {
      state.tabs.forEach((tab: ArticleTab) => (tab.isSelected = false));
      state.tabs[index].isSelected = true;
    },
  },
});

export const {
  setArticles,
  setArticle,
  setTags,
  setSelectedTag,
  setSelectedTab,
} = slice.actions;
export default slice.reducer;
