import { Accounts } from "meteor/accounts-base";
import { log } from "/imports/both/logger";
function initOnCreateUser() {
  Accounts.onCreateUser((options, user) => {
    log("account on create user: started", { user });

    const customizedUser = Object.assign(user);
    // We still want the default hook's 'profile' behavior.
    if (options?.profile) {
      customizedUser.profile = options?.profile;
      customizedUser._id = `usr_${Random.id(11)}`;
      customizedUser.roles = [];
      customizedUser.permissions = [];
      customizedUser.profile.acceptsDataPrivacy = true;
      log("account on create user: assign profile", {
        options,
        customizedUser,
      });
    }

    if (user?.services?.google) {
      customizedUser.emails = [];
      customizedUser.emails.push({
        address: user?.services?.google?.email,
        verified: user?.services?.google?.verified_email,
      });

      customizedUser.profile.profilePicture = user?.services?.google?.picture;
      customizedUser.profile.firstName = options?.profile?.firstName;
      customizedUser.profile.lastName = options?.profile?.lastName;
      customizedUser.profile.acceptsDataPrivacy = true;
      customizedUser.roles = [];
      customizedUser.permissions = [];

      log("account on create user: google used, user updated", {
        options,
        customizedUser,
      });
    }

    return customizedUser;
  });
}

export default initOnCreateUser;
