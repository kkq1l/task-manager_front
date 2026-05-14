import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrganizationService from "../services/Organization/OrganizationService";
import type { OrganizationDetailsResponse } from "../services/Organization/OrganizationDetailsResponse";
import DepartmentService from "../services/DepartmentService";
import type IDepartmentCreate from "../interfaces/IDepartmentCreate";

const OrganizationDetails = () => {
  const location = useLocation();
  const org_id = location.state?.org_id;
  const [organization, setOrg] = useState<OrganizationDetailsResponse>();

  const [departments, setDep] = useState<IDepartmentCreate[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [depName, setDepName] = useState<string>("");
  const [depType, setDepType] = useState<string>("creator");

  console.log("org_id ", org_id);

  useEffect(() => {
    loadDetails();
    loadDep();
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
  return (
    <div>
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
          <h2>Отделения</h2>
          <input type="button" value="Добавить" onClick={() => openModal()} />
          {departments ? (
            <>
              {departments.map((department, index) => (
                <li key={index} className="border-b py-2">
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
