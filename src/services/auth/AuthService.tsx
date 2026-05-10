import type { AxiosResponse } from "axios";
import $api from "../api";
import type { AuthResponse } from "./AuthResponse";

export default class AuthService {
  static async login(
    login: string,
    pwd: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/sign-in", { login, pwd });
  }

  static async registration(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { username, password });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
