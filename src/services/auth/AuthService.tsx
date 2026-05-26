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

  static async tgAuth(body: any) {
    const response = $api.post("/auth/sign-in-messenger", body);

    return response;
  }

  static async tgSignUp(body: any) {
    const response = $api.post("/auth/sign-up-messenger", body);

    return response;
  }

  static async registration(
    login: string,
    pwd: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/sign-up", { login, pwd });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
