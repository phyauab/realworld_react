interface Props {
  tags: string[];
  setTab: Function;
}

export function TagList({ tags, setTab }: Props) {
  return (
    <div className="tag-list">
      {tags.map((tag: string, index: number) => (
        <a
          href="#"
          key={index}
          className="tag-pill tag-default"
          onClick={() => setTab(tag)}
        >
          {tag}
        </a>
      ))}
    </div>
  );
}
