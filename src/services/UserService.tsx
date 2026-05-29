import type { AxiosResponse } from "axios";
import $api from "./api";
import type IUserData from "../interfaces/IUsers";
import type IUserProfileData from "../interfaces/IUserProfileData";

export default class UserService {
  static async loadAll(body: IUserData): Promise<AxiosResponse<IUserData[]>> {
    const response = $api.post("/organization/users", body);

    return response;
  }

  static async create(body: IUserData): Promise<AxiosResponse<IUserData>> {
    const response = $api.post("/users/registr_user", body);

    return response;
  }

  static async loadProfile(
    id: string
  ): Promise<AxiosResponse<IUserProfileData>> {
    const response = $api.get(`users/mydata/${id}`);
    return response;
  }

  static async saveData(id: string, body: IUserProfileData) {
    const response = $api.patch(`users/mydata/save/${id}`, body);
    console.log(body);
  }

  static async activate(id: string) {
    const response = $api.get(`users//task_activate/${id}`);
    return response;
  }
}
