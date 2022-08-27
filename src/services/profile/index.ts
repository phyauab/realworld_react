import { AxiosResponse } from "axios";
import { FollowResponse } from "../../models/profile/FollowResponse";
import axios from "../../common/axios";

class ProfileService {
  followUser(username: string): Promise<AxiosResponse<FollowResponse>> {
    return axios.post<FollowResponse>(`profiles/${username}/follow`);
  }
  unfollowUser(username: string): Promise<AxiosResponse<FollowResponse>> {
    return axios.delete<FollowResponse>(`profiles/${username}/follow`);
  }
}

export default new ProfileService();
