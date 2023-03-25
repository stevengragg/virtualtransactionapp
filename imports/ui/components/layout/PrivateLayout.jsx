import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { extractPageTitle } from "../../utils/helper";
import PrivateFooterNavigation from "./PrivateFooterNavigation";
import PrivateNavigation from "./PrivateNavigation";
import PrivateSideBar from "./PrivateSideBar";

function PrivateLayout() {
  const { pathname } = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const auth = useAuth();
  if (!auth?.user?.emails[0].verified) return <Navigate to="/verify-account" />;

  return (
    <div className="h-screen bg-transparent">
      {/* Sidebar */}
      <PrivateSideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      {/* Content area */}

      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        {/* Navigation Header */}
        <div class="mb-20">
          <PrivateNavigation user={auth?.user} title={extractPageTitle(pathname)} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
          <Outlet />
        </div>
        <PrivateFooterNavigation />
      </main>
    </div>
  );
}

export default PrivateLayout;
