import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

// api-only
import "/imports/api/users";
import "/imports/api/request";

// both
import vta from "/imports/both/vta";

// utils
import { log, error } from "/imports/both/logger";
import {
  seedSuperAdmin,
  SEED_SUPER_ADMIN_EMAIL,
} from "/imports/api/utils/security";
import {
  initOnCreateUser,
  initPermissionsAndRoles,
} from "../imports/api/init/initForUserAndAuth";
import { initGoogleServiceConfig } from "/imports/api/init/initServiceConfig";

// Accounts on Create User hook
initOnCreateUser();

Meteor.startup(async () => {
  try {
    log("============= VTA Server Startup SUCCESS [🔰] =============");
    // log("VTA APP Env: here ", { Production: vta.PRODUCTION, Staging: vta.STAGING });
    // const findAdmin = Accounts.findUserByEmail(SEED_SUPER_ADMIN_EMAIL);
    log("🌲🌴🌳 VTA environment: config check", {
      VTAProduction: vta.PRODUCTION,
      VTAStaging: vta.STAGING,
      VTASEED: vta.SEED,
      VTAInitPermissions: vta.INIT_PERM_ROLES,
      MeteorPROD: Meteor.isProduction,
      MeteorAPPTEST: Meteor.isAppTest,
      MeteorDEV: Meteor.isDevelopment,
      MeteorMOBILE: Meteor.isCordova,
      // AdminInit: !!findAdmin,
    });

    // if (!findAdmin && vta.SEED) {
    //   log("VTA Super Admin Seeding for the first time 🚀 ...");
    //   await seedSuperAdmin();
    // }

    if (vta.INIT_PERM_ROLES) {
      log("VTA Initializing permissions and roles for the first time ✅ ...");
      initPermissionsAndRoles();
    }

    // Google
    initGoogleServiceConfig();
  } catch (err) {
    error("============= VTA Server Startup FAILED [❌] =============");
    error(err);
  }
});
