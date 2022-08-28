import { AxiosResponse } from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { formatDate } from "../../common/Utils";
import { Article } from "../../models/article/Article";
import { SingleArticleResponse } from "../../models/article/SingleArticleResponse";
import articleService from "../../services/article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import { setArticle } from "../Pages/Home/index.slice";

interface Props {
  article: Article;
  index: number;
}

export function ArticlePreview({ article, index }: Props) {
  const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const navigate = useNavigate();

  function clickFavoriteButton(slug: string) {
    if (!isLogin) {
      navigate("/login");
      return;
    }
    setIsFavoriting(true);
    if (article.favorited) {
      articleService
        .unfavoriteArticle(slug)
        .then((res: AxiosResponse<SingleArticleResponse>) =>
          store.dispatch(setArticle({ article: res.data.article, index }))
        )
        .catch();
    } else {
      articleService
        .favoriteArticle(slug)
        .then((res: AxiosResponse<SingleArticleResponse>) =>
          store.dispatch(setArticle({ article: res.data.article, index }))
        )
        .catch();
    }
    setIsFavoriting(false);
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img src={article.author.image || DEFAULT_USER_IMAGE} />
        </Link>

        <div className="info">
          <Link to={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{formatDate(article.createdAt)}</span>
        </div>
        <button
          className={`btn ${
            article.favorited ? `btn-primary` : `btn-outline-primary`
          } btn-sm pull-xs-right`}
          disabled={isFavoriting}
          onClick={() => clickFavoriteButton(article.slug)}
        >
          <i className="ion-heart"></i> <>{article.favoritesCount}</>
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          <li className="tag-default tag-pill tag-outline">Music</li>
          <li className="tag-default tag-pill tag-outline">Song</li>
        </ul>
      </Link>
    </div>
  );
}
