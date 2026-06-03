import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import type IUserProfileData from "../interfaces/IUserProfileData";
import { useNavigate } from "react-router-dom";
import type ITask from "../interfaces/ITask";
import TaskService from "../services/TaskService";

const Profile = () => {
  const { store } = useContext(Context);

  const [profileData, setProfileData] = useState<IUserProfileData>();

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [lengthTasks, setLengthTasks] = useState<number>(0);

  useEffect(() => {
    if (store.profileData?.user_id) {
      loadData();
      loadTasks();
    }
  }, [store.profileData?.user_id]);

  const openEdit = () => {
    navigate("/profile_edit");
  };

  const loadData = async () => {
    const user_id = store.profileData.user_id;

    const response = await UserService.loadProfile(user_id);
    setProfileData(response.data);
  };

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

  const activate = async (id: string) => {
    const response = await UserService.activate(id);
  };
  return (
    <div>
      <h1>Profile {profileData?.name}</h1>
      <br />
      <p>Номер телефона: {profileData?.phone}</p>
      <p>Распологаюсь: {profileData?.place}</p>
      <p>Мои удаленные доступы: {profileData?.remote_access.id}</p>
      <input
        type="button"
        className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
        value="Выйти"
        onClick={() => store.logout()}
      />
      <input
        type="button"
        value="Редактировать"
        className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
        onClick={() => openEdit()}
      />
      <div id="opened_tasks">
        <h1>У вас открыто {lengthTasks} задач</h1>
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
  );
};

export default observer(Profile);
