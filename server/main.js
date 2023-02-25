import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";
import { Accounts } from "meteor/accounts-base";

// api-only
import "/imports/api/users";
import "/imports/api/request";

// both
import vta from "/imports/both/vta";

// utils
import { log, error } from "/imports/both/logger";
import {
  executeInitPermissionsAndRoles,
  seedSuperAdmin,
  SEED_SUPER_ADMIN_EMAIL,
} from "/imports/api/utils/security";

Meteor.startup(() => {
  try {
    log("============= VTA Server Startup SUCCESS [🔰] =============");
    // log("VTA APP Env: here ", { Production: vta.PRODUCTION, Staging: vta.STAGING });

    log("🌲🌴🌳 VTA environment: config check", {
      VTAProduction: vta.PRODUCTION,
      VTAStaging: vta.STAGING,
      VTASEED: vta.SEED,
      MeteorPROD: Meteor.isProduction,
      MeteorAPPTEST: Meteor.isAppTest,
      MeteorDEV: Meteor.isDevelopment,
      MeteorMOBILE: Meteor.isCordova,
    });

    if (!Accounts.findUserByEmail(SEED_SUPER_ADMIN_EMAIL) && vta.SEED) {
      log("VTA Super Admin Seeding for the first time 🚀 ...");
      seedSuperAdmin();
    }

    if (vta.INIT_PERM_ROLES) {
      log("VTA Initializing permissions and roles for the first time ✅ ...");
      executeInitPermissionsAndRoles();
    }
  } catch (err) {
    error("============= VTA Server Startup FAILED [❌] =============");
    error(err);
  }
});

ServiceConfiguration.configurations.upsertAsync(
  { service: "google" },
  {
    $set: {
      loginStyle: "popup",
      clientId: process.env.GOOGLE_CLIENT_ID || Meteor.settings.google.clientId, // insert your clientId here
      secret:
        process.env.GOOGLE_CLIENT_SECRET || Meteor.settings.google.clientSecret, // insert your secret here
    },
  }
);
