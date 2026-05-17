import { useContext, useEffect, useState } from "react";
import type ITaskCategory from "../interfaces/ITaskCategory";
import { Context } from "../main";
import TaskCategoryService from "../services/TaskCategoryService";
import TaskService from "../services/TaskService";

const TaskCreate = () => {
  const { store } = useContext(Context);
  const [textProblem, setTextProblem] = useState<string>("");
  const [categorys, setCat] = useState<ITaskCategory[]>([]);
  const [catType, setCatType] = useState<string>("");

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const body: ITaskCategory = {
      org_id_belong: store.profileData.org_id,
    };

    const response = await TaskCategoryService.loadDepCategory(body);

    const [data, n] = response.data;

    setCat(data);
  };

  const createTask = async () => {
    const body: ITaskCategory = {
      category_id: catType,
      text: textProblem,
    };

    const response = await TaskService.create(body);

    console.log("createTask", response);

    setTextProblem("");
    setCatType("");
  };
  return (
    <div>
      <h1>TaskCreate</h1>
      <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
        {categorys.length != 0 ? (
          <>
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
              <select
                value={catType}
                onChange={(e) => setCatType(e.target.value)}
                className="w-full flex-1 bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                <option value="" disabled hidden>
                  Выберите вашу проблему из списка
                </option>
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
              <input
                placeholder="Ваша проблема"
                value={textProblem}
                onChange={(e) => setTextProblem(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => createTask()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </>
        ) : (
          <>Ваша организации пока не может принимать заявки от пользователей</>
        )}
      </div>
    </div>
  );
};

export default TaskCreate;
