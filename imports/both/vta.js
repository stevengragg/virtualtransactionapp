import { Meteor } from "meteor/meteor";
let vta = {};
vta.product = () =>
  process.env.PRODUCT_NAME || Meteor.settings.public.vta.product;
vta.process = () =>
  process.env.PROCESS_NAME || Meteor.settings.public.vta.process;

vta.STAGING =
  process.env.STAGING?.toString() === "true" ||
  Boolean(Meteor.settings.public.vta.staging);
vta.PRODUCTION =
  process.env.PRODUCTION?.toString() === "true" ||
  Boolean(Meteor.settings.public.vta.production);

vta.SEED = Boolean(Meteor.settings.config.isSeed);
vta.INIT_PERM_ROLES = Boolean(
  Meteor.settings.config.isInitializeRolesAndPermissions
);
// vta.isAdmin = (userId) => true;

export default vta;
