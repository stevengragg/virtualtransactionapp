import { ServiceConfiguration } from "meteor/service-configuration";

async function initGoogleServiceConfig() {
  await ServiceConfiguration.configurations.upsertAsync(
    { service: "google" },
    {
      $set: {
        loginStyle: "popup",
        clientId:
          process.env.GOOGLE_CLIENT_ID || Meteor.settings.google.clientId, // insert your clientId here
        secret:
          process.env.GOOGLE_CLIENT_SECRET ||
          Meteor.settings.google.clientSecret, // insert your secret here
      },
    }
  );
}

export { initGoogleServiceConfig };
