import { useContext } from "react";
import { Context } from "../main";

const Header = () => {
  const { store } = useContext(Context);
  return (
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <span className="font-semibold">TaskManager</span>
      <nav className="flex gap-6 text-sm text-gray-600">
        <a href="/" className="hover:text-black">
          Главная
        </a>
        <a href="/product" className="hover:text-black">
          О продукте
        </a>
        {store.profileData.roles === "super_admin" && (
          <>
            <a href="/organization" className="hover:text-black">
              Организации
            </a>
          </>
        )}
        {(store.profileData.roles === "super_admin" ||
          store.profileData.roles === "admin") && (
          <>
            <a href="/tasks" className="hover:text-black">
              Задачи
            </a>
          </>
        )}
        {!store.isAuth ? (
          <>
            <a href="auth" className="hover:text-black">
              Войти
            </a>
            <a href="registration" className="hover:text-black">
              Регистрация
            </a>
          </>
        ) : (
          <>
            <a href="ticket" className="hover:text-black">
              Создать тикет
            </a>
            <a href="profile" className="hover:text-black">
              Профиль
            </a>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
