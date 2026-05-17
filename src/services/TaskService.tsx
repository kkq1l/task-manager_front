import type { AxiosResponse } from "axios";
import type ITaskCategory from "../interfaces/ITaskCategory";
import $api from "./api";

export default class TaskService {
  static async create(
    body: ITaskCategory
  ): Promise<AxiosResponse<ITaskCategory>> {
    const response = $api.post("/tasks", body);
    return response;
  }
}
