import { Random } from "meteor/random";

/**
 * Generate predefined _id value to replace the default _id value created by mongo. It is using the collection prefix and random id
 *
 * @param {String} colPrefix
 * @returns {String}
 */

export const idGeneratorHelper = (colPrefix) =>
  `${colPrefix || "id"}_${Random.id(17)}`;
