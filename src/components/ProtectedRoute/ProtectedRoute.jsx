import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

const ProtectedRoute = (children) => {
  const { isLoggedIn } = useContext(AppContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
