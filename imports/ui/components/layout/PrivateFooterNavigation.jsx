import React from "react";
import FootNavItem from "../shared/nav/FootNavItem";

const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "dashboard",
  },
  {
    path: "/requests",
    title: "Requests",
    icon: "requests",
  },

  {
    path: "/settings",
    title: "Settings",
    icon: "settings",
  },
];
function PrivateFooterNavigation() {
  return (
    <div class="fixed inset-x-0 bottom-0 h-20 bg-orange-400 text-white block lg:hidden">
      <ul className="flex w-full justify-evenly h-full">
        {routes.map((route, index) => (
          <FootNavItem key={index} title={route?.title} itemPath={route?.path} icon={route?.icon} />
        ))}
      </ul>
    </div>
  );
}

export default PrivateFooterNavigation;
