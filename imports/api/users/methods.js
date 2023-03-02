import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Random } from "meteor/random";
import { log, error } from "/imports/both/logger";
import { extractPermissions, extractRoles } from "../utils/helpers";

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const userFunc = {
  create: async function (
    studentId,
    email,
    firstName,
    lastName,
    middleName,
    password,
    confirmPassword,
    course,
    accountType
  ) {
    try {
      log(`userCreate: started`, {
        studentId,
        email,
        firstName,
        lastName,
        middleName,
        password,
        confirmPassword,
        course,
        accountType,
      });
      // Make sure that user can only access userCreate when they are not logged in
      const currentUserId = this.userId;
      if (currentUserId)
        throw new Meteor.Error(
          "Not Authorized",
          "Not authorized to do such actions."
        );
      // Validate the arguments using the check package
      check(studentId, String);
      check(email, String);
      check(firstName, String);
      check(lastName, String);
      // check(middleName, Match.OneOf([String, undefined, null]));
      check(password, String);
      check(confirmPassword, String);
      check(course, String);
      check(accountType, String);

      // TODO: Provide more intense validation here

      // Perform additional custom validation if needed
      if (password !== confirmPassword) {
        throw new Meteor.Error(
          "password-mismatch",
          "The password and confirm password fields do not match"
        );
      }

      // Create the new user object
      const newUser = {
        username: studentId, // Student ID as User name
        password,
        email,
        profile: {
          firstName,
          lastName,
          middleName,
          course,
          accountType,
          acceptsDataPrivacy: true,
        },
      };

      // Attempt to create the new user using the Accounts package
      const userId = await Accounts.createUserAsync(newUser);
      if (!userId)
        throw new Meteor.Error(
          "create-user-failed",
          "Failed to register. Please try again."
        );
      log(`userCreate: user created with ID ${userId}`);
    } catch (err) {
      error("userCreate: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  sendVerificationCode: async function () {},

  verifyAccountUsingVerificationCode: async function () {},

  updateProfileInfo: async function (
    studentId,
    firstName,
    lastName,
    middleName,
    course,
    accountType
  ) {},

  updateAccountInfo: async function (
    isChangeEmailOnly,
    email,
    password,
    confirmPassword
  ) {},
};

export const userCompleteProfileInfo = Meteor.methods({
  "user.create": userFunc.create,
  "user.sendVerificationCode": userFunc.sendVerificationCode,
  "user.verifyAccountUsingVerificationCode":
    userFunc.verifyAccountUsingVerificationCode,
  "user.updateProfileInfo": userFunc.updateProfileInfo,
  "user.updateAccount": userFunc.updateAccountInfo,
});
