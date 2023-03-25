import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import { Requests } from "/imports/both/collections/Requests";

import { ACCOUNT_TYPE_ALUMNI, PENDING } from "/imports/both/constants";
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
  async "request.create"({ requests, modeOfClaiming }) {
    try {
      const user = Meteor.user();
      const userId = user?._id;
      log("request.create: started", { requests, modeOfClaiming });

      if (!userId) throw new Meteor.Error("not-authorized", "You are not authorized to perform this action");
      if (!user?.profile?.accountType) throw new Meteor.Error("not-authorized", "Please update your profile and choose an account type (Student or Alumni)");
      if (!user?.profile?.course) throw new Meteor.Error("not-authorized", "Please update your profile and choose a course");
      if (user?.profile?.accountType === ACCOUNT_TYPE_ALUMNI && !user?.profile?.yearGraduated) throw new Meteor.Error("not-authorized", "Please update your profile and choose a year graduated");
      if (!requests || !requests.length) throw new Meteor.Error("invalid-parameters", "Please select at least one document to request");
      if (requests.length > 3) throw new Meteor.Error("invalid-parameters", "You can only request up to 3 documents at a time");
      if (!modeOfClaiming) throw new Meteor.Error("invalid-parameters", "Please select a mode of claiming");

      const response = await Requests.insertAsync({
        _id: idGeneratorHelper("req"),
        modeOfClaiming,
        userId: userId,
        requests,
        createdAt: new Date(),
        assignedTo: "",
        course: user?.profile?.course,
        status: PENDING,
      });
      log("request.create: created", { response });
      return !!response;
    } catch (err) {
      error("request.create: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },
  async "request.getUploadUrl"({ requestId, fileId, fileName }) {
    try {
      const user = Meteor.user();
      const userId = user?._id;
      log("request.create: getUploadUrl", { requestId, fileId, fileName });

      if (!userId) throw new Meteor.Error("not-authorized", "You are not authorized to perform this action");
      return true;
    } catch (err) {
      error("request.getUploadUrl: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },
  "request.update": update,
  "request.remove": remove,
  "request.find": findById,
});
