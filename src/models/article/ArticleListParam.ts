import { ListParam } from "../common/ListParam";

export interface ArticleListParam extends ListParam {
  tag?: string;
  author?: string;
  favorited?: string;
}
