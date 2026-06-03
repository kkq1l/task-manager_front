import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import type IUserProfileData from "../interfaces/IUserProfileData";
import { useNavigate } from "react-router-dom";
import type ITask from "../interfaces/ITask";
import TaskService from "../services/TaskService";

const Profile = () => {
  const { store } = useContext(Context);

  const [profileData, setProfileData] = useState<IUserProfileData>();

  const navigate = useNavigate();

  useEffect(() => {
    if (store.profileData?.user_id) {
      loadData();
    }
  }, [store.profileData?.user_id]);

  const openEdit = () => {
    navigate("/profile_edit");
  };

  const loadData = async () => {
    const user_id = store.profileData.user_id;

    const response = await UserService.loadProfile(user_id);
    setProfileData(response.data);
  };

  return (
    <div>
      <h1>Profile {profileData?.name}</h1>
      <br />
      <p>Номер телефона: {profileData?.phone}</p>
      <p>Распологаюсь: {profileData?.place}</p>
      <p>Мои удаленные доступы: {profileData?.remote_access.id}</p>
      <input
        type="button"
        className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
        value="Выйти"
        onClick={() => store.logout()}
      />
      <input
        type="button"
        value="Редактировать"
        className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
        onClick={() => openEdit()}
      />
    </div>
  );
};

export default observer(Profile);
