import React from "react";
import { NavLink, useMatch } from "react-router-dom";
import { classNames } from "../../utils/helper";

function PublicNavigationButton({ extraClassNames, path, title }) {
  const match = useMatch(path);
  return (
    <NavLink
      to={path}
      className={classNames(
        "mx-auto lg:mx-0 hover:underline  font-bold rounded-md mt-4 lg:mt-0 p-2 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out",
        match ? "bg-white text-gray-800" : extraClassNames
      )}
    >
      {title}
    </NavLink>
  );
}

export default PublicNavigationButton;
