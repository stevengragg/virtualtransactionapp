import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Notifications } from "/imports/both/collections/Notifications";

export async function create(data) {
  // if(!this.userId) throw new Meteor.Error("not-authorized", "You are not authorized to perform this action");
  return await Notifications.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return Notifications.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return Notifications.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return Notifications.findOneAsync(_id);
}

Meteor.methods({
  "notification.create": create,
  "notification.update": update,
  "notification.remove": remove,
  "notification.find": findById,
});
