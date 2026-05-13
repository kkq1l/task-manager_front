import type { IUser } from "../../interfaces/User";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
