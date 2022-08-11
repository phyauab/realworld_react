import { AppState } from "../components/App/App.slice";
import { LoginState } from "../components/Pages/Login/index.slice";

export interface RootState {
  app: AppState;
  login: LoginState;
}
