import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { UserContext } from "../App";

function PrivateRoute({ children }) {
  const [user] = useContext(UserContext);

  let location = useLocation();

  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
