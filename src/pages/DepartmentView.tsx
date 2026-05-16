import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DepartmentService from "../services/DepartmentService";
import type IDepartmentDetail from "../interfaces/IDepartmentDetail";
import TaskCategoryService from "../services/TaskCategoryService";
import type ITaskCategory from "../interfaces/ITaskCategory";

const DepartmentView = () => {
  const location = useLocation();
  const dep_id = location.state?.dep_id;

  const [department, setDep] = useState<IDepartmentDetail>();

  const [categorys, setCat] = useState<ITaskCategory[]>([]);

  useEffect(() => {
    loadDepartment();
    console.log("department_type", department);
    if (department?.department_type == "executor") {
      loadCategory();
    }
  }, []);

  useEffect(() => {
    if (department?.department_type == "executor") {
      loadCategory();
    }
  }, [department]);

  const loadDepartment = async () => {
    const response = await DepartmentService.detail(dep_id);

    setDep(response.data);
    console.log(response.data);
  };

  const loadCategory = async () => {
    const body: ITaskCategory = {
      dep_id: dep_id,
    };

    const response = await TaskCategoryService.loadDepCategory(body);

    const data = response.data;

    setCat(data);
  };
  return (
    <div>
      DepartmentView
      {department?.department_type == "creator" ? (
        <p>Отделение является Инициатором</p>
      ) : (
        <>
          <input type="button" value="Добавить" />
          <br />
          {categorys.map((category, index) => (
            <li key={index} className="border-b py-2">
              <p>
                {category.name} - {category.description}.
              </p>
            </li>
          ))}
        </>
      )}
    </div>
  );
};

export default DepartmentView;
