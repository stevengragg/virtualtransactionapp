import { Meteor } from "meteor/meteor";
import { Requests } from "/imports/both/collections/Requests";

Meteor.publish("requests.getAll", function () {
  if (!this.userId) return this.ready();
  return Requests.find({ userId: this.userId });
});

Meteor.publish("requests.getOne", function (requestId) {
  console.log(requestId);
  if (!requestId) return this.ready();
  const userId = this.userId;
  if (!userId) return this.ready();
  return Requests.find({ _id: requestId, userId });
});
