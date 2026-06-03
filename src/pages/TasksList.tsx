import React, { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import TaskService from "../services/TaskService";
import type ITask from "../interfaces/ITask";
import { Context } from "../main";

const TasksList = () => {
  const { store } = useContext(Context);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [lengthTasks, setLengthTasks] = useState<number>(0);

  const activate = async (id: string) => {
    const response = await UserService.activate(id);
  };

  useEffect(() => {
    if (store.profileData?.user_id) {
      loadTasks();
    }
  }, [store.profileData?.user_id]);

  const loadTasks = async () => {
    const body: ITask = {
      org_id: store.profileData.org_id,
      creator_id: store.profileData.user_id,
      no_status: "complete",
    };
    const response = await TaskService.findAll(body);
    const [data, n] = response.data;

    setTasks(data);
    setLengthTasks(n);
  };
  return (
    <div>
      <div className=" max-w/5 min-h-30 rounded-md mb-4 border-2 border-[#424769]">
        <div className="bg-[#424769] h-8">
          <h2>У вас открыто {lengthTasks} задач</h2>
        </div>
        <div className="p-4">
          <div id="opened_tasks">
            {tasks.map((task, index) => (
              <li key={index} className="border-b py-2">
                <p>
                  {task.text} - {task.status}.
                  <p
                    className="-mt-6 w-full text-[#f9b17a] text-right"
                    onClick={() => activate(task.task_id!)}
                  >
                    Сделать активным
                  </p>
                </p>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
