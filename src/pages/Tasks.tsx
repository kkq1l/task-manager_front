import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import TaskService from "../services/TaskService";
import { observer } from "mobx-react-lite";
import type ITask from "../interfaces/ITask";

const Tasks = () => {
  const { store } = useContext(Context);
  const [org_id, setOrgId] = useState<string>();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (store.profileData?.org_id) {
      loadTasks();
    }
  }, [store.profileData]);

  const loadTasks = async () => {
    const body: ITask = {
      org_id: store.profileData.org_id,
      status: "new",
    };
    const response = await TaskService.findAll(body);
    const [data, n] = response.data;

    setTasks(data);
  };
  return (
    <div>
      <h1>Tasks</h1>
      <h2>Новые задачи</h2>
      {tasks.map((task, index) => (
        <li key={index} className="border-b py-2">
          <p>
            {task.text} - {task.status}.
          </p>
        </li>
      ))}
    </div>
  );
};

export default observer(Tasks);
