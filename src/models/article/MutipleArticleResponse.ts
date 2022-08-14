import { Article } from "./Article";

export interface MultipleArticleResponse {
  articles: Article[];
  articlesCount: Number;
}
