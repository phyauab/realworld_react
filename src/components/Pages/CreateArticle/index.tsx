import { EditorArticleRequest } from "../../../models/article/CreateArticleRequest";
import {
  EditorArticle,
  EditorArticleState,
} from "../../../models/article/EditorArticle";
import { store } from "../../../state/store";
import { Editor } from "../../Editor";
import { updateField } from "./index.slice";
import articleService from "../../../services/article";
import { AxiosResponse } from "axios";
import { SingleArticleResponse } from "../../../models/article/SingleArticleResponse";
import { useNavigate } from "react-router-dom";

export function CreateArticlePage() {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const article: EditorArticle = {
      title: store.getState().createArticle.title,
      description: store.getState().createArticle.description,
      body: store.getState().createArticle.body,
    };

    const createArticleRequest: EditorArticleRequest = {
      article: article,
    };

    if (
      store.getState().createArticle.tags &&
      store.getState().createArticle.tags?.length !== 0
    ) {
      const tagList = store.getState().createArticle.tags?.split(",");
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
