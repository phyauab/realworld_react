export interface UpdateUserRequest {
  user: {
    email?: string;
    username?: string;
    password?: string;
    image?: string;
    bio?: string;
  };
}
