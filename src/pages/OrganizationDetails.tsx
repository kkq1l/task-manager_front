import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrganizationService from "../services/Organization/OrganizationService";
import type { OrganizationDetailsResponse } from "../services/Organization/OrganizationDetailsResponse";
import DepartmentService from "../services/DepartmentService";
import type IDepartmentCreate from "../interfaces/IDepartmentCreate";
import UserService from "../services/UserService";
import type IUserData from "../interfaces/IUsers";

const OrganizationDetails = () => {
  const location = useLocation();
  const org_id = location.state?.org_id;
  const [organization, setOrg] = useState<OrganizationDetailsResponse>();

  const [departments, setDep] = useState<IDepartmentCreate[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [depName, setDepName] = useState<string>("");
  const [depType, setDepType] = useState<string>("creator");

  const [users, setUsers] = useState<IUserData[]>([]);

  const [isModalUserOpen, setIsModalUserOpen] = useState<boolean>(false);
  const [userLogin, setuserLogin] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  console.log("org_id ", org_id);

  const navigate = useNavigate();

  useEffect(() => {
    loadDetails();
    loadDep();
    loadAdmins();
  }, []);

  const loadDetails = async () => {
    const response = await OrganizationService.loadOne(org_id);

    setOrg(response.data);
    console.log("test ", response.data);
  };

  const loadDep = async () => {
    const response = await DepartmentService.loadAll(org_id);
    const [deps, n] = response.data;
    setDep(deps);
    console.log("qwe", response);
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
    console.log(updateData);
    setDepName("");
    setDepType("creator");

    setDep([...departments, updateData]);
  };

  const loadAdmins = async () => {
    const body: IUserData = {
      org_id: org_id,
      roles: "admin",
    };

    try {
      const response = await UserService.loadAll(body);

      const usersList = response.data;
      // const [deps, n] = response.data;
      setUsers(usersList);
      console.log("users ", response);
    } catch (e) {
      console.log("users ", e);
    }
  };

  const openModalUser = () => {
    setIsModalUserOpen(true);
  };

  const closeModalUser = () => {
    setIsModalUserOpen(false);
  };

  const createAdmin = async () => {
    const body: IUserData = {
      org_id: org_id,
      login: userLogin,
      password: pwd,
      roles: "admin",
    };
    const response = await UserService.create(body);
    const usersList = response.data;
    console.log(response);
    closeModalUser();

    setUsers([...users, usersList]);
  };

  const openDepartment = (dep_id: string) => {
    navigate("/department_view", {
      state: { dep_id: dep_id },
    });
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
          <h1>{organization?.name}</h1>
          <p>ИНН: {organization?.inn}</p>
          <p>{organization?.description}</p>
          <p>Статус: {organization?.status}</p>

          <h2>Администраторы</h2>
          <input
            type="button"
            value="Добавить"
            onClick={() => openModalUser()}
          />
          {users.length != 0 ? (
            <>
              {users.map((user, index) => (
                <li key={index} className="border-b py-2">
                  <p>{user.login}.</p>
                </li>
              ))}
            </>
          ) : (
            <>
              <p>Администраторы отсутствуют в данной организации</p>
            </>
          )}

          <h2>Отделения</h2>
          <input type="button" value="Добавить" onClick={() => openModal()} />
          {departments ? (
            <>
              {departments.map((department, index) => (
                <li
                  key={index}
                  className="border-b py-2"
                  onClick={() => openDepartment(department.dep_id!)}
                >
                  <p>Наименование: {department.name}.</p>
                </li>
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <h1>Организация не выбрана</h1>
        </>
      )}
    </div>
  );
};

export default OrganizationDetails;
