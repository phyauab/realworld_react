import React, { useEffect } from "react";
import { EditorArticleState } from "../../models/article/EditorArticle";
import { store } from "../../state/store";
import { ErrorMessage } from "../ErrorMessage";
import { fetchArticle, resetState, setError, updateField } from "./index.slice";
import articleService from "../../services/article";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { SingleArticleResponse } from "../../models/article/SingleArticleResponse";
import { useSelector } from "react-redux";
import { RootState } from "../../state/RootState";
import { ValidationErrorResponse } from "../../models/common/ValidationErrorResponse";

interface Props {
  mode: string;
}

export function Editor({ mode }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const error = useSelector((e: RootState) => e.editor.error);
  const article = useSelector(
    (state: RootState) => state.editor.editorArticleRequest.article
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "create") {
      articleService
        .createArticle(store.getState().editor.editorArticleRequest)
        .then((res: AxiosResponse<SingleArticleResponse>) => {
          navigate(`/article/${res.data.article.slug}`);
        })
        .catch((e: AxiosError<ValidationErrorResponse>) =>
          store.dispatch(setError(e.response?.data))
        );
    } else if (mode === "edit") {
      if (slug)
        articleService
          .updateArticle(slug, store.getState().editor.editorArticleRequest)
          .then((res: AxiosResponse<SingleArticleResponse>) => {
            navigate(`/article/${res.data.article.slug}`);
          })
          .catch((e: AxiosError<ValidationErrorResponse>) =>
            store.dispatch(setError(e.response?.data))
          );
    }
  }

  function onUpdateField(name: string, value: string) {
    store.dispatch(
      updateField({ name: name as keyof EditorArticleState, value: value })
    );
  }

  useEffect(() => {
    store.dispatch(resetState());
    if (slug) {
      store.dispatch(fetchArticle(slug));
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1 col-xs-12">
        <ErrorMessage error={error} />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Article Title"
                name="title"
                value={article.title}
                onChange={(e) => onUpdateField(e.target.name, e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                name="description"
                value={article.description}
                onChange={(e) => onUpdateField(e.target.name, e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows={8}
                placeholder="Write your article (in markdown)"
                name="body"
                value={article.body}
                onChange={(e) => onUpdateField(e.target.name, e.target.value)}
              ></textarea>
            </fieldset>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter tags"
                name="tags"
                value={article.tagList}
                onChange={(e) => onUpdateField(e.target.name, e.target.value)}
              />
              <div className="tag-list"></div>
            </fieldset>
            <button
              className="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
