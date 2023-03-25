import React from "react";

function PrivateNavigation({ user, title, sideBarOpen, setSideBarOpen }) {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start">
      {" "}
      <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li class="leading-normal text-sm">
              <div class="opacity-50 text-slate-700">Pages</div>
            </li>
            <li class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">
              {title}
            </li>
          </ol>
          <h6 class="mb-0 font-bold capitalize">{title}</h6>
        </nav>
      </div>
    </nav>
  );
}

export default PrivateNavigation;
