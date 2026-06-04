import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import type IUserProfileData from "../interfaces/IUserProfileData";
import { useNavigate } from "react-router-dom";
import { HiMiniPhone, HiMiniIdentification, HiMapPin } from "react-icons/hi2";

const Profile = () => {
  const { store } = useContext(Context);

  const [profileData, setProfileData] = useState<IUserProfileData>();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [password, setPasword] = useState<string>("");
  const [passwordRethrow, setPaswordRethrow] = useState<string>("");

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const passwordChanged = async () => {
    const data = await updatePassword();
    switch (data?.succes) {
      case false:
        alert("ОШИБКА: " + data?.message);
        break;
      case true:
        alert(data?.message);
        break;
    }
  };

  const updatePassword = async () => {
    if (password != passwordRethrow)
      return { succes: false, message: "Пароли должны совпадать" };
    if (password.length < 6)
      return {
        succes: false,
        message:
          "Пароль слишком короткий. Минимальная длина пароля от 6 символов",
      };

    const body: any = { password: password };
    const response = await UserService.changePassword(
      store?.profileData.user_id!,
      body
    );
    if (response.data?.succes == true) {
      setIsModalOpen(false);
    }
    return response.data;
  };
  return (
    <div>
      {isModalOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-[#424769] rounded-xl overflow-hidden ">
            <div className="max-w-md mx-auto pt-12 pb-2 px-5 text-center">
              <input
                type="password"
                id="new-password"
                name="new_password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPasword(e.target.value)}
                className="w-full bg-[#2d3250] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                required
              />
              <input
                value={passwordRethrow}
                className="w-full bg-[#2d3250] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="password"
                id="confirm-password"
                name="confirm_password"
                autoComplete="new-password"
                onChange={(e) => setPaswordRethrow(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-4 m-2">
              <input
                type="button"
                value="Отмена"
                className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#2d3250] hover:bg-[#2d3250]/70 rounded-lg transition duration-200"
                onClick={() => closeModal()}
              />
              <input
                type="button"
                value="Сменить"
                className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
                onClick={() => passwordChanged()}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex">
        <h1>Профиль</h1>
        <div className="flex justify-end gap-4 -mt-3 w-full">
          {!store.system && (
            <input
              type="button"
              className="inline-block lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
              value="Выйти"
              onClick={() => store.logout()}
            />
          )}
        </div>
      </div>
      <div className="max-w-85% lg:max-w-95% mx-auto bg-[#424769] rounded-xl overflow-hidden p-2">
        <div className="flex items-center gap-3">
          <HiMiniIdentification className="text-[#f9b17a] w-9 h-10 -mr-2" />
          <div>
            <p className="text-sm font-medium text-[#f9b17a] -mb-1">Имя</p>
            <p> {profileData?.name ? profileData?.name : <>не указан</>}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HiMiniPhone className="text-[#f9b17a] w-9 h-10 -mr-2" />
          <div>
            <p className="text-sm font-medium text-[#f9b17a] -mb-1">Телефон</p>
            <p> {profileData?.phone ? profileData?.phone : <>не указан</>}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HiMapPin className="text-[#f9b17a] w-9 h-10 -mr-2" />
          <div>
            <p className="text-sm font-medium text-[#f9b17a] -mb-1">
              Местоположение
            </p>
            <p> {profileData?.place ? profileData?.place : <>не указан</>}</p>
          </div>
        </div>

        {/* <p>Мои удаленные доступы: {profileData?.remote_access.id}</p> */}
        <div className="flex justify-end gap-4 mt-4">
          <input
            type="button"
            value="Сменить пароль"
            className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
            onClick={() => openModal()}
          />
          <input
            type="button"
            value="Редактировать"
            className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
            onClick={() => openEdit()}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
