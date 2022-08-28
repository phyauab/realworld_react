import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { FollowButton } from "../Button/FollowButton";

interface Props {
  slug: string;
  author: Profile;
  createdAt: string;
  favorited: boolean;
  favoritesCount: Number;
}

export function ArticleMeta({
  slug,
  author,
  createdAt,
  favorited,
  favoritesCount,
}: Props) {
  const navigate = useNavigate();
  const isFollowing = useSelector(
    (state: RootState) => state.article.isFollowing
  );
  const isFavoriting = useSelector(
    (state: RootState) => state.article.isFavoriting
  );
  const isLogin = useSelector((state: RootState) => state.app.isLogin);

  async function followUser() {
    if (!isLogin) {
      return navigate("/login");
    }
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
    if (!isLogin) {
      return navigate("/login");
    }
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
      <FollowButton
        following={author.following}
        isLoading={isFollowing}
        setIsLoading={setIsFollowing}
        setProfile={setAuthor}
        username={author.username}
      />
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
