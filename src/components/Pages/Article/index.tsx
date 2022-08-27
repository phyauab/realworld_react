import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootState";
import { store } from "../../../state/store";
import {
  resetState,
  setArticle,
  setComments,
  setIsLoading,
} from "../Article/index.slice";
import articleService from "../../../services/article";
import { Link, useParams } from "react-router-dom";
import { SingleArticleResponse } from "../../../models/article/SingleArticleResponse";
import { AxiosResponse } from "axios";
import { ArticleMeta } from "../../Article/ArticleMeta";
import { CommentForm } from "../../Comment/CommentForm";
import { CommentView } from "../../Comment/CommentView";
import { MultipleCommentResponse } from "../../../models/comment/MultipleCommentResponse";

export function ArticlePage() {
  const { slug } = useParams();
  const article = useSelector((state: RootState) => state.article.article);
  const comments = useSelector(
    (state: RootState) => state.article.comments.comments
  );
  const user = useSelector((state: RootState) => state.app.user);
  const isLoading = useSelector((state: RootState) => state.article.isLoading);

  function init() {
    resetState();

    if (slug) {
      store.dispatch(setIsLoading(true));
      articleService
        .getArticle(slug)
        .then((res: AxiosResponse<SingleArticleResponse>) => {
          store.dispatch(setArticle(res.data.article));
        })
        .catch((e) => {
          console.log(e);
        });
      store.dispatch(setIsLoading(false));

      articleService
        .getComments(slug)
        .then((res: AxiosResponse<MultipleCommentResponse>) => {
          store.dispatch(setComments(res.data));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  useEffect(() => {
    init();
  }, [slug]);

  if (isLoading || !article || !slug) {
    return <></>;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta
            slug={slug}
            author={article.author}
            createdAt={article.createdAt}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
          />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta
            slug={slug}
            author={article.author}
            createdAt={article.createdAt}
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
          />
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {user ? (
              <CommentForm slug={slug} image={user.image} />
            ) : (
              <p>
                <Link to="/login">Sign in</Link> or{" "}
                <Link to="/register">Sign up</Link> to add comments on this
                article.
              </p>
            )}
          </div>
        </div>

        {comments.map((comment, index: number) => (
          <CommentView key={index} slug={slug} comment={comment} />
        ))}
      </div>
    </div>
  );
}
