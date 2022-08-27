import { AxiosResponse } from "axios";
import myAxios from "../../common/axios";
import { setUser } from "../../components/App/App.slice";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { RegisterRequest } from "../../models/auth/RegisterRequest";
import { UserResponse } from "../../models/user/UserResponse";
import { store } from "../../state/store";

class AuthService {
  register(
    registerRequest: RegisterRequest
  ): Promise<AxiosResponse<UserResponse>> {
    return myAxios.post<UserResponse>("/users", registerRequest);
  }

  login(loginRequest: LoginRequest): Promise<AxiosResponse<UserResponse>> {
    return myAxios.post<UserResponse>("/users/login", loginRequest);
  }

  logout() {
    store.dispatch(setUser());
  }

  getCurrentUser(): Promise<AxiosResponse<UserResponse>> {
    const token = localStorage.getItem("realworld_token");
    if (token) {
      myAxios.defaults.headers.common["Authorization"] = `Token ${token}`;
    }
    return myAxios.get<UserResponse>("/user");
  }
}

export default new AuthService();
