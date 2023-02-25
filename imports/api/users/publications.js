// @ts-nocheck
import { Meteor } from "meteor/meteor";

Meteor.publish("user.currentUser", function publishUserss() {
  const userId = this.userId;
  if (!userId) return this.stop();
  return Meteor.users.find({ _id: userId });
});

// ROLES
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ "user._id": this.userId });
  } else {
    this.ready();
  }
});
