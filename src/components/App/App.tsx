import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../Pages/Home";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { SettingsPage } from "../Pages/Settings";
import { CreateArticlePage } from "../Pages/CreateArticle";
import { EditArticle } from "../Pages/EditArticle";
import { ArticlePage } from "../Pages/Article";
import { PrivateRoute } from "../../common/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/settings"
            element={<PrivateRoute children={<SettingsPage />} />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route
            path="/editor"
            element={<PrivateRoute children={<CreateArticlePage />} />}
          ></Route>
          <Route
            path="/editor/:slug"
            element={<PrivateRoute children={<EditArticle />} />}
          ></Route>
          <Route path="/article/:slug" element={<ArticlePage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
