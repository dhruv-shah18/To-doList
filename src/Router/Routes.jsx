import { BrowserRouter as Router } from "react-router";
import { Routes, Route, Navigate } from "react-router";
import Layout from "../Layout";
import ImportantTask from "../components/ImportantTask";
import PriorityTask from "../components/PriorityTask";
import CompletedTask from "../components/CompletedTask";
import Tasks from "../components/Tasks";
import UserLogin from "../components/UserLogin";
import UserRegister from "../components/UserRegister";
import TasksFallback from "../components/TasksFallback";
import ProtectedRoutes from "./ProtectedRoutes";

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
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
