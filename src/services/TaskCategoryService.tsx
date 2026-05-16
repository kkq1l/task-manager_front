import type { AxiosResponse } from "axios";
import $api from "./api";
import type ITaskCategory from "../interfaces/ITaskCategory";

export default class TaskCategoryService {
  static async loadDepCategory(body: ITaskCategory) {
    const response = $api.post("/task-category/watch", body);
    return response;
  }

  static async create(
    body: ITaskCategory
  ): Promise<AxiosResponse<ITaskCategory[]>> {
    const response = $api.post("/task-category/create", body);
    return response;
  }
}
