import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import type IUserProfileData from "../interfaces/IUserProfileData";
import UserService from "../services/UserService";

const ProfileEdit = () => {
  const { store } = useContext(Context);
  const [profileData, setProfileData] = useState<Partial<IUserProfileData>>();
  const [data, setData] = useState<Partial<IUserProfileData>>();

  useEffect(() => {
    if (store.profileData?.user_id) loadData();
  }, [store.profileData.user_id]);

  const loadData = async () => {
    const user_id = store.profileData.user_id;

    const response = await UserService.loadProfile(user_id);
    setProfileData(response.data);
    setData(response.data);
  };

  const saveData = async () => {
    const body: any = {};

    if (profileData?.name != data?.name) {
      body.name = profileData?.name;
    }

    if (profileData?.profile_id != data?.profile_id) {
      body.profile_id = profileData?.profile_id;
    }

    if (profileData?.phone != data?.phone) {
      body.phone = profileData?.phone;
    }

    if (profileData?.place != data?.place) {
      body.place = profileData?.place;
    }
    const response = await UserService.saveData(data?.profile_id!, body);
  };
  return (
    <div>
      <h1>ProfileEdit</h1>
      <p>
        Имя{" "}
        <input
          type="text"
          value={profileData?.name}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
          }
          className="flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        />
      </p>
      <p>
        Номер телефона:{" "}
        <input
          type="text"
          value={profileData?.phone}
          onChange={(e) =>
            setProfileData({ ...profileData, phone: e.target.value })
          }
          className="flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        />
      </p>
      <p>
        Распологаюсь:{" "}
        <input
          type="text"
          value={profileData?.place}
          onChange={(e) =>
            setProfileData({ ...profileData, place: e.target.value })
          }
          className="flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        />
      </p>
      <p>
        Мои удаленные доступы: {profileData?.remote_access?.type}
        <input
          type="text"
          value={profileData?.remote_access?.id}
          onChange={(e) =>
            setProfileData({
              ...profileData?.remote_access,
              remote_access: {
                id: "anydesk",
                type: e.target.value,
              },
            })
          }
          className="flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
        />
      </p>
      <input type="button" value="Сохранить" onClick={() => saveData()} />
    </div>
  );
};

export default ProfileEdit;
