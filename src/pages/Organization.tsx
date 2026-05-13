import { useEffect, useState } from "react";
import OrganizationService from "../services/Organization/OrganizationService";
import type IOrganization from "../interfaces/IOrganization";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const [organizations, setOrg] = useState<IOrganization[]>([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <h1>Organization</h1>
      <input type="button" value="Добавить" />
      {organizations.map((organization, index) => (
        <li
          key={index}
          className="border-b py-2"
          onClick={() => openDetails(organization.org_id)}
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
