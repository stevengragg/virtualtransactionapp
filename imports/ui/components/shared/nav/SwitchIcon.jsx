import React from "react";
import DashboardSVG from "/imports/ui/svg/DashboardSVG";
import RequestsSVG from "/imports/ui/svg/RequestsSVG";

function SwitchIcon({ icon, active }) {
  console.log(icon);
  switch (icon) {
    case "dashboard":
      return <DashboardSVG active={active} />;
    case "requests":
      return <RequestsSVG active={active} />;

    default:
      return null;
  }
}

export default SwitchIcon;
