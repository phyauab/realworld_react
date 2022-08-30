import { configureStore } from "@reduxjs/toolkit";
import login from "../components/Pages/Login/index.slice";
import register from "../components/Pages/Register/index.slice";
import app from "../components/App/App.slice";
import home from "../components/Pages/Home/index.slice";
import editor from "../components/Editor/index.slice";
import article from "../components/Pages/Article/index.slice";
import articleListViewer from "../components/ArticleListViewer/index.slice";
import setting from "../components/Pages/Settings/index.slice";
import profile from "../components/Pages/Profile/index.slice";

export const store = configureStore({
  reducer: {
    app,
    login,
    register,
    home,
    editor,
    article,
    articleListViewer,
    setting,
    profile,
  },
  devTools: {},
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
