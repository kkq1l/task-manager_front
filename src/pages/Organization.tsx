import { useEffect, useState } from "react";
import OrganizationService from "../services/Organization/OrganizationService";
import type IOrganization from "../interfaces/IOrganization";

const Organization = () => {
  const [organizations, setOrg] = useState<IOrganization[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const response = await OrganizationService.loadAll();
    const [org, n] = response.data;

    setOrg(org);
  };

  return (
    <div>
      <h1>Organization</h1>
      <input type="button" value="Добавить" />
      {organizations.map((organization, index) => (
        <li key={index} className="border-b py-2">
          <p>
            Наименование: {organization.name} {organization.inn}.
          </p>
        </li>
      ))}
    </div>
  );
};

export default Organization;
