import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";

import useTitle from "../hooks/useTitle";

import DashboardRowOne from "../components/dashboard/DashboardRowOne";
import { COMPLETED, FOR_SCHEDULING, PENDING, SCHEDULED } from "/imports/both/constants";
import { Requests } from "/imports/both/collections/Requests";
import DashboardRowTwo from "../components/dashboard/DashboardRowTwo";

function DashboardPage() {
  useTitle("Dashboard - Virtual Transaction Assistance | UCC Congress");
  const { requestsWaitingForApproval, requestsPaid, requestsScheduled, requestsCompleted, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("requests.getAll");
    const requestsWaitingForApproval = Requests.find({ status: PENDING }).count();
    const requestsPaid = Requests.find({ status: FOR_SCHEDULING }).count();
    const requestsScheduled = Requests.find({ status: SCHEDULED }).count();
    const requestsCompleted = Requests.find({ status: COMPLETED }).count();

    if (!handler.ready()) {
      return { requestsWaitingForApproval: 0, requestsPaid: 0, requestsScheduled: 0, requestsCompleted: 0, isLoading: true };
    }

    return { requestsWaitingForApproval, requestsPaid, requestsScheduled, requestsCompleted, isLoading: false };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-full px-6 py-6 mx-auto">
      <DashboardRowOne requestsWaitingForApproval={requestsWaitingForApproval} requestsPaid={requestsPaid} requestsScheduled={requestsScheduled} requestsCompleted={requestsCompleted} />
      <DashboardRowTwo />
    </div>
  );
}

export default DashboardPage;
