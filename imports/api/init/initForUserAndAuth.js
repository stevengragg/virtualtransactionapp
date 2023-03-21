import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
import { log } from "/imports/both/logger";
import { ROLE_ALUMNI, ROLE_MOBILE_APP_USER, ROLE_STUDENT, ROLE_WEB_APP_USER } from "/imports/both/constants";

function initOnCreateUser() {
  Accounts.onCreateUser((options, user) => {
    log("account on create user: started", { options, user });

    const customizedUser = Object.assign(user);
    customizedUser._id = `usr_${Random.id(15)}`;
    // We still want the default hook's 'profile' behavior.
    if (!user?.services?.google && options?.profile) {
      customizedUser.profile = options?.profile;

      log("account on create user: assign profile", { customizedUser });
    }

    if (user?.services?.google) {
      customizedUser.emails = [];
      customizedUser.emails.push({
        address: user?.services?.google?.email,
        verified: user?.services?.google?.verified_email,
      });
      customizedUser.profile = {};
      customizedUser.profile.profilePicture = user?.services?.google?.picture;
      customizedUser.profile.firstName = user?.services?.google?.given_name;
      customizedUser.profile.lastName = user?.services?.google?.family_name;
      customizedUser.profile.middleName = "";
      customizedUser.profile.acceptsDataPrivacy = true;

      log("account on create user: google used, user updated", {
        options,
        customizedUser,
      });
    }

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
