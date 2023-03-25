import { Meteor } from "meteor/meteor";
import { Requests } from "/imports/both/collections/Requests";

Meteor.publish("requests.allRequests", function () {
  return Requests.find({});
});
