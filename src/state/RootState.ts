import { AppState } from "../components/App/App.slice";
import { HomeState } from "../components/Pages/Home/index.slice";
import { LoginState } from "../components/Pages/Login/index.slice";
import { EditorArticle } from "../models/article/EditorArticle";

export interface RootState {
  app: AppState;
  login: LoginState;
  home: HomeState;
  createArticle: EditorArticle;
}
