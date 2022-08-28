import { AxiosResponse } from "axios";
import { ProfileResponse } from "../../models/profile/ProfileResponse";
import axios from "../../common/axios";

class ProfileService {
  getProfile(username: string): Promise<AxiosResponse<ProfileResponse>> {
    return axios.get<ProfileResponse>(`profiles/${username}`);
  }

  followUser(username: string): Promise<AxiosResponse<ProfileResponse>> {
    return axios.post<ProfileResponse>(`profiles/${username}/follow`);
  }

  unfollowUser(username: string): Promise<AxiosResponse<ProfileResponse>> {
    return axios.delete<ProfileResponse>(`profiles/${username}/follow`);
  }
}

export default new ProfileService();
