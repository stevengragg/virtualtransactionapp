import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
import { log } from "/imports/both/logger";
import {
  ROLE_ALUMNI,
  ROLE_MOBILE_APP_USER,
  ROLE_STUDENT,
  ROLE_WEB_APP_USER,
} from "/imports/both/constants";

function initOnCreateUser() {
  Accounts.onCreateUser((options, user) => {
    log("account on create user: started", { options, user });

    const customizedUser = Object.assign(user);
    // We still want the default hook's 'profile' behavior.
    if (options?.profile) {
      customizedUser.profile = options?.profile;
      customizedUser._id = `usr_${Random.id(15)}`;
      log("account on create user: assign profile", { customizedUser });
    }

    if (!user?.services?.google && options?.email) {
      log("account on create user: send verification code", { customizedUser });
      // TODO: Send verification code
    }

    // if (user?.services?.google) {
    //   customizedUser.emails = [];
    //   customizedUser.emails.push({
    //     address: user?.services?.google?.email,
    //     verified: user?.services?.google?.verified_email,
    //   });

    //   customizedUser.profile.profilePicture = user?.services?.google?.picture;
    //   customizedUser.profile.firstName = options?.profile?.firstName;
    //   customizedUser.profile.lastName = options?.profile?.lastName;
    //   customizedUser.profile.middleName = options?.profile?.middleName;
    //   customizedUser.profile.acceptsDataPrivacy = true;
    //   customizedUser.roles = options?.roles || [];
    //   customizedUser.permissions = options?.permissions || [];

    //   log("account on create user: google used, user updated", {
    //     options,
    //     customizedUser,
    //   });
    // }

    return customizedUser;
  });
}

function initPermissionsAndRoles() {
  // Permissions
  Roles.createRole(ROLE_ALUMNI, { unlessExists: true });
  Roles.createRole(ROLE_STUDENT, { unlessExists: true });
  Roles.createRole(ROLE_MOBILE_APP_USER, { unlessExists: true });
  Roles.createRole(ROLE_WEB_APP_USER, { unlessExists: true });
}

export { initOnCreateUser, initPermissionsAndRoles };
