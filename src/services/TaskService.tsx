import type { AxiosResponse } from "axios";
import type ITaskCategory from "../interfaces/ITaskCategory";
import $api from "./api";
import type ITask from "../interfaces/ITask";

export default class TaskService {
  static async create(
    body: ITaskCategory
  ): Promise<AxiosResponse<ITaskCategory>> {
    const response = $api.post("/tasks", body);
    return response;
  }

  static async findAll(body: ITask) {
    const response = $api.post(`/tasks/watch`, body);
    return response;
  }
}
