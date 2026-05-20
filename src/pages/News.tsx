import { useContext, useState } from "react";
import type INews from "../interfaces/INews";
import { Context } from "../main";
import NewsService from "../services/NewsService";

const News = () => {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNews = async () => {
    const body: INews = {
      user_id: store.profileData.user_id,
      title: title,
      description: description,
      visible: visible,
      notification: notification,
      org_id: store.profileData.org_id,
    };
    console.log(body);
    const response = await NewsService.create(body);

    console.log(response);
  };
  return (
    <div>
      {isModalOpen && (
        <>
          <div className="max-w-xl w-full mx-auto bg-gray-900 rounded-xl overflow-hidden">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5">
              <form autoComplete="off">
                <input
                  placeholder="Оглавление"
                  name="new-lin"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  type="text"
                />
                <br />
                <textarea
                  placeholder="Описание"
                  name="new-paord"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                />
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={notification}
                    onChange={(e) => setNotification(e.target.checked)}
                  />
                  <span>Оповещение</span>
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                  />
                  <span>Показывать в ленте</span>
                </label>
              </form>
            </div>
            <div className="pt-5 pb-6 px-6 text-right bg-gray-800 -mb-2">
              <button
                onClick={() => closeModal()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200"
              >
                Отмена
              </button>
              <button
                onClick={() => createNews()}
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
              >
                Добавить
              </button>
            </div>
          </div>
        </>
      )}
      <h1>News</h1>
      <input type="button" value="Добавить" onClick={() => openModal()} />
    </div>
  );
};

export default News;
