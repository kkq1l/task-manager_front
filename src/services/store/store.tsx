import { makeAutoObservable } from "mobx";
import AuthService from "../auth/AuthService";
import axios from "axios";
import { API_URL } from "../api";
import type { AuthResponse } from "../auth/AuthResponse";
import type { IUser } from "../../interfaces/User";

export default class Store {
  profileData = {} as IUser;
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setProfile(profileData: IUser) {
    this.profileData = profileData;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log(response);
      this.setAuth(true);
      this.setProfile(response.data.profileData);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(username: string, password: string) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      // если будет эндпоинт и логика выхода, то добавить сюда
      //   const response = await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("profileData");
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(refreshToken);
      const response = await axios.post<AuthResponse>(
        `${API_URL}auth/refresh-token`,
        { token: refreshToken },
        { withCredentials: true }
      );
      console.log(response);
      console.log(response.data.profileData);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }
}
