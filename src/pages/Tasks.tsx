import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import TaskService from "../services/TaskService";
import { observer } from "mobx-react-lite";
import type ITask from "../interfaces/ITask";
import type ITaskDetails from "../interfaces/ITaskDetails";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const { store } = useContext(Context);
  const [org_id, setOrgId] = useState<string>();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksDetails, setTasksDetails] = useState<ITaskDetails[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (store.profileData?.org_id) {
      loadTasks();
      loadMyTasks();
    }
  }, [store.profileData]);

  const loadTasks = async () => {
    const body: ITask = {
      org_id: store.profileData.org_id,
      dep_id: store.profileData.dep_id,
      status: "new",
    };
    const response = await TaskService.findAll(body);
    const [data, n] = response.data;

    setTasks(data);
  };

  const getTask = async (id: string) => {
    const body: any = {
      user_id: store.profileData.user_id,
    };
    const response = await TaskService.getWork(id, body);
    const data = response.data;
    removeItem(id);
    setTasksDetails([...tasksDetails, data]);
  };

  const loadMyTasks = async () => {
    const body: ITask = {
      org_id: store.profileData.org_id,
      dep_id: store.profileData.dep_id,
    };
    const response = await TaskService.findAllWithoutUserTasks(body);
    const [data, n] = response.data;
    setTasksDetails(data);
  };

  const removeItem = (id: string) => {
    setTasks((task) => task.filter((item) => item.task_id !== id));
  };

  const openDetails = (id: string) => {
    navigate("/task_details", {
      state: { task_id: id },
    });
  };
  return (
    <div>
      <h1>Задачи</h1>

      <div className="lg:flex max-w/5 justify-between gap-4">
        <div className="w-full lg:w-1/2 min-h-80 rounded-md mb-4 border-2 border-[#424769]">
          <div className="bg-[#424769] h-8">
            <h2>Мои задачи</h2>
          </div>
          <div className="p-4">
            {tasksDetails
              .filter(
                (task) =>
                  task.task.status === "work" &&
                  task.user.user_id === store.profileData.user_id
              )
              .map((task, index) => (
                <li
                  key={index}
                  className="border-b py-2 flex justify-between"
                  onClick={() => openDetails(task.task_info_id)}
                >
                  <p>{task.task.text}</p>
                </li>
              ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-80 rounded-md mb-4 border-2 border-[#424769]">
          <div className="bg-[#424769] h-8">
            <h2>Новые задачи</h2>
          </div>
          <div className="p-4">
            {tasks
              .filter((task) => task.status === "new")
              .map((task, index) => (
                <li key={index} className="border-b py-2 flex justify-between">
                  <p>{task.text}</p>
                  <div className="flex gap-4 ">
                    <span
                      className="text-[#f9b17a]"
                      onClick={() => getTask(task.task_id!)}
                    >
                      Взять в работу
                    </span>
                  </div>
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Tasks);
