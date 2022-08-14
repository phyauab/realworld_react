import { Link } from "react-router-dom";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { formatDate } from "../../common/Utils";
import { Article } from "../../models/article/Article";

interface Props {
  article: Article;
}

export function ArticlePreview({ article }: Props) {
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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> <>{article.favoritesCount}</>
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
