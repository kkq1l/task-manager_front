import type { AxiosResponse } from "axios";
import $api from "./api";
import type IUserData from "../interfaces/IUsers";

export default class UserService {
  static async loadAll(body: IUserData): Promise<AxiosResponse<IUserData[]>> {
    const response = $api.post("/organization/admins", body);

    return response;
  }

  static async create(body: IUserData): Promise<AxiosResponse<IUserData>> {
    const response = $api.post("/users/registr_user", body);

    return response;
  }
}
