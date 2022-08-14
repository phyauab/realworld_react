import { AxiosResponse } from "axios";
import axios from "../../common/axios";
import { TagResponse } from "../../models/tag/tag";

class TagService {
  getTags(): Promise<AxiosResponse<TagResponse>> {
    return axios.get("/tags");
  }
}

export default new TagService();
