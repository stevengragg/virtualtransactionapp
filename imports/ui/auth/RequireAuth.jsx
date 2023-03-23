import React from "react";
import { Meteor } from "meteor/meteor";
import { Navigate, useLocation } from "react-router-dom";
// import { APP_USER_PERM, USER_ROLES } from "utils/constants";
import { useAuth } from "../hooks/useAuth";

function RequireAuth({ children }) {
  const location = useLocation();
  const { user, isLoading, isLoggedIn } = useAuth();
  console.log(Meteor.userId());
  console.log("Require Authentication 🚀", { user, isLoading, isLoggedIn });
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  return children;
}

export default RequireAuth;
