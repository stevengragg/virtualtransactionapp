import { Random } from "meteor/random";
import moment from "moment";

import { PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT, PERMISSION_ALLOW_SEND_REQUEST, ROLE_ALUMNI, ROLE_EVALUATOR, ROLE_MOBILE_APP_USER, ROLE_STUDENT, ROLE_WEB_APP_USER } from "/imports/both/constants";

/**
 * Generate predefined _id value to replace the default _id value created by mongo. It is using the collection prefix and random id
 *
 * @param {String} colPrefix
 * @returns {String}
 */

export const idGeneratorHelper = (colPrefix) => `${colPrefix || "id"}_${Random.id(17)}`;

export const extractRoles = (accountType) => {
  switch (accountType) {
    case "student":
      return [ROLE_STUDENT, ROLE_MOBILE_APP_USER];
      break;
    case "alumni":
      return [ROLE_ALUMNI, ROLE_MOBILE_APP_USER];
      break;
    case "evaluator":
      return [ROLE_EVALUATOR, ROLE_MOBILE_APP_USER];
      break;

    default:
      return [];
      break;
  }
};

export const extractPermissions = (accountType) => {
  switch (accountType) {
    case "student":
      return [PERMISSION_ALLOW_SEND_REQUEST, PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT];
      break;
    case "alumni":
      return [PERMISSION_ALLOW_SEND_REQUEST, PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT];
      break;
    // case "evaluator":
    //   return [PER, PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT];
    //   break;

    default:
      return [];
      break;
  }
};

export const isStrongPassword = (password) => {
  if (!password) return false;
  const minLength = 8;
  const maxLength = 30;
  const minLowerCase = 1;
  const minUpperCase = 1;
  const minNumbers = 1;
  const minSymbols = 1;
  const symbols = /[$-/:-?{-~!"^_`\[\]]/g;

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!password.match(/[a-z]/g) || password.match(/[a-z]/g).length < minLowerCase) {
    return false;
  }

  if (!password.match(/[A-Z]/g) || password.match(/[A-Z]/g).length < minUpperCase) {
    return false;
  }

  if (!password.match(/\d/g) || password.match(/\d/g).length < minNumbers) {
    return false;
  }

  if (!password.match(symbols) || password.match(symbols).length < minSymbols) {
    return false;
  }

  return true;
};

export const getAssignedRolePerAccountType = (accountType) => {
  switch (accountType) {
    case "alumni":
      return [ROLE_ALUMNI, ROLE_WEB_APP_USER];
      break;
    case "student":
      return [ROLE_STUDENT, ROLE_WEB_APP_USER];
      break;
    default:
      break;
  }
};

export const generatePasscode = () => {
  // Generate a random number between 100000 and 999999
  const passcode = Random.fraction() * (999999 - 100000 + 1) + 100000;
  return Math.floor(passcode);
};

export const HTMLEmailGenerator = (title, innerContent) =>
  `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
            color: #0080ff;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <br>
        <br>
        ${innerContent}
      </body>
    </html>
  `;
