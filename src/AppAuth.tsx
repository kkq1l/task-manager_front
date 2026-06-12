import { observer } from "mobx-react-lite";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Error404 from "./pages/Errors/Error404";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Organization from "./pages/Organization";
import OrganizationDetails from "./pages/OrganizationDetails";
import DepartmentView from "./pages/DepartmentView";
import TaskCreate from "./pages/TaskCreate";
import Tasks from "./pages/Tasks";
import ProfileEdit from "./pages/ProfileEdit";
import News from "./pages/News";
import Sidebar from "./components/Sidebar";
import TaskKanban from "./pages/TaskKanban";
import TaskDetails from "./pages/TaskDetails";
import Forbidden from "./pages/Errors/Forbidden";
import TasksList from "./pages/TasksList";

function AppAuth() {
  const { store } = useContext(Context);
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    if (store.test) {
      navigation("task_details");
    }
  }, []);
  return (
    <>
      {" "}
      <BrowserRouter>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto p-6 bg-[#2d3250] text-[#ffffff]">
              <Routes>
                <Route
                  path="/profile"
                  element={!store.isAuth ? <Auth /> : <Profile />}
                />

                <Route
                  path="/organization"
                  element={
                    store.profileData.roles === "super_admin" ? (
                      <Organization />
                    ) : (
                      <Forbidden />
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

                <Route path="/my_org" element={<OrganizationDetails />} />
                <Route path="/kanban" element={<TaskKanban />} />
                <Route path="/task_details" element={<TaskDetails />} />
                <Route path="my_tasks" element={<TasksList />} />
                <Route path="*" element={<TaskCreate />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default observer(AppAuth);
