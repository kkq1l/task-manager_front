import { makeAutoObservable } from "mobx";
import AuthService from "../auth/AuthService";
import axios from "axios";
import { API_URL } from "../api";
import type { AuthResponse } from "../auth/AuthResponse";

export default class Store {
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      //   const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}auth/refresh-token`,
        { withCredentials: true }
      );
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }
}
