import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { APP_USER_PERM, USER_ROLES } from "utils/constants";
import { useAuth } from "../hooks/useAuth";

function RequireAuth({ children }) {
  const location = useLocation();
  const { user, isLoading, isLoggedIn } = useAuth();
  if (!isLoading && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  // } else if (user && !user?.roles.includes(APP_USER_PERM)) {
  //   return <Navigate to="/signin" state={{ from: location.pathname }} />;
  // } else if (user && !user?.roles.includes(targetRole?.permission)) {
  //   return <Navigate to="/" />;
  // }

  return children;
}

export default RequireAuth;
