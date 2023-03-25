import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";

import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { Accounts } from "meteor/accounts-base";

// api-only
import "/imports/api/users";
import "/imports/api/request";
import "/imports/api/notifications";

// both
import vta from "/imports/both/vta";

// utils
import { log, error } from "/imports/both/logger";
import { seedSuperAdmin, SEED_SUPER_ADMIN_EMAIL } from "/imports/api/utils/security";
import { initOnCreateUser, initPermissionsAndRoles } from "../imports/api/init/initForUserAndAuth";
import { initGoogleServiceConfig } from "/imports/api/init/initServiceConfig";
import { HTMLEmailGenerator } from "/imports/api/utils/helpers";
import { MAX_LOGIN_EXPIRATION_DAYS } from "/imports/api/utils/constants";
import uploadFileToS3 from "/imports/api/utils/uploadFileToS3";
import { Requests } from "/imports/both/collections/Requests";
import { multerUploadImg } from "/imports/api/utils/multerMiddleware";
import { FOR_SCHEDULING } from "/imports/both/constants";

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

Accounts.config({
  loginExpirationInDays: MAX_LOGIN_EXPIRATION_DAYS,
});

// Email Template for Passwordless Login
Accounts.emailTemplates.sendLoginToken.subject = (user) => `Your secure authentication token for Account/Student ID: ${user.username} | Virtual Transaction Assistance | UCC Congress`;
Accounts.emailTemplates.from = Meteor.settings.senderEmail || "Virtual Transaction Assistance <registrar@uccvta.app>";
Accounts.emailTemplates.siteName = vta.product();
Accounts.emailTemplates.sendLoginToken.html = (user, url, { sequence }) =>
  HTMLEmailGenerator(
    "Virtual Transaction Assistance | UCC Congress",
    `<p>Please use the secure authentication token below and type it on our verification form to get authenticated and verified. Do not share this token to anyone.</p><br><div>Token: <span><b>${sequence}</b></span></div><br><br><small>Do not reply to this email.</small>`,
  );

WebApp.connectHandlers
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use(multerUploadImg.single("file"))
  .use("/api/upload-proof-of-payment", async (req, res) => {
    try {
      const file = req?.file;
      const requestId = req?.body?.requestId;
      log("/api/upload-proof-of-payment", { requestId });
      let invalid = [];
      if (req.method !== "POST") invalid.push({ method: "Must be POST request." });
      if (!requestId) invalid.push({ request: "Missing request Id" });
      if (invalid.length > 0) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: {
              success: false,
              message: "Internal Server Error",
              errors: invalid,
            },
          }),
        );
        return;
      }

      const request = await Requests.findOneAsync({ _id: requestId });
      console.log(request?._id);
      const uploadImageResult = await uploadFileToS3(file, process.env.AWS_S3_IMAGE_FOLDER, requestId, request?.proofOfPaymentKey);
      log("/api/upload-proof-of-payment: attempted to upload image", uploadImageResult);
      if (!uploadImageResult.success) {
        res.writeHead(500);
        res.end(
          JSON.stringify({
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: {
              success: false,
              message: "Failed to upload image file.",
              imageUrl: null,
            },
          }),
        );
      }

      const updateRequest = await Requests.updateAsync(
        { _id: requestId },
        { $set: { proofOfPayment: `https://${uploadImageResult.bucket}.s3.amazonaws.com/${uploadImageResult.key}`, proofOfPaymentKey: uploadImageResult.key, isPaid: true, status: FOR_SCHEDULING } },
      );
      log("/api/upload-proof-of-payment: attempted to update request", updateRequest);
      res.writeHead(200);
      res.end(
        JSON.stringify({
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: {
            success: true,
            message: "good job",
          },
        }),
      );
      log("/api/save-email: ended");
    } catch (error) {
      log("/api/save-email: failed", { errorMessage: error?.message || "Internal Server Error" });
      res.writeHead(500);
      res.end(
        JSON.stringify({
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: {
            success: false,
            message: `Failed to execute. ${error?.message || "Internal Server Error."}`,
          },
        }),
      );
    }
  });
