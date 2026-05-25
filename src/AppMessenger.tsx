import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthMessenger from "./pages/AuthMessenger";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "./main";

function AppMessenger() {
  const { store } = useContext(Context);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<AuthMessenger />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(AppMessenger);
