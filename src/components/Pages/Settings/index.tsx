import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UpdateUserRequest } from "../../../models/user/UpdateUserRequest";
import { RootState } from "../../../state/RootState";
import { store } from "../../../state/store";
import { resetState, setIsLoading, updateField } from "./index.slice";
import userService from "../../../services/user";
import { AxiosResponse } from "axios";
import { setUser } from "../../App/App.slice";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../../models/user/UserResponse";
import authService from "../../../services/auth";

export function SettingsPage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.app.user);
  const updateUserRequest = useSelector(
    (state: RootState) => state.setting.updateUserRequest
  );
  const isLoading = useSelector((state: RootState) => state.setting.isLoading);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    store.dispatch(setIsLoading(true));
    userService
      .updateUser(updateUserRequest)
      .then((res: AxiosResponse<UserResponse>) => {
        store.dispatch(setUser(res.data.user));
        navigate(`/profile/${user?.username}`);
      })
      .then((e) => console.log(e));
    store.dispatch(setIsLoading(false));
  }

  function logout() {
    authService.logout();
    return navigate("/");
  }

  function onUpdateField(name: string, value: string) {
    store.dispatch(
      updateField({ name: name as keyof UpdateUserRequest["user"], value })
    );
  }

  function init() {
    store.dispatch(resetState());
    if (user) {
      store.dispatch(updateField({ name: "image", value: user.image }));
      store.dispatch(updateField({ name: "username", value: user.username }));
      store.dispatch(updateField({ name: "bio", value: user.bio }));
      store.dispatch(updateField({ name: "email", value: user.email }));
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={updateUserRequest.user.image || ""}
                    onChange={(e) =>
                      onUpdateField(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={updateUserRequest.user.username || ""}
                    onChange={(e) =>
                      onUpdateField(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    value={updateUserRequest.user.bio || ""}
                    onChange={(e) =>
                      onUpdateField(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="email"
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={updateUserRequest.user.email || ""}
                    onChange={(e) =>
                      onUpdateField(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={updateUserRequest.user.password || ""}
                    onChange={(e) =>
                      onUpdateField(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={isLoading}
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>

            <hr />

            <button
              className="btn btn-outline-danger"
              disabled={isLoading}
              onClick={logout}
            >
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
