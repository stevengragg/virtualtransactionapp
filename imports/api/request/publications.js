import { Meteor } from "meteor/meteor";
import { RequestCollection } from "./collection";

Meteor.publish("requests.allRequests", function publishRequests() {
  return RequestCollection.find({});
});
