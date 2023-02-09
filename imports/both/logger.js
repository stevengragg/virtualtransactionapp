// @ts-nocheck
import { Meteor } from "meteor/meteor";
import { DDP } from "meteor/ddp";
import ms from "./vta.js";
import _ from "lodash";

let logFibersId = 0;

const logToServer = (type, p1, p2) => {
  let object = {
    _type: type,
    _localDateMs: Date.now(),
    _source: `${ms.product()}-${ms.process()}`,
  };

  if (typeof p1 === "string") object._message = p1;
  else if (p1 && p1.stack) {
    object._stack = p1.stack.split("\n");
    object._message = p1.toString();
    object.err = p1.toString();
  } else object = _.extend(object, p1);

  if (p2) object = _.extend(object, p2);

  if (p2 && p2.err && p2.err.stack && p2.err.stack.split) {
    object._stack = p2.err.stack.split("\n");
    if (object.err && object.err.response && object.err.response.statusCode) {
      if (!object.statusCode)
        object.statusCode = object.err.response.statusCode;
      object.err = `Request failed with statusCode ${object.err.response.statusCode}`;
    }

    object.err = object.err.toString();
  } else if (!object._stack) {
    try {
      object._stack = new Error().stack.split("\n").splice(2);
    } catch (err) {}
  }

  const args = [];
  try {
    if (Meteor.isClient) args.push(p1);
    else if (type === "error")
      args.push(typeof p1 === "string" ? p1 : JSON.stringify(p1));
    else
      args.push(
        typeof p1 === "string" ? `\x1b[0;33m${p1}\x1b[0;m` : JSON.stringify(p1)
      );
  } catch (e) {
    args.push(p1);
  }

  if (Meteor.isServer) {
    const fibers = require("fibers");
    fibers.current._id = fibers.current._id || logFibersId++;
    object._FID = `fid_${fibers.current._id}`;
    args.push(`_FID${fibers.current._id}`);

    const ddp =
      DDP._CurrentMethodInvocation.get() ||
      DDP._CurrentPublicationInvocation.get();
    if (ddp?.connection?.httpHeaders?.["x-forwarded-for"])
      object._ip = ddp.connection.httpHeaders["x-forwarded-for"];
  }

  try {
    object._userId = Meteor.userId();
  } catch (e) {}

  if (p2) {
    try {
      if (Meteor.isClient) args.push(p2);
      else args.push(typeof p2 === "string" ? p2 : JSON.stringify(p2));
    } catch (e) {
      args.push(p2);
    }
  }

  if (object.err) {
    args.push(object.err);
    args.push(object._stack.join("\n"));
  }

  if (type === "debug") {
    args.unshift("\x1b[0;34m");
    console.log.apply(null, args);
  } else if (console) {
    console[type].apply(null, args);
  }
};

const log = logToServer.bind(null, "log");
const error = logToServer.bind(null, "error");
const debug = logToServer.bind(null, "debug");

export { log, error, debug };
