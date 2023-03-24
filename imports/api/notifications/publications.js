import { Meteor } from "meteor/meteor";
import { Notifications } from "./collection";

Meteor.publish("notifications.myNotifs", function () {
  if (!this.userId) return this.ready();
  return Notifications.find({ userId: this.userId });
});
