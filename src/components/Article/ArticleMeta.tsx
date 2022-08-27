import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { formatDate } from "../../common/Utils";
import { Profile } from "../../models/profile/Profile";
import profileService from "../../services/profile";
import articleService from "../../services/article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import {
  setArticle,
  setAuthor,
  setIsFavoriting,
  setIsFollowing,
} from "../Pages/Article/index.slice";

interface Props {
  slug: string;
  title: string;
  author: Profile;
  createdAt: string;
  favorited: boolean;
  favoritesCount: Number;
}

export function ArticleMeta({
  slug,
  title,
  author,
  createdAt,
  favorited,
  favoritesCount,
}: Props) {
  const isFollowing = useSelector(
    (state: RootState) => state.article.isFollowing
  );

  const isFavoriting = useSelector(
    (state: RootState) => state.article.isFavoriting
  );

  async function followUser() {
    store.dispatch(setIsFollowing(true));
    try {
      const res = author.following
        ? await profileService.unfollowUser(author.username)
        : await profileService.followUser(author.username);
      store.dispatch(setAuthor(res.data.profile));
    } catch (e) {
      console.log(e);
    }
    store.dispatch(setIsFollowing(false));
  }

  async function favoriteArticle() {
    store.dispatch(setIsFavoriting(true));
    try {
      const res = favorited
        ? await articleService.unfavoriteArticle(slug)
        : await articleService.favoriteArticle(slug);
      store.dispatch(setArticle(res.data.article));
    } catch (e) {
      console.log(e);
    }
    store.dispatch(setIsFavoriting(false));
  }

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <img src={author.image ? author.image : DEFAULT_USER_IMAGE} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{formatDate(createdAt)}</span>
      </div>
      <button
        className={`btn btn-sm ${
          author.following ? "btn-secondary" : "btn-outline-secondary"
        }`}
        disabled={isFollowing}
        onClick={followUser}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {author.following ? "Unfollow" : "Follow"} {author.username}
      </button>
      &nbsp;&nbsp;
      <button
        className={`btn btn-sm ${
          favorited ? "btn-primary" : "btn-outline-primary"
        }`}
        disabled={isFavoriting}
        onClick={favoriteArticle}
      >
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{" "}
        <span className="counter">
          (<>{favoritesCount}</>)
        </span>
      </button>
    </div>
  );
}
