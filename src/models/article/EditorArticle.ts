export interface EditorArticle {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface EditorArticleState {
  title: string;
  description: string;
  body: string;
  tags?: string;
}
