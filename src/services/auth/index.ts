import { AxiosResponse } from "axios";
import myAxios from "../../common/axios";
import { LoginRequest } from "../../models/auth/LoginRequest";
import { LoginResponse } from "../../models/auth/LoginResponse";

class AuthService {
  login(loginRequest: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return myAxios.post<LoginResponse>("/users/login", loginRequest);
  }
}

export default new AuthService();
