import { Editor } from "../../Editor";

export function EditArticle() {
  return (
    <div className="editor-page">
      <div className="container page">
        <Editor mode="edit" />
      </div>
    </div>
  );
}
