import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function PrivateLayout() {
  const auth = useAuth();
  if (!auth?.user?.emails[0].verified) return <Navigate to="/verify-account" />;

  return (
    <div>
      PrivateLayout
      <Outlet />
    </div>
  );
}

export default PrivateLayout;
