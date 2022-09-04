import { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { formatDate } from "../../common/Utils";
import { Comment } from "../../models/comment/Comment";
import articleService from "../../services/article";
import { RootState } from "../../state/RootState";
import { store } from "../../state/store";
import { removeComment } from "../Pages/Article/index.slice";

interface Props {
  slug: string;
  comment: Comment;
}

export function CommentView({ slug, comment }: Props) {
  const user = useSelector((state: RootState) => state.app.user);

  function deleteComment(slug: string, id: Number) {
    articleService
      .deleteComment(slug, id)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          store.dispatch(removeComment(id));
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={
              comment.author.image ? comment.author.image : DEFAULT_USER_IMAGE
            }
            alt="user_image"
            className="comment-author-img"
          />
        </Link>
        &nbsp;
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatDate(comment.createdAt)}</span>
        {comment.author.username === user?.username && (
          <span className="mod-options">
            <i
              className="ion-trash-a"
              onClick={(e) => deleteComment(slug, comment.id)}
            ></i>
          </span>
        )}
      </div>
    </div>
  );
}
