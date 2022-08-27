import { AxiosResponse } from "axios";
import myAxios from "../../common/axios";
import { setUser } from "../../components/App/App.slice";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { UserResponse } from "../../models/user/UserResponse";
import { store } from "../../state/store";

class AuthService {
  login(loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return myAxios.post<LoginResponse>("/users/login", loginRequest);
  }

  logout() {
    store.dispatch(setUser());
  }

  getCurrentUser(): Promise<AxiosResponse<UserResponse>> {
    const token = localStorage.getItem("realworld_token");
    if (token) {
      myAxios.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
    return myAxios.get("/user");
  }
}

export default new AuthService();
