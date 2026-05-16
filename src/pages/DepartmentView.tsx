import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DepartmentService from "../services/DepartmentService";
import type IDepartmentDetail from "../interfaces/IDepartmentDetail";

const DepartmentView = () => {
  const location = useLocation();
  const dep_id = location.state?.dep_id;

  const [department, setDep] = useState<IDepartmentDetail>();

  console.log("DepartmentView ", dep_id);

  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = async () => {
    const response = await DepartmentService.detail(dep_id);

    setDep(response.data);
  };

  return (
    <div>
      DepartmentView
      {department?.department_type == "creator" ? (
        <p>Отделение является Инициатором</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DepartmentView;
