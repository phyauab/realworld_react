import { FormEventHandler } from "react";

interface Props {
  submitButtonText: string;
  handleSubmit: FormEventHandler;
  onUpdateField: Function;
}

export function Editor({
  submitButtonText,
  handleSubmit,
  onUpdateField,
}: Props) {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Article Title"
            name="title"
            onChange={(e) => onUpdateField(e.target.name, e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            name="description"
            onChange={(e) => onUpdateField(e.target.name, e.target.value)}
          />
        </fieldset>
        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows={8}
            placeholder="Write your article (in markdown)"
            name="body"
            onChange={(e) => onUpdateField(e.target.name, e.target.value)}
          ></textarea>
        </fieldset>
        <fieldset className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            name="tags"
            onChange={(e) => onUpdateField(e.target.name, e.target.value)}
          />
          <div className="tag-list"></div>
        </fieldset>
        <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
          {submitButtonText}
        </button>
      </fieldset>
    </form>
  );
}
