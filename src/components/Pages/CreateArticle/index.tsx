import { Editor } from "../../Editor";

export function CreateArticlePage() {
  return (
    <div className="editor-page">
      <div className="container page">
        <Editor mode="create" />
      </div>
    </div>
  );
}
