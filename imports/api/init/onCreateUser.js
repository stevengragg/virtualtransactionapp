import { Accounts } from "meteor/accounts-base";
import { log } from "/imports/both/logger";

Accounts.onCreateUser((options, user) => {
  log("account on create user: started", { options });

  const customizedUser = Object.assign(user);
  // We still want the default hook's 'profile' behavior.
  if (options?.profile) {
    customizedUser.profile = options?.profile;
    customizedUser.roles = options?.roles;
    customizedUser.permissions = options?.permissions;
    //   customizedUser.notifications = options?.notifications;
    customizedUser._id = `usr_${Random.id(11)}`;
    // customizedUser.billing = options.billing;
    log("account on create user: assign profile", { options, customizedUser });
  }

  if (user?.services?.google) {
    customizedUser.emails = [];
    customizedUser.emails.push({
      address: user?.services?.google?.email,
      verified: user?.services?.google?.verified_email,
    });
    //   customizedUser.profile.socials = [
    //     {
    //       type: "Instagram",
    //       link: "",
    //     },
    //     {
    //       type: "Twitter",
    //       link: "",
    //     },
    //     {
    //       type: "LinkedIn",
    //       link: "",
    //     },
    //   ];
    // customizedUser.profile.profilePicture = user?.services?.google?.picture;
    //   customizedUser.profile.name = options?.profile?.name.toLowerCase();
    customizedUser.profile.acceptsDataPrivacy = true;
    //   customizedUser.profile.privacyPolicyAgreement = true;

    //   const { permissions } = extractPermissionsAndRoutes("jobSeeker");
    customizedUser.roles = [];
    //   customizedUser.notifications = {
    //     jobApplications: false,
    //     jobOpening: false,
    //     recommendation: false,
    //   };
    log("account on create user: google used, user updated", {
      options,
      customizedUser,
    });
  }

  return customizedUser;
});
