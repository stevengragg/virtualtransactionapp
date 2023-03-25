import React from "react";
import { Link } from "react-router-dom";

import NavItem from "../shared/nav/NavItem";

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

function PrivateSideBar({ sideBarOpen, setSideBarOpen }) {
  return (
    <aside className=" bg-blue-100 hidden lg:block max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 ps">
      <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
        <Link className="flex flex-col gap-2px-8 py-6 my-2 text-sm whitespace-nowrap text-slate-700 items-center" to="/dashboard">
          <div>
            <img src="/imgs/ucc_logo.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
            <img src="/icons/UCCVTALogo.svg" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
          </div>

          <span className="mx-auto font-semibold transition-all duration-200 ease-nav-brand text-sm">UCC-Congress | VTA</span>
        </Link>
      </div>
      <hr className="mt-2 h-1 bg-gradient-to-r from-transparent via-orange-800 to-transparent" />
      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          {routes.map((route, index) => (
            <NavItem key={index} title={route?.title} itemPath={route?.path} icon={route?.icon} onClick={() => setSideBarOpen(false)} />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default PrivateSideBar;
