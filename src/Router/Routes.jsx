import { BrowserRouter as Router } from "react-router";
import { Routes, Route, Navigate } from "react-router";
import Layout from "../Layout";
import ImportantTask from "../components/Tasks/ImportantTask";
import PriorityTask from "../components/Tasks/PriorityTask";
import CompletedTask from "../components/Tasks/CompletedTask";
import Tasks from "../components/Tasks/Tasks";
import UserLogin from "../components/AuthPages/UserLogin";
import UserRegister from "../components/AuthPages/UserRegister";
import TasksFallback from "../components/Tasks/TasksFallback";
import ProtectedRoutes from "./ProtectedRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Admin from "../components/Admin/Admin";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/alltasks"
            element={
              <ProtectedRoutes>
                <Layout Component={Tasks} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/imptasks"
            element={
              <ProtectedRoutes>
                <Layout Component={ImportantTask} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/prioritytasks"
            element={
              <ProtectedRoutes>
                <Layout Component={PriorityTask} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/completedtasks"
            element={
              <ProtectedRoutes>
                <Layout Component={CompletedTask} />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Layout Component={TasksFallback} />
              </ProtectedRoutes>
            }
          />
          <Route 
           path="/admin"
           element={
            <PrivateRoutes>
              <Layout Component={Admin} hideNavbar/>
            </PrivateRoutes>
           }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
