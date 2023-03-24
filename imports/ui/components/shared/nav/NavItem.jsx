import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import SwitchIcon from "./SwitchIcon";
import { classNames } from "/imports/ui/utils/helper";

function NavItem({ title, icon, itemPath, onClick }) {
  console.log({ title, icon, itemPath, onClick });
  let resolved = useResolvedPath(itemPath);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className="mt-0.5 w-full" onClick={onClick}>
      <Link
        className={classNames(
          "py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors",
          match ? "shadow-soft-xl rounded-lg bg-white px-4 font-semibold text-slate-700" : "",
        )}
        to={itemPath}
      >
        <div
          className={classNames(
            "mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5",
            match ? "bg-gradient-to-tl from-orange-700 to-orange-500 shadow-soft-2xl bg-white" : "",
          )}
        >
          <SwitchIcon icon={icon} active={!!match} />
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">{title}</span>
      </Link>
    </li>
  );
}

export default NavItem;
