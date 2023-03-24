import React from "react";
import { NavLink, useMatch, useResolvedPath, useLocation, Link } from "react-router-dom";
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
  // {
  //   path: "/users",
  //   title: "Users",
  //   icon: "fas fa-users",
  // },
  // {
  //   path: "/settings",
  //   title: "Settings",
  //   icon: "fas fa-cog",
  // },
];

function PrivateSideBar() {
  const { pathname } = useLocation();
  const [sideBarOpen, setSideBarOpen] = React.useState(true);

  return (
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full  flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-slate-100 p-0 antialiased transition-transform duration-200 xl:left-0 xl:translate-x-0 ps translate-x-0 shadow-soft-xl">
      <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
        <Link className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" to="/dashboard">
          <img src="/imgs/ucc_logo.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">UCC-Congress | VTA</span>
        </Link>
      </div>
      <hr className="h-px mt-0 bg-gradient-to-r from-transparent via-black/40 to-transparent" />
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
