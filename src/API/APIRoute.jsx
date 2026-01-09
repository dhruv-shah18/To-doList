const BACKEND_ROUTE = import.meta.env.VITE_API_ROUTE;
const TASKS_ROUTE = "tasks/";
const USERS_ROUTE = "users/";


export const API = {
  GETALLTASK: BACKEND_ROUTE + TASKS_ROUTE + "alltasks",
  // GETALLTASKS: (pagination, page, limit) => `${BACKEND_ROUTE}${TASKS_ROUTE}alltasks/${pagination}/${page}/${limit}`,
  GETALLTASKS: (pagination, page, limit, search) => `${BACKEND_ROUTE}${TASKS_ROUTE}alltasks?pagination=${pagination}&page=${page}&limit=${limit}&search=${search}`,
  ADMINGETUSERBYID: (id) => `${BACKEND_ROUTE}${TASKS_ROUTE}admin/${id}`,
  ADMINTASKSUMMARY: BACKEND_ROUTE + TASKS_ROUTE + "admin/usertask/summary",
  ADMINGETALLUSERS: BACKEND_ROUTE + TASKS_ROUTE + "admin",
  ADMINSUMMARY: BACKEND_ROUTE + TASKS_ROUTE + "admin/summary",
  GETIMPTASK: BACKEND_ROUTE + TASKS_ROUTE + "imptasks",
  GETCOMPTASK: BACKEND_ROUTE + TASKS_ROUTE + "completedtask",
  GETPRIOTASK: BACKEND_ROUTE + TASKS_ROUTE + "prioritytask",
  ADDNEWTASK: BACKEND_ROUTE + TASKS_ROUTE + "addnewtask",
  UPDATETASK: BACKEND_ROUTE + TASKS_ROUTE + "updatetask",
  // GETTASKBYID: (id) => `${BACKEND_ROUTE}${TASKS_ROUTE}/getbyIdTask/${id}`,
  DELETETASK: (id) => `${BACKEND_ROUTE}${TASKS_ROUTE}deletetask/${id}`,
  USER_REGISTER: BACKEND_ROUTE + USERS_ROUTE + "register",
  USER_LOGIN: BACKEND_ROUTE + USERS_ROUTE + "login",
  USER_LOGOUT: BACKEND_ROUTE + USERS_ROUTE + "logout",
  DELETE_USER: (id) => BACKEND_ROUTE + USERS_ROUTE + "deleteuser/" + id,
  AI_CHAT: BACKEND_ROUTE + "chat",
};