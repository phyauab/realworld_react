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
import { Fragment } from "react";

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
  const user = useSelector((state: RootState) => state.app.user);

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
      {user?.username !== author.username ? (
        <Fragment>
          <FollowButton
            following={author.following}
            isLoading={isFollowing}
            setIsLoading={setIsFollowing}
            setProfile={setAuthor}
            username={author.username}
            isActionBtn={false}
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
        </Fragment>
      ) : (
        <Fragment>
          <Link
            className="btn btn-outline-secondary btn-sm"
            to={`/editor/${slug}`}
          >
            <i className="ion-edit"></i> Edit Article
          </Link>
          &nbsp;&nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            ng-class="{disabled: $ctrl.isDeleting}"
            ng-click="$ctrl.deleteArticle()"
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </Fragment>
      )}
    </div>
  );
}
