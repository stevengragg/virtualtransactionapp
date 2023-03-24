import { Meteor } from "meteor/meteor";
import { Requests } from "./collection";

Meteor.publish("requests.allRequests", function () {
  return Requests.find({});
});
