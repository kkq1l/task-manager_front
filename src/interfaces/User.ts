export interface IUser {
  login: string;
  roles: string;
  user_id: string;
  org_id: string;
  dep_id?: string;
  dep_type?: string;
}
