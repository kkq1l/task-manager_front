import type { AxiosResponse } from "axios";
import type INews from "../interfaces/INews";
import $api from "./api";

export default class NewsService {
  static async create(body: INews): Promise<AxiosResponse<INews>> {
    const response = $api.post("/news/create", body);
    return response;
  }

  static async loadAll() {
    const response = $api.get("/news/");
    return response;
  }
}
