import { AxiosResponse } from "axios";
import { UpdateUserRequest } from "../../models/user/UpdateUserRequest";
import axios from "../../common/axios";
import { UserResponse } from "../../models/user/UserResponse";

class UserService {
  updateUser(
    updateUserRequest: UpdateUserRequest
  ): Promise<AxiosResponse<UserResponse>> {
    return axios.put<UserResponse>("/user", updateUserRequest);
  }
}

export default new UserService();
