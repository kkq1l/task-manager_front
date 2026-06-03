import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrganizationService from "../services/Organization/OrganizationService";
import type { OrganizationDetailsResponse } from "../services/Organization/OrganizationDetailsResponse";
import DepartmentService from "../services/DepartmentService";
import type IDepartmentCreate from "../interfaces/IDepartmentCreate";
import UserService from "../services/UserService";
import type IUserData from "../interfaces/IUsers";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const OrganizationDetails = () => {
  const location = useLocation();
  const get_org_id = location.state?.org_id;
  const [organization, setOrg] = useState<OrganizationDetailsResponse>();

  const [departments, setDep] = useState<IDepartmentCreate[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [depName, setDepName] = useState<string>("");
  const [depType, setDepType] = useState<string>("creator");

  const [users, setUsers] = useState<IUserData[]>([]);

  const [isModalUserOpen, setIsModalUserOpen] = useState<boolean>(false);
  const [userLogin, setuserLogin] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const { store } = useContext(Context);
  const [org_id, setOrgId] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    if (store.profileData?.org_id || get_org_id) {
      let id = "";

      if (!get_org_id) id = store.profileData.org_id;
      else id = get_org_id;

      setOrgId(id);
      loadDetails(id);
      loadDep(id);
      loadAdmins(id);
    }
  }, [store.profileData]);

  const loadDetails = async (id: string) => {
    const response = await OrganizationService.loadOne(id);
    const date = new Date(response.data.created_at!);
    // response.data.created_at = ["123", "2", "2"];
    setOrg(response.data);
  };

  const loadDep = async (id: string) => {
    const response = await DepartmentService.loadAll(id);
    const [deps, n] = response.data;
    setDep(deps);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createDep = async () => {
    const newDep: IDepartmentCreate = {
      org_id: org_id,
      name: depName,
      department_type: depType,
    };

    const response = await DepartmentService.create(newDep);

    closeModal();

    const updateData = response.data;

    setDepName("");
    setDepType("creator");

    setDep([...departments, updateData]);
  };

  const loadAdmins = async (id: string) => {
    const body: IUserData = {
      org_id: id,
      // roles: "admin",
    };

    try {
      const response = await UserService.loadAll(body);

      const usersList = response.data;
      // const [deps, n] = response.data;
      setUsers(usersList);
    } catch (e) {}
  };

  const openModalUser = () => {
    setIsModalUserOpen(true);
  };

  const closeModalUser = () => {
    setIsModalUserOpen(false);
  };

  const createAdmin = async () => {
    const body: IUserData = {
      org_id: org_id!,
      login: userLogin,
      password: pwd,
      roles: "admin",
    };
    const response = await UserService.create(body);
    const usersList = response.data;

    closeModalUser();

    setUsers([...users, usersList]);
  };

  const openDepartment = (dep_id: string) => {
    navigate("/department_view", {
      state: { dep_id: dep_id },
    });
  };

  const dateConvert = (body: string) => {
    const date = new Date(body);

    const day = date.getDate();
    const month = date.toLocaleString("ru-RU", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  return (
    <div>
      {isModalUserOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
              <form autoComplete="off">
                <input
                  placeholder="Логин"
                  name="new-lin"
                  value={userLogin}
                  onChange={(e) => setuserLogin(e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                />
                <br />
                <input
                  placeholder="Временный пароль"
                  name="new-paord"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="password"
                />
                <br />
              </form>
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => closeModalUser()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
              >
                Отмена
              </button>
              <button
                onClick={() => createAdmin()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
              <input
                placeholder="Название отдела"
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
              <select
                value={depType}
                onChange={(e) => setDepType(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                id="product"
              >
                <option value="creator">Инициатор</option>
                <option value="executor">Исполнитель</option>
              </select>
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => closeModal()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
              >
                Отмена
              </button>
              <button
                onClick={() => createDep()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      )}
      {organization ? (
        <>
          <h1>Организация: {organization?.name}</h1>
          <div className="max-w/5 flex justify-between gap-4">
            <div className=" w-1/3 min-h-80 rounded-md mb-4 border-2 border-[#424769]">
              <h2 className="text-center m-0">{organization?.name}</h2>
              <p className="text-center italic">{organization?.status}</p>
              <div className="ml-2">
                <p>Дата регистрации: {dateConvert(organization.created_at!)}</p>
                <p>ИНН: {organization?.inn}</p>
                <p>{organization?.description}</p>
              </div>
            </div>
            <div className=" w-1/3 min-h-80 rounded-md mb-4 border-2 border-[#424769]"></div>
            <div className=" w-1/3 min-h-80 rounded-md mb-4 border-2 border-[#424769]"></div>
          </div>

          <div className=" max-w/5 min-h-30 rounded-md mb-4 border-2 border-[#424769]">
            <div className="bg-[#424769] h-8">
              <h2>Отделения</h2>
            </div>
            <div className="p-4">
              <p
                className="w-full text-[#f9b17a] text-right"
                onClick={() => openModal()}
              >
                Добавить отдел
              </p>
              {departments ? (
                <>
                  {departments.map((department, index) => (
                    <li
                      key={index}
                      className="border-b border-[#424769] py-2 "
                      onClick={() => openDepartment(department.dep_id!)}
                    >
                      <p>
                        {department.name} {department.department_type}
                      </p>
                    </li>
                  ))}
                </>
              ) : (
                <>Отделения на данный момент отсутствуют в организации</>
              )}
            </div>
          </div>

          <div className=" max-w/5 min-h-30 rounded-md mb-4 border-2 border-[#424769]">
            <div className="bg-[#424769] h-8">
              <h2>Пользователи</h2>
            </div>
            <div className="p-4">
              <p
                className="w-full text-[#f9b17a] text-right"
                onClick={() => openModalUser()}
              >
                Добавить пользователя
              </p>
              {users ? (
                <>
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className="border-b border-[#424769] py-2 "
                      onClick={() => openDepartment(user.login!)}
                    >
                      <p>
                        {user.login} {user.roles}
                      </p>
                    </li>
                  ))}
                </>
              ) : (
                <>Пользователей нету в данной организации</>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Организация не выбрана</h1>
        </>
      )}
    </div>
  );
};

export default observer(OrganizationDetails);
