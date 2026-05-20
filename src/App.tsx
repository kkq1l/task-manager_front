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
import Registration from "./pages/Registration";
import Organization from "./pages/Organization";
import OrganizationDetails from "./pages/OrganizationDetails";
import DepartmentView from "./pages/DepartmentView";
import TaskCreate from "./pages/TaskCreate";
import Tasks from "./pages/Tasks";
import ProfileEdit from "./pages/ProfileEdit";
import News from "./pages/News";

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
          <Route
            path="/registration"
            element={store.isAuth ? <Profile /> : <Registration />}
          />
          <Route path="/auth" element={store.isAuth ? <Profile /> : <Auth />} />
          <Route
            path="/profile"
            element={!store.isAuth ? <Auth /> : <Profile />}
          />
          <Route path="*" element={<Error404 />} />

          <Route
            path="/organization"
            element={
              store.profileData.roles === "super_admin" ? (
                <Organization />
              ) : (
                <Error404 />
              )
            }
          />

          <Route
            path="/organization/details"
            element={<OrganizationDetails />}
          />

          <Route path="department_view" element={<DepartmentView />} />
          <Route path="ticket" element={<TaskCreate />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile_edit" element={<ProfileEdit />} />
          {store.isAuth && <Route path="news" element={<News />} />}
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default observer(App);
