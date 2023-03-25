import React from "react";
import { useTracker } from "meteor/react-meteor-data";

import useTitle from "../hooks/useTitle";

import DashboardRowOne from "../components/dashboard/DashboardRowOne";

function DashboardPage() {
  useTitle("Dashboard - Virtual Transaction Assistance | UCC Congress");

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <DashboardRowOne />
    </div>
  );
}

export default DashboardPage;
