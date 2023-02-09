import { Meteor } from "meteor/meteor";
let vta = {};
vta.product = () =>
  process.env.PRODUCT_NAME || Meteor.settings.public.vta.product;
vta.process = () =>
  process.env.PROCESS_NAME || Meteor.settings.public.vta.process;

vta.STAGING = process.env.STAGING?.toString() === "true";
vta.PRODUCTION = process.env.PRODUCTION?.toString() === "true";

vta.isAdmin = (userId) => true;

export default vta;
