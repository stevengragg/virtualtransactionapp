import "/imports/api/request";

import { Meteor } from "meteor/meteor";
import { ServiceConfiguration } from "meteor/service-configuration";
import { log } from "/imports/both/logger";
import vta from "/imports/both/vta";

Meteor.startup(() => {
  log("============= VTA Server Startup =============");
  // log("MedSurf APP Env: here ", { Production: vta.PRODUCTION, Staging: vta.STAGING });
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
