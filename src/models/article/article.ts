import { Author } from "../author/Author";

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string; // redux cannot serialize date, new Date() when it's needed
  updatedAt: string;
  favorited: boolean;
  favoritesCount: Number;
  author: Author;
}
