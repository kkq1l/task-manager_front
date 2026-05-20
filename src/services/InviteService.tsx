import type { AxiosResponse } from "axios";
import type IInvite from "../interfaces/IInvite";
import $api from "./api";

export default class InviteService {
  static async create(body: IInvite): Promise<AxiosResponse<IInvite>> {
    const response = $api.post("/invites/create", body);
    return response;
  }

  static async watch(dep_id: string) {
    const response = $api.get(`/invites/${dep_id}`);
    return response;
  }
}
