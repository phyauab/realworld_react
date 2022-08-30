import { AxiosResponse } from "axios";
import axios from "../../common/axios";
import { ArticleListParam } from "../../models/article/ArticleListParam";
import { EditorArticleRequest } from "../../models/article/EditorArticleRequest";
import { MultipleArticleResponse } from "../../models/article/MutipleArticleResponse";
import { SingleArticleResponse } from "../../models/article/SingleArticleResponse";
import { CommentRequest } from "../../models/comment/CommentRequest";
import { MultipleCommentResponse } from "../../models/comment/MultipleCommentResponse";
import { SingleCommentResponse } from "../../models/comment/SingleCommentResponse";

class ArticleService {
  listArticles(
    params: ArticleListParam
  ): Promise<AxiosResponse<MultipleArticleResponse>> {
    return axios.get<MultipleArticleResponse>("/articles", {
      params: params,
    });
  }

  getArticle(slug: string): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.get<SingleArticleResponse>(`/articles/${slug}`);
  }

  feedArticles(
    params: ArticleListParam
  ): Promise<AxiosResponse<MultipleArticleResponse>> {
    return axios.get<MultipleArticleResponse>("/articles/feed", {
      params: params,
    });
  }

  createArticle(
    createArticleRequest: EditorArticleRequest
  ): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.post<SingleArticleResponse>("/articles", createArticleRequest);
  }

  favoriteArticle(slug: string): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.post<SingleArticleResponse>(`articles/${slug}/favorite`);
  }

  unfavoriteArticle(
    slug: string
  ): Promise<AxiosResponse<SingleArticleResponse>> {
    return axios.delete<SingleArticleResponse>(`articles/${slug}/favorite`);
  }

  postComment(
    slug: string,
    CommentRequest: CommentRequest
  ): Promise<AxiosResponse<SingleCommentResponse>> {
    return axios.post(`articles/${slug}/comments`, CommentRequest);
  }

  getComments(slug: string): Promise<AxiosResponse<MultipleCommentResponse>> {
    return axios.get(`/articles/${slug}/comments`);
  }

  deleteComment(slug: string, id: Number): Promise<AxiosResponse> {
    return axios.delete(`/articles/${slug}/comments/${id}`);
  }
}

export default new ArticleService();
