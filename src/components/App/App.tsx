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

function App() {
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

export default App;
