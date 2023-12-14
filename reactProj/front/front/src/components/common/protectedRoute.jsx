import { useAuth } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, onlybiz = false }) => {
  const { user } = useAuth();
  if (!user || (onlybiz && !user.isBusiness)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
