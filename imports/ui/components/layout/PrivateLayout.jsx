import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PrivateNavigation from "./PrivateNavigation";
import PrivateSideBar from "./PrivateSideBar";

function PrivateLayout() {
  const auth = useAuth();
  if (!auth?.user?.emails[0].verified) return <Navigate to="/verify-account" />;

  return (
    <div className="h-screen bg-blue-50">
      {/* Sidebar */}
      <PrivateSideBar />
      {/* Content area */}

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        {/* Navigation Header */}
        <PrivateNavigation />
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateLayout;
