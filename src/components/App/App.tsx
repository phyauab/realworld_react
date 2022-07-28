import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { HomePage } from "../Pages/Home";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { SettingsPage } from "../Pages/Settings";
import { CreateArticlePage } from "../Pages/CreateArticle";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/settings" element={<SettingsPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/editor" element={<CreateArticlePage />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
