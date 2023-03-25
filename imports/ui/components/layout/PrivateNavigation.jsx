import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { VscBellDot } from "@react-icons/all-files/vsc/VscBellDot";
import { VscBell } from "@react-icons/all-files/vsc/VscBell";
import { RiLogoutBoxRLine } from "@react-icons/all-files/ri/RiLogoutBoxRLine";
import { Notifications } from "/imports/both/collections/Notifications";
import { TiThMenuOutline } from "@react-icons/all-files/ti/TiThMenuOutline";
import { Link } from "react-router-dom";

function PrivateNavigation({ user, title, sideBarOpen, setSideBarOpen }) {
  const { notifications, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("notifications.myNotifs", 5);
    const notifications = Notifications.find({}, { sort: { createdAt: -1 } }).fetch();

    if (!handler.ready()) {
      return { notifications: [], isLoading: true };
    }

    return {
      notifications,
      isLoading: false,
    };
  }, []);

  console.log(notifications, isLoading);

  return (
    <nav className="mt-4 relative flex flex-wrap items-center justify-between px-0 py-1 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start bg-blue-100">
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav className="flex justify-between">
          <div className="flex-none">
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="leading-normal text-sm">
                <div className="opacity-50 text-slate-700">Pages</div>
              </li>
              <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">
                {title}
              </li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">{title}</h6>
          </div>
        </nav>
        <div className="flex">
          {/* Hamburger button */}
          <button className="text-slate-500 hover:text-slate-600 lg:hidden" aria-controls="sidebar" aria-expanded={sideBarOpen} onClick={() => setSideBarOpen(!sideBarOpen)}>
            <span className="sr-only">Open sidebar</span>
            <Link className="flex items-center space-x-1 text-sm whitespace-nowrap text-slate-700" to="/dashboard">
              <img src="/imgs/ucc_logo.png" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
              <img src="/icons/UCCVTALogo.svg" className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
            </Link>
            {/* <TiThMenuOutline className="text-slate-800 xl:hidden" /> */}
          </button>
        </div>
        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full cursor-pointer space-x-2">
              {/* <li className="flex items-center">
                <TiThMenuOutline className="text-slate-800" />
              </li> */}
              <li className="flex items-center">
                <span className="text-xs lg:text-sm font-semibold text-slate-700">
                  {user?.profile?.lastName}, {user?.profile?.firstName} ({user?.username})
                </span>
              </li>
              {/*  Divider */}
              <li className="flex items-center">
                <hr className=" w-px h-6 bg-slate-700 mx-3" />
              </li>
              <li className="flex items-center space-x-1" onClick={() => Meteor.logout(() => window.location.replace("/login"))}>
                <RiLogoutBoxRLine className="text-red-500" />

                <span className="text-sm font-semibold text-red-500">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNavigation;
