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
    if (store.profileData.roles) loadCategory();
  }, [store.profileData.roles]);

  const loadCategory = async () => {
    const body: ITaskCategory = {
      org_id: store.profileData.org_id,
      role: store.profileData.roles,
    };

    const response = await TaskCategoryService.loadDepCategory(body);

    const [data, n] = response.data;

    setCat(data);
  };

  const createTask = async () => {
    if (!textProblem) {
      alert("Заполните текст ошибки, описав подробности");
      return;
    }
    const body: ITaskCategory = {
      category_id: catType,
      text: textProblem,
    };

    const response = await TaskService.create(body);

    setTextProblem("");
    setCatType("");
  };
  return (
    <div>
      <h1>Создать задачу</h1>
      <div className="max-w-85% lg:max-w-xl w-full mx-auto bg-[#424769] rounded-xl overflow-hidden">
        {categorys.length != 0 ? (
          <>
            <div className="max-w-md mx-auto pt-12 pb-1  px-5 text-center">
              <select
                value={catType}
                onChange={(e) => setCatType(e.target.value)}
                className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d] focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
                className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d]/70 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
              />
              <br />
            </div>
            <div className="ы pb-6 px-6 text-right bg-[#424769] -mb-2">
              <button
                onClick={() => createTask()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
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
