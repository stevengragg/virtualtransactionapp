import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import { Requests } from "/imports/both/collections/Requests";
import { PENDING } from "/imports/both/constants";
import { log, error } from "/imports/both/logger";
import { idGeneratorHelper } from "../utils/helpers";

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
  async "request.create"({ requests }) {
    try {
      const user = Meteor.user();
      const userId = user?._id;
      log("request.create: started", { requests });
      if (!userId) throw new Meteor.Error("not-authorized", "You are not authorized to perform this action");

      const response = await Requests.insertAsync({ _id: idGeneratorHelper("req"), userId: userId, requests, createdAt: new Date(), assignedTo: "", course: user?.profile?.course, status: PENDING });
      log("request.create: created", { response });
      return !!response;
    } catch (err) {
      error("request.create: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },
  "request.update": update,
  "request.remove": remove,
  "request.find": findById,
});
