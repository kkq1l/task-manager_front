import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiQueueList,
  HiBuildingOffice2,
  HiClipboardDocumentCheck,
  HiUser,
  HiPencilSquare,
  HiOutlineBuildingOffice,
} from "react-icons/hi2";
import { Context } from "../main";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const { store } = useContext(Context);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="flex">
      <div
        className={` ${
          sidebar ? "w-72" : "w-20 "
        }  bg-[#424769] h-screen p-5 pt-8 relative duration-300`}
      >
        <HiQueueList
          className={`text-white absolute cursor-pointer right-2 top-2 w-7 h-6 ${
            sidebar && "rotate-180"
          }`}
          onClick={() => showSidebar()}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !sidebar && "scale-0"
            }`}
          >
            QuestManager
          </h1>
        </div>
        <nav className="pt-6">
          {store.profileData.roles == "super_admin" && (
            <Link
              to="organization"
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
            >
              <HiBuildingOffice2 className={`w-6 h-7 text-white`} />
              <span
                className={`${!sidebar && "hidden"} origin-left duration-200`}
              >
                Организации
              </span>
            </Link>
          )}
          {store.profileData.roles == "admin" && (
            <>
              <Link
                to="my_org"
                className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
              >
                <HiOutlineBuildingOffice className={`w-6 h-7 text-white`} />
                <span
                  className={`${!sidebar && "hidden"} origin-left duration-200`}
                >
                  Моя организация
                </span>
              </Link>
              <Link
                to="tasks"
                className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
              >
                <HiClipboardDocumentCheck className={`w-6 h-7 text-white`} />
                <span
                  className={`${!sidebar && "hidden"} origin-left duration-200`}
                >
                  Задачи
                </span>
              </Link>
            </>
          )}

          <Link
            to="ticket"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
          >
            <HiPencilSquare className={`w-6 h-7 text-white`} />
            <span
              className={`${!sidebar && "hidden"} origin-left duration-200`}
            >
              Создать тикет
            </span>
          </Link>

          <Link
            to="profile"
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
          >
            <HiUser className={`w-6 h-7 text-white`} />
            <span
              className={`${!sidebar && "hidden"} origin-left duration-200`}
            >
              Профиль
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
