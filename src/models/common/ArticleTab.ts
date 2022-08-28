export interface ArticleTab {
  title: string;
  getArticles: Function;
  loginRequired: boolean;
  isSelected: boolean;
  isAlwaysShow: boolean;
}
