import { observer } from "mobx-react-lite";
import "./App.css";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import AppPublic from "./AppPublic";
import AppAuth from "./AppAuth";

function AppRoute() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return <>{store.isAuth ? <AppAuth /> : <AppPublic />}</>;
}

export default observer(AppRoute);
