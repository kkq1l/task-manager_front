import type { AxiosResponse } from "axios";
import $api from "../api";
import type { OrganizationDetailsResponse } from "./OrganizationDetailsResponse";

export default class OrganizationService {
  static async loadAll() {
    return $api.get("/organization/");
  }

  static async loadOne(
    id: string
  ): Promise<AxiosResponse<OrganizationDetailsResponse>> {
    const response = $api.get(`/organization/${id}`);
    return response;
  }
}
