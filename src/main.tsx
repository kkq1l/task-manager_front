import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Store from "./services/store/store.tsx";
import type { IStore } from "./interfaces/Store.ts";
import AppRoute from "./AppRoute.tsx";
import { init, initData, miniApp } from "@telegram-apps/sdk";

const store = new Store();
// const navigate = useNavigate();

export const Context = createContext<IStore>({
  store,
});

const initializeTelegramSDK = async () => {
  try {
    await init();

    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      window.dispatchEvent(new Event("miniAppReady"));
    }

    initData.restore();
    initData.state();

    const user = initData.user();
    console.log("Данные пользователя:", user);

    if (user) {
      const body: any = {
        login: user.id,
        user_id: user.id,
      };
      store.setSystem("tg");
      // store.setAuth(true);

      // console.log("ID пользователя:", window.userId);
      // console.log("Имя пользователя:", window.firstName);

      // Ожидаем полной готовности всех данных
      window.dispatchEvent(new Event("userIdReady"));
      // navigate("/auth_tg");
    } else {
      console.error("Ошибка: Пользовательские данные не загружены!");
    }
  } catch (error) {
    console.error("Ошибка инициализации Telegram Mini App:", error);
  }
};
initializeTelegramSDK();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Context.Provider
      value={{
        store,
      }}
    >
      <AppRoute />
    </Context.Provider>
  </StrictMode>
);
