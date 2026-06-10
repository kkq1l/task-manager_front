import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiQueueList,
  HiBuildingOffice2,
  HiClipboardDocumentCheck,
  HiUser,
  HiPencilSquare,
  HiOutlineBuildingOffice,
  HiViewColumns,
  HiOutlineDocumentText,
  HiMiniNewspaper,
} from "react-icons/hi2";
import { Context } from "../main";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const { store } = useContext(Context);

  const showSidebar = () => setSidebar(!sidebar);

  const menu = [
    {
      text: "Новости",
      to: "news",
      icon: <HiMiniNewspaper className={`w-6 h-7 text-white`} />,
    },
    ...(store.profileData.roles == "super_admin"
      ? [
          {
            text: "Организации",
            to: "organization",
            icon: <HiBuildingOffice2 className={`w-6 h-7 text-white`} />,
          },
        ]
      : []),

    ...(store.profileData.roles == "admin"
      ? [
          {
            text: "Моя организация",
            to: "my_org",
            icon: <HiOutlineBuildingOffice className={`w-6 h-7 text-white`} />,
          },
        ]
      : []),

    ...(store.profileData.dep_type == "executor"
      ? [
          {
            text: "Задачи",
            to: "tasks",
            icon: <HiClipboardDocumentCheck className={`w-6 h-7 text-white`} />,
          },
        ]
      : []),
    {
      text: "Создать тикет",
      to: "ticket",
      icon: <HiPencilSquare className={`w-6 h-7 text-white`} />,
    },
    {
      text: "Мои задачи",
      to: "my_tasks",
      icon: <HiOutlineDocumentText className={`w-6 h-7 text-white`} />,
    },
    {
      text: "Профиль",
      to: "profile",
      icon: <HiUser className={`w-6 h-7 text-white`} />,
    },
  ];

  return (
    <>
      <div className="hidden lg:flex">
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
            {menu.map((item) => (
              <Link
                to={item.to}
                className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
              >
                {item.icon}
                <span
                  className={`${!sidebar && "hidden"} origin-left duration-200`}
                >
                  {item.text}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex justify-between items-center p-4 ">
          {/* */}
          <div className="w-full justify-center py-3 px-2 flex gap-2 shadow-lg rounded-xl bg-[#424769] backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            {menu.map((item) => (
              <Link
                to={item.to}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[#2d3250] hover:text-blue-600 transition-colors duration-300"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
