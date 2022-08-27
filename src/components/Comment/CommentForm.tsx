import React from "react";
import { DEFAULT_USER_IMAGE } from "../../common/Constant";
import { store } from "../../state/store";
import { appendComment, updateComment } from "../Pages/Article/index.slice";
import articleService from "../../services/article";
import { useSelector } from "react-redux";
import { RootState } from "../../state/RootState";
import { SingleCommentResponse } from "../../models/comment/SingleCommentResponse";
import { AxiosResponse } from "axios";

interface Props {
  slug: string;
  image: string;
}

export function CommentForm({ slug, image }: Props) {
  const comment = useSelector(
    (state: RootState) => state.article.commentRequest.comment.body
  );
  const commentRequest = useSelector(
    (state: RootState) => state.article.commentRequest
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    articleService
      .postComment(slug, commentRequest)
      .then((res: AxiosResponse<SingleCommentResponse>) => {
        store.dispatch(appendComment(res.data.comment));
        store.dispatch(updateComment(""));
      })
      .catch((e) => console.log(e));
  }

  function onUpdateComment(comment: string) {
    store.dispatch(updateComment(comment));
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={(e) => onUpdateComment(e.target.value)}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={image ? image : DEFAULT_USER_IMAGE}
          className="comment-author-img"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}
