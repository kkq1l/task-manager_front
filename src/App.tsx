import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Errors/Error404";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import Profile from "./pages/Profile";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/auth" element={store.isAuth ? <Profile /> : <Auth />} />
          <Route
            path="/profile"
            element={!store.isAuth ? <Auth /> : <Profile />}
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default observer(App);
