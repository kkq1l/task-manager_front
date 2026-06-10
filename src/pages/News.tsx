import { useContext, useEffect, useState } from "react";
import type INews from "../interfaces/INews";
import { Context } from "../main";
import NewsService from "../services/NewsService";
import { dateConvert } from "../scripts/Date";

const News = () => {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);

  const [news, setNews] = useState<INews[]>([]);

  useEffect(() => {
    if (store.profileData.org_id) load();
  }, [store.profileData.org_id]);

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

    const response = await NewsService.create(body);
  };

  const load = async () => {
    const body: INews = {
      org_id: store.profileData.org_id,
    };
    const response = await NewsService.loadAll();

    const [data, n] = response.data;

    const newsList = loadNewParametr(data);

    setNews(newsList);
  };

  const loadNewParametr = (data: INews[]) => {
    const res = data.map((newsq: INews) => ({
      ...newsq,
      shorted: true,
    }));

    return res;
  };

  const showFullDescription = (id: number) => {
    // news[id].shorted = false;

    setNews((newss) => {
      const newsq = [...newss];
      newsq[id] = {
        ...newsq[id],
        shorted: !newsq[id].shorted,
      };

      return newsq;
    });
  };
  return (
    <div>
      {isModalOpen && (
        <>
          <div className="max-w-85% lg:max-w-xl w-full mx-auto bg-[#424769] rounded-xl overflow-hidden">
            <>
              <div className="max-w-full mx-auto pt-12 pb-1  px-5">
                <form autoComplete="off">
                  <input
                    placeholder="Оглавление"
                    name="new-lin"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d] focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                  />
                  <br />
                  <textarea
                    placeholder="Описание"
                    name="new-paord"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#676f9d] text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-[#676f9d] focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
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
              <div className="pb-6 px-6 text-right bg-[#424769] -mb-2 gap-2">
                <button
                  onClick={() => closeModal()}
                  className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#2d3250] hover:bg-[#2d3250]/70 rounded-lg transition duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={() => createNews()}
                  className="inline-block w-full lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
                >
                  Добавить
                </button>
              </div>
            </>
          </div>
        </>
      )}
      <div className="flex">
        <h1>Новости</h1>
        <div className="flex justify-end gap-4 -mt-3 w-full">
          {store.profileData.roles === "admin" ||
            (store.profileData.dep_type === "executor" && (
              <input
                type="button"
                className="inline-block lg:w-auto py-3 px-5 mb-2 mt-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
                value="Добавить"
                onClick={() => openModal()}
              />
            ))}
        </div>
      </div>

      {news.map((newss, index) => (
        <>
          <div className="w-85% bg-[#424769] rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 mb-4">
            <div className="w-full">
              <p className="font-extrabold">{newss.title}</p>
              <p className="whitespace-pre-wrap">
                {newss.description?.length! > 50
                  ? newss.shorted == true
                    ? newss.description?.slice(0, 50) + "..."
                    : newss.description
                  : newss.description}
              </p>

              <p className="text-right">{dateConvert(newss.created_at!)}</p>
              <p className="text-right italic">
                {newss.dep_author
                  ? newss.dep_author.name
                  : "Администратор сайта"}
              </p>
            </div>
            {newss.description?.length! > 50 && (
              <button
                className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-[#f9b17a] hover:bg-[#f9b17a]/70 rounded-lg transition duration-200"
                onClick={() => showFullDescription(index)}
              >
                {newss.shorted == true ? "Подробнее" : "Скрыть"}
              </button>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default News;
