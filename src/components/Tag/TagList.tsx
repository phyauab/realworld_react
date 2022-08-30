interface Props {
  tags: string[];
  selectTag: Function;
}

export function TagList({ tags, selectTag }: Props) {
  return (
    <div className="tag-list">
      {tags.map((tag: string, index: number) => (
        <a
          href="#"
          key={index}
          className="tag-pill tag-default"
          onClick={() => selectTag(tag)}
        >
          {tag}
        </a>
      ))}
    </div>
  );
}
