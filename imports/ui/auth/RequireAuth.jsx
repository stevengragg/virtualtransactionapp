// @ts-nocheck
import { Navigate, useLocation } from "react-router-dom";
// import { APP_USER_PERM, USER_ROLES } from "utils/constants";
import { useAuth } from "../hooks/useAuth";

function RequireAuth({ children }) {
  const auth = useAuth();
  //   const location = useLocation();
  //   const { user } = useAuth();

  //   const rolePath = location.pathname.split("/")[1];
  //   // const pagePath = location.pathname.split("/")[2];
  //   const targetRole = USER_ROLES[rolePath];
  //   if (!user) {
  //     return <Navigate to="/signin" state={{ from: location.pathname }} />;
  //   } else if (user && !user?.roles.includes(APP_USER_PERM)) {
  //     return <Navigate to="/signin" state={{ from: location.pathname }} />;
  //   } else if (user && !user?.roles.includes(targetRole?.permission)) {
  //     return <Navigate to="/" />;
  //   }

  return children;
}

export default RequireAuth;
