import { AxiosResponse } from "axios";
import myAxios from "../../common/axios";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";
import { UserResponse } from "../../models/user/UserResponse";

class AuthService {
  login(loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return myAxios.post<LoginResponse>("/users/login", loginRequest);
  }

  getCurrentUser(): Promise<AxiosResponse<UserResponse>> {
    const token = localStorage.getItem("realworld_token");
    myAxios.defaults.headers.common["Authorization"] = `Token ${token}`;
    return myAxios.get("/user");
  }
}

export default new AuthService();
