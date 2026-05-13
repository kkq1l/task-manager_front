import type { AxiosResponse } from "axios";
import $api from "../api";
import type { OrganizationDetailsResponse } from "./OrganizationDetailsResponse";
import type IOrganization from "../../interfaces/IOrganization";

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

  static async create(
    body: IOrganization
  ): Promise<AxiosResponse<IOrganization>> {
    const response = $api.post(`/organization/create`, body);

    return response;
  }
}
