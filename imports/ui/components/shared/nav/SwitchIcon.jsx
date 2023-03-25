import React from "react";

import DashboardSVG from "/imports/ui/svg/DashboardSVG";
import RequestsSVG from "/imports/ui/svg/RequestsSVG";
import SettingsSVG from "/imports/ui/svg/SettingsSVG";

function SwitchIcon({ icon, active }) {
  console.log(icon);
  switch (icon) {
    case "dashboard":
      return <DashboardSVG active={active} />;
    case "requests":
      return <RequestsSVG active={active} />;
    case "settings":
      return <SettingsSVG active={active} />;
    default:
      return null;
  }
}

export default SwitchIcon;
