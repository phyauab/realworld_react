import { ArticleListParam } from "../article/ArticleListParam";

export interface ArticleTab {
  title: string;
  getArticles: Function;
  loginRequired: boolean;
  isSelected: boolean;
  isAlwaysShow: boolean;
  params: ArticleListParam;
}
