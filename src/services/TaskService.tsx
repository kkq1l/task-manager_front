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

  static async getWork(id: string, body: any) {
    const response = $api.patch(`/tasks/get-work/${id}`, body);
    return response;
  }

  static async findAllWithoutUserTasks(body: ITask) {
    const response = $api.post(`/tasks/get_tasks`, body);
    return response;
  }

  static async findOneWithoutUserTasks(id: string) {
    const response = $api.get(`/tasks/get_task/${id}`);
    return response;
  }

  static async closeTask(id: string) {
    const response = $api.get(`/tasks/close_task/${id}`);
    return response;
  }
  static async test(id: string) {
    const response = $api.get(`/tasks/test/${id}`);
    return response;
  }

  static async sendMessage(body: any) {
    const response = $api.post(`/tasks/send_message/`, body);
    return response;
  }

  static async loadMessage(id: string) {
    const response = $api.get(`/tasks/get_message/${id}`);
    return response;
  }
}
