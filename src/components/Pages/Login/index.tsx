import { setError, updateField } from "./index.slice";
import { store } from "../../../state/store";
import { LoginRequest } from "../../../models/auth/LoginRequest";
import React, { useEffect } from "react";
import { setUser } from "../../App/App.slice";
import authService from "../../../services/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootState";
import { ValidationErrorResponse } from "../../../models/common/ValidationErrorResponse";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export function LoginPage() {
  const error = useSelector((state: RootState) => state.login.error);
  const isLogin = useSelector((state: RootState) => state.app.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <NavLink to="/register">Need an account?</NavLink>
            </p>
            <ul className="error-messages">
              {error?.errors &&
                Object.entries(error.errors).map(([field, fieldErrors]) => (
                  <li>
                    {field} {fieldErrors}
                  </li>
                ))}
            </ul>

            <form>
              <fieldset className="form-group">
                <input
                  name="email"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => onUpdateField(e.target.name, e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => onUpdateField(e.target.name, e.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function onUpdateField(name: string, value: string) {
  store.dispatch(
    updateField({ name: name as keyof LoginRequest["user"], value })
  );
}

function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  store.dispatch(setError(undefined));
  authService
    .login(store.getState().login.loginRequest)
    .then((e) => {
      store.dispatch(setUser(e.data.user));
    })
    .catch((e: AxiosError<ValidationErrorResponse>) => {
      if (e.response) {
        store.dispatch(setError(e.response?.data));
      }
    });
}
