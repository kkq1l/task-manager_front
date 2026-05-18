import type IRemoteAccess from "./IRemoteAccess";

export default interface IUserProfileData {
  profile_id: string;
  name: string;
  phone: string;
  status: string;
  remote_access: IRemoteAccess;
  place: string;
}
