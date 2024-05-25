import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isLoggedIn) {
    return <Navigate to={from} />;
  }
  return children;
};

export default ProtectedRoute;
