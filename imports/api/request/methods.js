import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Requests } from "/imports/both/collections/Requests";

export async function create(data) {
  return Requests.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return Requests.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return Requests.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return Requests.findOneAsync(_id);
}

Meteor.methods({
  "request.create": create,
  "request.update": update,
  "request.remove": remove,
  "request.find": findById,
});
