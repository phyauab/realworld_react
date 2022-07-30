import { LoginState, updateField } from "./index.slice";
import { store } from "../../../state/store";

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <a href="">Need an account?</a>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
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
              <button className="btn btn-lg btn-primary pull-xs-right">
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
    updateField({ name: name as keyof LoginState["user"], value })
  );
}
