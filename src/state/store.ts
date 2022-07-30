import { configureStore } from "@reduxjs/toolkit";
import login from "../components/Pages/Login/index.slice";

export const store = configureStore({
  reducer: { login },
  devTools: {},
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
