import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../state/RootState";
import { ErrorMessage } from "../../ErrorMessage";
import authService from "../../../services/auth";
import { store } from "../../../state/store";
import { resetState, setError, setIsLoading, updateField } from "./index.slice";
import { RegisterRequest } from "../../../models/auth/RegisterRequest";
import React, { useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { UserResponse } from "../../../models/user/UserResponse";
import { setUser } from "../../App/App.slice";
import { ValidationErrorResponse } from "../../../models/common/ValidationErrorResponse";

export function RegisterPage() {
  const navigate = useNavigate();
  const registerRequest = useSelector(
    (state: RootState) => state.register.registerRequest
  );
  const isLoading = useSelector((state: RootState) => state.register.isLoading);
  const error = useSelector((state: RootState) => state.register.error);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    store.dispatch(setIsLoading(true));
    authService
      .register(registerRequest)
      .then((res: AxiosResponse<UserResponse>) => {
        store.dispatch(setUser(res.data.user));
        navigate("/");
      })
      .catch((e: AxiosError<ValidationErrorResponse>) => {
        console.log(e);
        store.dispatch(setError(e.response?.data));
      });
    store.dispatch(setIsLoading(false));
  }

  function onUpdateField(name: string, value: string) {
    store.dispatch(
      updateField({ name: name as keyof RegisterRequest["user"], value: value })
    );
  }

  function init() {
    store.dispatch(resetState());
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ErrorMessage error={error} />

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  name="username"
                  value={registerRequest.user.username}
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  disabled={isLoading}
                  onChange={(e) => onUpdateField(e.target.name, e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="email"
                  value={registerRequest.user.email}
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  disabled={isLoading}
                  onChange={(e) => onUpdateField(e.target.name, e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  name="password"
                  value={registerRequest.user.password}
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  onChange={(e) => onUpdateField(e.target.name, e.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={isLoading}
                type="submit"
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
