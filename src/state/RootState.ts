import { AppState } from "../components/App/App.slice";
import { EditorState } from "../components/Editor/index.slice";
import { ArticleState } from "../components/Pages/Article/index.slice";
import { HomeState } from "../components/Pages/Home/index.slice";
import { LoginState } from "../components/Pages/Login/index.slice";
import { RegisterState } from "../components/Pages/Register/index.slice";
import { SettingState } from "../components/Pages/Settings/index.slice";

export interface RootState {
  app: AppState;
  login: LoginState;
  register: RegisterState;
  home: HomeState;
  editor: EditorState;
  article: ArticleState;
  setting: SettingState;
}
