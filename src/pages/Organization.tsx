import { useEffect, useState } from "react";
import OrganizationService from "../services/Organization/OrganizationService";
import type IOrganization from "../interfaces/IOrganization";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const [organizations, setOrg] = useState<IOrganization[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [orgName, setOrgName] = useState<string>("");
  const [orgINN, setOrgINN] = useState<string>("");
  const [orgDesc, setOrgDesc] = useState<string>("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await OrganizationService.loadAll();
    const [org, n] = response.data;

    setOrg(org);
  };

  const openDetails = (org_id: string) => {
    navigate("/organization/details", {
      state: { org_id: org_id },
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createOrg = async () => {
    const newOrg: IOrganization = {
      name: orgName,
      inn: orgINN,
      description: orgDesc,
    };

    const response = await OrganizationService.create(newOrg);
    closeModal();

    const updateOrgData = response.data;

    setOrgDesc("");
    setOrgINN("");
    setOrgName("");

    setOrg([...organizations, updateOrgData]);
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
              <input
                placeholder="Название организации"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
              <input
                placeholder="ИНН"
                value={orgINN}
                onChange={(e) => setOrgINN(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />

              <br />
              <input
                placeholder="Описание"
                value={orgDesc}
                onChange={(e) => setOrgDesc(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => closeModal()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
              >
                Отмена
              </button>
              <button
                onClick={() => createOrg()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      )}
      <h1>Organization</h1>
      <input type="button" value="Добавить" onClick={() => openModal()} />
      {organizations.map((organization, index) => (
        <li
          key={index}
          className="border-b py-2"
          onClick={() => openDetails(organization.org_id!)}
        >
          <p>
            Наименование: {organization.name} {organization.inn}.
          </p>
        </li>
      ))}
    </div>
  );
};

export default Organization;
