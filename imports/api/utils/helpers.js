import { Random } from "meteor/random";
import {
  PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT,
  PERMISSION_ALLOW_SEND_REQUEST,
  ROLE_ALUMNI,
  ROLE_EVALUATOR,
  ROLE_MOBILE_APP_USER,
  ROLE_STUDENT,
} from "/imports/both/constants";

/**
 * Generate predefined _id value to replace the default _id value created by mongo. It is using the collection prefix and random id
 *
 * @param {String} colPrefix
 * @returns {String}
 */

export const idGeneratorHelper = (colPrefix) =>
  `${colPrefix || "id"}_${Random.id(17)}`;

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
      return [
        PERMISSION_ALLOW_SEND_REQUEST,
        PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT,
      ];
      break;
    case "alumni":
      return [
        PERMISSION_ALLOW_SEND_REQUEST,
        PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT,
      ];
      break;
    // case "evaluator":
    //   return [PER, PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT];
    //   break;

    default:
      return [];
      break;
  }
};
