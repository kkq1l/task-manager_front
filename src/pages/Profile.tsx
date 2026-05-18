import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import type IUserProfileData from "../interfaces/IUserProfileData";

const Profile = () => {
  const { store } = useContext(Context);

  const [profileData, setProfileData] = useState<IUserProfileData>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const user_id = store.profileData.user_id;
    console.log("loadData user_id ", user_id);
    const response = await UserService.loadProfile(user_id);
    setProfileData(response.data);

    console.log("loadData response ", response);
  };
  return (
    <div>
      <h1>Profile {profileData?.name}</h1>
      <br />
      <p>Номер телефона: {profileData?.phone}</p>
      <p>Распологаюсь: {profileData?.place}</p>
      <p>Мои удаленные доступы: {profileData?.remote_access.id}</p>
      <input type="button" value="Выйти" onClick={() => store.logout()} />
    </div>
  );
};

export default observer(Profile);
