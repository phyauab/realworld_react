import { EditorArticleRequest } from "../../../models/article/CreateArticleRequest";
import {
  EditorArticle,
  EditorArticleState,
} from "../../../models/article/EditorArticle";
import { store } from "../../../state/store";
import { Editor } from "../../Editor";
import articleService from "../../../services/article";
import { AxiosResponse } from "axios";
import { SingleArticleResponse } from "../../../models/article/SingleArticleResponse";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateField } from "../../Editor/index.slice";

export function CreateArticlePage() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const article: EditorArticle = {
      title: store.getState().editorArticle.title,
      description: store.getState().editorArticle.description,
      body: store.getState().editorArticle.body,
    };

    const createArticleRequest: EditorArticleRequest = {
      article: article,
    };

    if (
      store.getState().editorArticle.tags &&
      store.getState().editorArticle.tags?.length !== 0
    ) {
      const tagList = store.getState().editorArticle.tags?.split(",");
      article.tagList = tagList;
    }

    articleService
      .createArticle(createArticleRequest)
      .then((res: AxiosResponse<SingleArticleResponse>) => {
        navigate(`/article/${res.data.article.slug}`);
      })
      .catch((e) => console.log(e));
  }

  function onUpdateField(name: string, value: string) {
    store.dispatch(
      updateField({ name: name as keyof EditorArticleState, value: value })
    );
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <Editor
              submitButtonText={"Publish Article"}
              handleSubmit={handleSubmit}
              onUpdateField={onUpdateField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
