import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import React from "react";
import { useParams } from "react-router-dom";
import { Requests } from "/imports/both/collections/Requests";

function ManageRequestPage() {
  let { id } = useParams();
  const { request, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("requests.getOne", id);
    const request = Requests.find({ _id: id }).fetch();

    if (!handler.ready()) {
      return { request: {}, isLoading: true };
    }

    return {
      request: request[0],
      isLoading: false,
    };
  }, []);

  console.log(id, request, isLoading);
  return <div>ManageRequestPage</div>;
}

export default ManageRequestPage;
