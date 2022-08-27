import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootState";
import { store } from "../../../state/store";
import { resetState, setArticle, setIsLoading } from "../Article/index.slice";
import articleService from "../../../services/article";
import { useParams } from "react-router-dom";
import { SingleArticleResponse } from "../../../models/article/SingleArticleResponse";
import { AxiosResponse } from "axios";
import { ArticleMeta } from "../../Article/ArticleMeta";
import { CommentForm } from "../../Comment/CommentForm";

export function ArticlePage() {
  const { slug } = useParams();
  const article = useSelector((state: RootState) => state.article.article);
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
            <CommentForm />

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a href="" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit"></i>
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
