import { AppState } from "../components/App/App.slice";
import { EditorState } from "../components/Editor/index.slice";
import { HomeState } from "../components/Pages/Home/index.slice";
import { LoginState } from "../components/Pages/Login/index.slice";

export interface RootState {
  app: AppState;
  login: LoginState;
  home: HomeState;
  editor: EditorState;
}
