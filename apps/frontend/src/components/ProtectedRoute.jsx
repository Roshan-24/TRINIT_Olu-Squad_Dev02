import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return !isLoggedIn ? <Navigate to={"/signIn"} replace /> : children;
};

export default ProtectedRoute;
