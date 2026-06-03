import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TaskService from "../services/TaskService";
import type ITaskDetails from "../interfaces/ITaskDetails";
import type IChat from "../interfaces/IChat";

const TaskDetails = () => {
  const location = useLocation();
  const task_id = location.state?.task_id;
  const [task, setTask] = useState<ITaskDetails>();

  const [msgText, setMsgText] = useState<string>("");

  const [msgList, setMsgList] = useState<IChat[]>([]);

  useEffect(() => {
    if (location.state?.task_id) {
      loadTasks(location.state?.task_id);
    }
  }, [location.state?.task_id]);

  useEffect(() => {
    if (task?.task.task_id) {
      loadMsg(task?.task.task_id);
    }
  }, [task?.task.task_id]);

  const loadTasks = async (id: string) => {
    const response = await TaskService.findOneWithoutUserTasks(id);

    // const [data] = response.data;
    // console.log()
    setTask(response.data);
  };

  const closeTask = async (id: string) => {
    const response = await TaskService.closeTask(id);

    if (response.status === 200) window.location.replace("/tasks");
  };

  const testRG = async (id: string) => {
    const response = await TaskService.test(id);
  };

  const sendMsg = async (id: string) => {
    const body: any = {
      user_id: id,
      text: msgText,
      task_id: task?.task.task_id,
      author_id: task?.user.user_id,
    };
    const response = await TaskService.sendMessage(body);
    setMsgList([...msgList, response.data]);
  };

  const loadMsg = async (id: string) => {
    const response = await TaskService.loadMessage(id);
    const [list, n] = response.data;
    setMsgList(list);
  };
  return (
    <div>
      <h1>Подробности задачи</h1>

      <div className="max-w/5 flex justify-between gap-4">
        <div className=" w-1/2 min-h-80 rounded-md mb-4 border-2 border-[#424769] p-2">
          <p>Пользователь: {task?.task.creator?.profile?.name}</p>
          <p>
            Пользователь распологается: {task?.task.creator?.profile?.place}
          </p>
          <p>Контакнтый телефон: {task?.task.creator?.profile?.phone}</p>
          <>
            Категория: {task?.task.category?.name} -{" "}
            {task?.task.category?.description}
          </>{" "}
          <p>Текст заявки - {task?.task.text}</p>
          <p>Статус - {task?.task.status}</p>
          <span
            className="text-[#f9b17a]"
            onClick={() => closeTask(task?.task_info_id!)}
          >
            Закрыть задачу
          </span>
        </div>
        <div className=" w-1/2 min-h-80 rounded-md mb-4 border-2 border-[#424769]">
          <div className="w-full mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col h-[400px]">
              <div className="px-4 py-3 border-b dark:border-zinc-700"></div>
              <div
                className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2"
                id="chatDisplay"
              >
                {msgList.map((organization, index) => (
                  <div
                    key={index}
                    className={`${
                      organization.type_message === "input"
                        ? "chat-message self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm"
                        : "chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm"
                    } `}
                    // onClick={() => openDetails(organization.chat_id!)}
                  >
                    {organization.text}
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 border-t dark:border-zinc-700">
                <div className="flex gap-2">
                  <input
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                    id="chatInput"
                    type="text"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                    id="sendButton"
                    onClick={() => sendMsg(task?.task.creator_id!)}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
