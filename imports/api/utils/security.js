// @ts-nocheck
import { Meteor } from "meteor/meteor";
import _ from "lodash";

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
export const SEED_SUPER_ADMIN_USERNAME = "superadmin2023";

export const seedSuperAdmin = () =>
  Accounts.createUser({
    email: SEED_SUPER_ADMIN_EMAIL,
    password: SEED_SUPER_ADMIN_PASSWORD,
    profile: {
      firstName: SEED_SUPER_ADMIN_FIRSTNAME,
      lastName: SEED_SUPER_ADMIN_LASTNAME,
    },
    username: SEED_SUPER_ADMIN_USERNAME,
  });

// export const executeInitPermissionsAndRoles = () => {
//   Roles.createRole(ROLE_SUPER_ADMIN, { unlessExists: true });
//   Roles.createRole(ROLE_MOBILE_APP_USER, { unlessExists: true });
//   Roles.createRole(ROLE_ALUMNI, { unlessExists: true });
//   Roles.createRole(ROLE_STUDENT, { unlessExists: true });
//   Roles.createRole(ROLE_EVALUATOR, { unlessExists: true });
// };
