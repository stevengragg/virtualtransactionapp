// @ts-nocheck
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AppIconSVG from "/imports/ui/svg/AppIconSVG";
import { HiMenuAlt1 } from "@react-icons/all-files/hi/HiMenuAlt1";
import PublicNavigationLink from "../../layout/PublicNavigationLink";
import PublicNavigationButton from "../../layout/PublicNavigationButton";

function Header() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  return (
    <nav id="header" className="sticky w-full z-30 top-0 text-white bg-orange-300">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 font-bold text-sm lg:text-xl">
        <div className="pl-4 flex items-center ">
          <Link className="toggleColour text-white no-underline hover:no-underline flex items-center space-x-4 " to="/">
            <span>
              <AppIconSVG width={64} height={64} />
            </span>
            <span>
              <img src="/imgs/UCCLOGO.png" alt="UCCLogo" className=" object-contain w-1/2" />
            </span>
          </Link>
          <div className="block lg:hidden pr-4">
            <button
              onClick={() => setNavBarOpen(!navBarOpen)}
              id="nav-toggle"
              className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <HiMenuAlt1 width={128} height={128} />
            </button>
          </div>
        </div>
        {/* Not Mobile */}

        <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <PublicNavigationLink path="/#hero" title="Home" />
            </li>
            <li className="mr-3">
              <PublicNavigationLink path="/#guide" title="Guide" />
            </li>
          </ul>
          <div className="flex flex-wrap items-center space-x-2">
            <PublicNavigationButton title="Login" extraClassNames="bg-green-500 text-white" path="login" />
            <PublicNavigationButton title="Register" extraClassNames="bg-red-500 text-gray-300" path="register" />
          </div>
        </div>

        {/* Mobile */}

        {navBarOpen ? (
          <div className="w-full flex-grow lg:items-center lg:w-auto block lg:hidden mt-2 lg:mt-0 bg-transparent text-black p-4 lg:p-0 z-20">
            <ul className="list-reset justify-end flex-1 items-center">
              <li className="mr-3">
                <PublicNavigationLink path="/#hero" title="Home" navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
              </li>
              <li className="mr-3">
                <PublicNavigationLink path="/#guide" title="Guide" navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <PublicNavigationButton title="Login" extraClassNames="bg-green-500 text-white" path="login" navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
              <PublicNavigationButton title="Register" extraClassNames="bg-red-500 text-gray-300" path="register" navBarOpen={navBarOpen} setNavBarOpen={setNavBarOpen} />
            </div>
          </div>
        ) : null}
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}

export default Header;
