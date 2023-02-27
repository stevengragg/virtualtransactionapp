// @ts-nocheck
import { Meteor } from "meteor/meteor";
import _ from "lodash";
import {
  PERMISSION_ALLOW_ALL,
  ROLE_MOBILE_APP_USER,
  ROLE_SUPER_ADMIN,
} from "/imports/both/constants";
import { log } from "/imports/both/logger";

// TODO: Helper to check if is Super Admin

/**
 * Check if current user is one of the super admin
 *
 * @param {String} userId
 * @returns {Boolean}
 */
export const isSuperAdmin = (userId = Meteor.userId()) => {
  const superAdmins = Meteor.settings.super_admins || [];
  return _.includes(superAdmins, userId);
};

export const SEED_SUPER_ADMIN_EMAIL = "superadmin@uccvta.com";
export const SEED_SUPER_ADMIN_PASSWORD = "uccvta2023A!";
export const SEED_SUPER_ADMIN_FIRSTNAME = "John";
export const SEED_SUPER_ADMIN_LASTNAME = "Cruz";
export const SEED_SUPER_ADMIN_USERNAME = "UCCVTASUPERADMIN";

export const seedSuperAdmin = async () => {
  const adminUser = Accounts.createUser({
    email: SEED_SUPER_ADMIN_EMAIL,
    password: SEED_SUPER_ADMIN_PASSWORD,
    profile: {
      firstName: SEED_SUPER_ADMIN_FIRSTNAME,
      lastName: SEED_SUPER_ADMIN_LASTNAME,
    },
    username: SEED_SUPER_ADMIN_USERNAME,
  });

  log("seedSuperAdmin: admin user ", adminUser);

  if (adminUser) {
    const attachAdminRole = await Meteor.users.updateAsync(
      { _id: adminUser },
      {
        $set: {
          roles: [ROLE_SUPER_ADMIN, ROLE_MOBILE_APP_USER],
          permissions: [PERMISSION_ALLOW_ALL],
        },
      }
    );
    log("seedSuperAdmin: role attached", attachAdminRole);
  }
};
