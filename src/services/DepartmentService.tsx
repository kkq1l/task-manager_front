import type { AxiosResponse } from "axios";
import type IDepartment from "../interfaces/IDepartment";
import type IDepartmentCreate from "../interfaces/IDepartmentCreate";
import $api from "./api";

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
}
