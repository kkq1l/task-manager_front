import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./AppAuth.tsx";
import Store from "./services/store/store.tsx";
import type { IStore } from "./interfaces/Store.ts";
import AppRoute from "./AppRoute.tsx";

const store = new Store();

export const Context = createContext<IStore>({
  store,
});

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
