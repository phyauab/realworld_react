import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
