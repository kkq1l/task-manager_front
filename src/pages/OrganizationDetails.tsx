import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrganizationService from "../services/Organization/OrganizationService";
import type { OrganizationDetailsResponse } from "../services/Organization/OrganizationDetailsResponse";
import DepartmentService from "../services/DepartmentService";

const OrganizationDetails = () => {
  const location = useLocation();
  const org_id = location.state?.org_id;
  const [organization, setOrg] = useState<OrganizationDetailsResponse>();

  const [departments, setDep] = useState<any[]>([]);

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
  return (
    <div>
      {organization ? (
        <>
          <h1>{organization?.name}</h1>
          <p>ИНН: {organization?.inn}</p>
          <p>{organization?.description}</p>
          <p>Статус: {organization?.status}</p>
          <h2>Отделения</h2>
          <input type="button" value="Добавить" />
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
