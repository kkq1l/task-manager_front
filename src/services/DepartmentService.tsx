import type IDepartment from "../interfaces/IDepartment";
import $api from "./api";

export default class DepartmentService {
  static async loadAll(id: string) {
    const body: IDepartment = {
      org_id: id,
    };
    return $api.post("/department/org", body);
  }
}
