import $api from "../api";

export default class OrganizationService {
  static async loadAll() {
    return $api.get("/organization/");
  }
}
