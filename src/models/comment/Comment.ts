import { Profile } from "../profile/Profile";

export interface Comment {
  id: Number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
