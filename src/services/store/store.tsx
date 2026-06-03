import { makeAutoObservable } from "mobx";
import AuthService from "../auth/AuthService";
import axios from "axios";
import { API_URL } from "../api";
import type { AuthResponse } from "../auth/AuthResponse";
import type { IUser } from "../../interfaces/User";

export default class Store {
  profileData = {} as IUser;
  isAuth = false;
  system = "";
  isMessenger = false;
  tgData = "";
  test = "";
  constructor() {
    makeAutoObservable(this);
  }

  setTestMax(gg: string) {
    this.test = gg;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setProfile(profileData: IUser) {
    this.profileData = profileData;
  }

  setSystem(sys: string) {
    this.system = sys;
  }

  setMessenger(bool: boolean) {
    this.isMessenger = bool;
  }

  setTgData(body: string) {
    this.tgData = body;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      this.setAuth(true);
      this.setProfile(response.data.user);
    } catch (e) {}
  }

  async registration(username: string, password: string, invite: string) {
    try {
      const response = await AuthService.registration(
        username,
        password,
        invite
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
    } catch (e) {}
  }

  async logout() {
    try {
      // если будет эндпоинт и логика выхода, то добавить сюда
      //   const response = await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("profileData");
      this.setAuth(false);
    } catch (e) {}
  }

  async checkAuth() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const response = await axios.post<AuthResponse>(
        `${API_URL}auth/refresh-token`,
        { token: refreshToken },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setProfile(response.data.user);
    } catch (e) {}
  }

  async loginWithTg() {
    try {
      const body: any = {
        data: this.tgData,
      };
      const response = await AuthService.tgAuth(body);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      this.setAuth(true);
      this.setProfile(response.data.user);
    } catch (e) {}
  }
}
