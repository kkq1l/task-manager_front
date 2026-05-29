import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Errors/Error404";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { observer } from "mobx-react-lite";
import Registration from "./pages/Registration";
import OrganizationDetails from "./pages/OrganizationDetails";
import DepartmentView from "./pages/DepartmentView";
import TaskCreate from "./pages/TaskCreate";
import Tasks from "./pages/Tasks";
import ProfileEdit from "./pages/ProfileEdit";

function AppPublic() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          {/* <Route path="/registration" element={<Registration />} /> */}

          <Route path="*" element={<Error404 />} />
          {/* 
          <Route
            path="/organization/details"
            element={<OrganizationDetails />}
          />

          <Route path="department_view" element={<DepartmentView />} />
          <Route path="ticket" element={<TaskCreate />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile_edit" element={<ProfileEdit />} /> */}
          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>

      {/* <Footer /> */}
    </>
  );
}

export default observer(AppPublic);
