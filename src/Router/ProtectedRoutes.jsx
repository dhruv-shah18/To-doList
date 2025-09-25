import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import Loader from "../components/Loader";

const ProtectedRoutes = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  // Still checking localStorage/user
  // if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;