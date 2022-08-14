import { AxiosResponse } from "axios";
import axios from "../../common/axios";
import { Article } from "../../models/article/Article";
import { MultipleArticleResponse } from "../../models/article/MutipleArticleResponse";

class ArticleService {
  listArticles(
    limit: Number,
    offset: Number
  ): Promise<AxiosResponse<MultipleArticleResponse>> {
    return axios.get<MultipleArticleResponse>("/articles", {
      params: {
        limit: limit,
        offset: offset,
      },
    });
  }
}

export default new ArticleService();
