import { AxiosResponse } from "axios";
import axios from "../../common/axios";
import { MultipleArticleResponse } from "../../models/article/MutipleArticleResponse";
import { SingleArticleResponse } from "../../models/article/SingleArticleResponse";

class ArticleService {
  listArticles(
    limit: Number,
    offset: Number,
    tag?: string
  ): Promise<AxiosResponse<MultipleArticleResponse>> {
    return axios.get<MultipleArticleResponse>("/articles", {
      params: {
        limit: limit,
        offset: offset,
        tag: tag,
      },
    });
  }

  feedArticles(): Promise<AxiosResponse<MultipleArticleResponse>> {
    return axios.get<MultipleArticleResponse>("/articles/feed");
  }

  favoriteArticle(slug: string): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.post<SingleArticleResponse>(`articles/${slug}/favorite`);
  }

  unfavoriteArticle(
    slug: string
  ): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.delete<SingleArticleResponse>(`articles/${slug}/favorite`);
  }
}

export default new ArticleService();
