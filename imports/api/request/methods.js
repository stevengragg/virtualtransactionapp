import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { RequestCollection } from "./collection";

export async function create(data) {
  return RequestCollection.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return RequestCollection.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return RequestCollection.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return RequestCollection.findOneAsync(_id);
}

Meteor.methods({
  "Request.create": create,
  "Request.update": update,
  "Request.remove": remove,
  "Request.find": findById,
});
