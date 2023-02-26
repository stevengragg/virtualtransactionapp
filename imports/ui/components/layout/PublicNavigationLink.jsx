import React from "react";
import { Link, NavLink, useMatch } from "react-router-dom";
import { classNames } from "../../utils/helper";

function PublicNavigationLink({ path, title }) {
  const match = useMatch(path);
  return (
    <a
      className={classNames(
        "inline-block py-2 px-4 no-underline",
        match ? "font-bold text-green" : "font-base text-slate-700"
      )}
      href={path}
    >
      {title}
    </a>
  );
}

export default PublicNavigationLink;
