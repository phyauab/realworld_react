import { configureStore } from "@reduxjs/toolkit";
import login from "../components/Pages/Login/index.slice";
import app from "../components/App/App.slice";
import home from "../components/Pages/Home/index.slice";

export const store = configureStore({
  reducer: { app, login, home },
  devTools: {},
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
