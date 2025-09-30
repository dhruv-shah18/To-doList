import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import Loader from "../components/Loader";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;