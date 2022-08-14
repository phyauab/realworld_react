import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../Pages/Home";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { SettingsPage } from "../Pages/Settings";
import { CreateArticlePage } from "../Pages/CreateArticle";
import { EditArticle } from "../Pages/EditArticle";
import { ArticlePage } from "../Pages/Article";
import { ProfilePage } from "../Pages/Profile";
import { PrivateRoute } from "../../common/PrivateRoute";
import { useEffect } from "react";
import authService from "../../services/auth";
import { UserResponse } from "../../models/user/UserResponse";
import { setIsLoading, setUser } from "./App.slice";
import { AxiosResponse } from "axios";
import { store } from "../../state/store";
import { useSelector } from "react-redux";
import { RootState } from "../../state/RootState";

function App() {
  const isLoading = useSelector((state: RootState) => state.app.isLoading);

  useEffect(() => {
    init();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/settings"
            element={<PrivateRoute children={<SettingsPage />} />}
          ></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/editor"
            element={<PrivateRoute children={<CreateArticlePage />} />}
          />
          <Route
            path="profile/:username"
            element={<PrivateRoute children={<ProfilePage />} />}
          />
          <Route
            path="/editor/:slug"
            element={<PrivateRoute children={<EditArticle />} />}
          />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

function init() {
  store.dispatch(setIsLoading(true));
  authService
    .getCurrentUser()
    .then((res: AxiosResponse<UserResponse>) => {
      store.dispatch(setUser(res.data.user));
      store.dispatch(setIsLoading(false)); // so that !isLoading is after setUser
    })
    .catch((e) => {
      console.log(e);
      store.dispatch(setIsLoading(false)); // so that !isLoading is after setUser
    });
}

export default App;
