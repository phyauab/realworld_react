import { Comment } from "../../models/comment/Comment";

interface Props {
  comment: Comment;
}

export function CommentView({ comment }: Props) {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
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
  );
}
