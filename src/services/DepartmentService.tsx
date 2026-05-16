import type { AxiosResponse } from "axios";
import type IDepartment from "../interfaces/IDepartment";
import type IDepartmentCreate from "../interfaces/IDepartmentCreate";
import $api from "./api";
import type IDepartmentDetail from "../interfaces/IDepartmentDetail";

export default class DepartmentService {
  static async loadAll(id: string) {
    const body: IDepartment = {
      org_id: id,
    };
    return $api.post("/department/org", body);
  }

  static async create(
    body: IDepartmentCreate
  ): Promise<AxiosResponse<IDepartmentCreate>> {
    const response = $api.post("/department/create", body);
    return response;
  }

  static async detail(id: string): Promise<AxiosResponse<IDepartmentDetail>> {
    const response = $api.get(`/department/${id}`);
    return response;
  }
}
