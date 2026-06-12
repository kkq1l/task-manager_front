import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Store from "./services/store/store.tsx";
import type { IStore } from "./interfaces/Store.ts";
import AppRoute from "./AppRoute.tsx";
import { init, initData, miniApp } from "@telegram-apps/sdk";

const store = new Store();

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

    initData.state();

    const user = initData.user();

    if (user) {
      const body: any = {
        login: user.id,
        user_id: user.id,
      };
      store.setSystem("tg");
      store.setTgData(initData.raw()!);
      window.dispatchEvent(new Event("userIdReady"));
    }
  } catch (error) {
    console.error("Ошибка инициализации Telegram Mini App:", error);
  }
};

const test = async () => {
  if (window.WebApp.initData) {
    store.setSystem("max");
    store.setTgData(window.WebApp.initData);
    console.error(initData);
    console.error("gg wp", initDataUnsafe);
    if (initData.startParam) {
      store.setTestMax(initData.startParam!);
    }
  } else {
  }
};

initializeTelegramSDK();
test();

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
