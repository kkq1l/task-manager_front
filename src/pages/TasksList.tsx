import React, { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import TaskService from "../services/TaskService";
import type ITask from "../interfaces/ITask";
import { Context } from "../main";

const TasksList = () => {
  const { store } = useContext(Context);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [lengthTasks, setLengthTasks] = useState<number>(0);

  const activate = async (id: number) => {
    const response = await UserService.activate(tasks[id].task_id!);

    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === task.creator?.active_task
          ? {
              ...task,
              creator: task.creator && { ...task.creator, active_task: "null" },
            }
          : task
      )
    );

    setTasks((prev) => {
      const task = [...prev];
      task[id] = {
        ...task[id],
        creator: task[id].creator && {
          ...task[id].creator,
          active_task: task[id].task_id,
        },
      };

      return task;
    });
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
                  {task.creator?.active_task == task.task_id ? (
                    <p className="-mt-6 w-full  text-right">Задача активна</p>
                  ) : (
                    <>
                      <p
                        className="-mt-6 w-full text-[#f9b17a] text-right"
                        onClick={() => activate(index)}
                      >
                        Сделать активной
                      </p>
                    </>
                  )}
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
