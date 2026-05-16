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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [catName, setCatName] = useState<string>("");
  const [catDescription, setCatDescription] = useState<string>("");
  const [catPrimary, setCatPrimary] = useState<boolean>(true);

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

    const [data, n] = response.data;

    setCat(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createCat = async () => {
    const body: ITaskCategory = {
      dep_id: dep_id,
      name: catName,
      description: catDescription,
    };

    const response = await TaskCategoryService.create(body);

    console.log(response.data);
  };

  return (
    <div>
      DepartmentView
      {isModalOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5">
              <input
                placeholder="Название"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
              <input
                placeholder="Описание"
                value={catDescription}
                onChange={(e) => setCatDescription(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
              <div className="w-full">
                <div className="inline-flex items-center ">
                  <label
                    data-ripple-dark="true"
                    htmlFor="checkbox"
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                  >
                    <input
                      id="checkbox"
                      checked={catPrimary}
                      defaultChecked={true}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-500 checked:bg-cyan-500 checked:before:bg-cyan-500 hover:before:opacity-10"
                      type="checkbox"
                      onChange={(e) => setCatPrimary(e.target.checked)}
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        stroke-width="1"
                        stroke="currentColor"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    htmlFor="checkbox"
                    className="mt-px cursor-pointer select-none font-light text-gray-400"
                  >
                    Первичный
                  </label>
                </div>
                {catPrimary == false &&
                  (categorys.length != 0 ? (
                    <select
                      // value={depType}
                      // onChange={(e) => setDepType(e.target.value)}
                      className="ml-2 flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    >
                      {categorys.map((category, index) => (
                        <option
                          key={index}
                          className="border-b py-2"
                          value={category.category_id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-red-400">
                      Ошибка: что то пошло не так, у отделения нету других
                      категорий
                    </p>
                  ))}
              </div>
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => closeModal()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
              >
                Отмена
              </button>
              <button
                onClick={() => createCat()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      )}
      {department?.department_type == "creator" ? (
        <p>Отделение является Инициатором</p>
      ) : (
        <>
          <br />
          <input type="button" value="Добавить" onClick={() => openModal()} />
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
