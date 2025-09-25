const BACKEND_ROUTE = "http://localhost:5000/api/";
const TASKS_ROUTE = "tasks/";
const USERS_ROUTE = "users/";


export const API = {
  GETALLTASK: BACKEND_ROUTE + TASKS_ROUTE + "alltasks",
  GETIMPTASK: BACKEND_ROUTE + TASKS_ROUTE + "imptasks",
  GETCOMPTASK: BACKEND_ROUTE + TASKS_ROUTE + "completedtask",
  GETPRIOTASK: BACKEND_ROUTE + TASKS_ROUTE + "prioritytask",
  ADDNEWTASK: BACKEND_ROUTE + TASKS_ROUTE + "addnewtask",
  UPDATETASK: BACKEND_ROUTE + TASKS_ROUTE+ "updatetask",
  // GETTASKBYID: (id) => `${BACKEND_ROUTE}${TASKS_ROUTE}/getbyIdTask/${id}`,
  DELETETASK: (id) => `${BACKEND_ROUTE}${TASKS_ROUTE}deletetask/${id}`,
  USER_REGISTER: BACKEND_ROUTE + USERS_ROUTE + "register",
  USER_LOGIN: BACKEND_ROUTE + USERS_ROUTE + "login",
  USER_LOGOUT: BACKEND_ROUTE + USERS_ROUTE + "logout",
};