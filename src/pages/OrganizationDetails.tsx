import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrganizationService from "../services/Organization/OrganizationService";
import type { OrganizationDetailsResponse } from "../services/Organization/OrganizationDetailsResponse";

const OrganizationDetails = () => {
  const location = useLocation();
  const org_id = location.state?.org_id;
  const [organization, setOrg] = useState<OrganizationDetailsResponse>();

  console.log("org_id ", org_id);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const response = await OrganizationService.loadOne(org_id);

    setOrg(response.data);
    console.log("test ", response.data);
  };
  return (
    <div>
      {organization ? (
        <>
          <h1>{organization?.name}</h1>
          <p>ИНН: {organization?.inn}</p>
          <p>{organization?.description}</p>
          <p>Статус: {organization?.status}</p>
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
