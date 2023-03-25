import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { Email } from "meteor/email";
import { check, Match } from "meteor/check";
import { Random } from "meteor/random";
import { log, error } from "/imports/both/logger";
import { extractPermissions, extractRoles, generatePasscode, getAssignedRolePerAccountType, HTMLEmailGenerator, isStrongPassword } from "../utils/helpers";
import { ACCOUNT_TYPE_ALUMNI, ACCOUNT_TYPE_SELECTION, EMAIL_REGEX } from "/imports/both/constants";
import { MAX_RESEND_VERIFICATION_EMAIL_COUNT } from "../utils/constants";

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Meteor.methods({
  /**
   * Register user and trigger sending of verification code
   *
   * @param {String} param0.studentId
   * @param {String} param0.email
   * @param {String} param0.firstName
   * @param {String} param0.lastName
   * @param {String} param0.middleName
   * @param {String} param0.password
   * @param {String} param0.confirmPassword
   * @param {String} param0.course
   * @param {String} param0.accountType
   * @param {String} param0.yearGraduated
   * @returns {Boolean}
   *
   */

  async "user.create"({ studentId, email, firstName, lastName, middleName, password, confirmPassword, course, accountType, yearGraduated }) {
    try {
      log(`user.create: started`, {
        studentId,
        email,
        firstName,
        lastName,
        middleName,
        password,
        confirmPassword,
        course,
        accountType,
        yearGraduated,
      });
      // Make sure that user can only access user.create when they are not logged in
      const currentUserId = this.userId;
      if (currentUserId) throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
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
      if (accountType === ACCOUNT_TYPE_ALUMNI) check(yearGraduated, String);

      // TODO: Provide more intense validation here

      let errorArray = [];
      // Perform additional custom validation if needed

      if (!studentId || !email || !firstName || !lastName || !password || !confirmPassword || !course || !accountType) {
        throw new Meteor.Error("input-validations", `See Errors: Please provide all required fields.`);
      }

      if (email && !email.match(EMAIL_REGEX)) {
        errorArray.push("Please provide a valid email address.");
      }

      if (password !== confirmPassword) {
        errorArray.push("The password and confirm password fields do not match");
      }

      if (!isStrongPassword(password)) {
        errorArray.push("Please create a strong password that matches the system criteria.");
      }

      if (!ACCOUNT_TYPE_SELECTION.includes(accountType || "none-of-the-above")) {
        errorArray.push("Please select allowed account type (Alumni, Student).");
      }

      if (accountType && accountType === ACCOUNT_TYPE_ALUMNI && !yearGraduated) {
        errorArray.push("Please select year graduated");
      }

      if (errorArray.length) {
        throw new Meteor.Error("input-validations", `See Errors: ${errorArray}`);
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
          yearGraduated,
        },
      };

      // Attempt to create the new user using the Accounts package
      const userId = await Accounts.createUserAsync(newUser);
      if (!userId) {
        throw new Meteor.Error("create-user-failed", "Failed to register. Please try again.");
      }
      log(`user.create: user created with ID ${userId}`);
      // Assign roles
      if (Meteor.roleAssignment.find({ "user._id": userId }).count() === 0) {
        // Need _id of existing user record so this call must come after `Accounts.createUser`.
        const assignedRole = Roles.addUsersToRoles(userId, getAssignedRolePerAccountType(accountType));
        log("user.create: roles was assigned", { assignedRole });
      }

      Meteor.callAsync("user.sendVerificationCode", userId);
    } catch (err) {
      error("user.create: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  async "user.update"({ firstName, lastName, middleName, course, accountType, yearGraduated }) {
    try {
      log(`user.update: started`, {
        firstName,
        lastName,
        middleName,
        course,
        accountType,
        yearGraduated,
      });
      // Make sure that user can only access user.create when they are not logged in
      const currentUserId = this.userId;
      if (!currentUserId) throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
      // Validate the arguments using the check package

      check(firstName, String);
      check(lastName, String);
      check(course, String);
      check(accountType, String);
      if (accountType === ACCOUNT_TYPE_ALUMNI) check(yearGraduated, String);

      // TODO: Provide more intense validation here

      let errorArray = [];
      // Perform additional custom validation if needed

      if (!firstName || !lastName || !course || !accountType) {
        throw new Meteor.Error("input-validations", `See Errors: Please provide all required fields.`);
      }

      if (!ACCOUNT_TYPE_SELECTION.includes(accountType || "none-of-the-above")) {
        errorArray.push("Please select allowed account type (Alumni, Student).");
      }

      if (accountType && accountType === ACCOUNT_TYPE_ALUMNI && !yearGraduated) {
        errorArray.push("Please select year graduated");
      }

      if (errorArray.length) {
        throw new Meteor.Error("input-validations", `See Errors: ${errorArray}`);
      }

      // Update user profile information
      const updateUser = await Meteor.users.updateAsync(
        { _id: currentUserId },
        {
          $set: {
            "profile.firstName": firstName,
            "profile.lastName": lastName,
            "profile.middleName": middleName,
            "profile.course": course,
            "profile.accountType": accountType,
            "profile.yearGraduated": yearGraduated,
          },
        },
      );
      log(`user.update: attempted to update the user`, { updateUser });
      return !!updateUser;
    } catch (err) {
      error("user.update: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  async "user.sendLoginTokenEmail"(username) {
    try {
      log(`user.sendLoginTokenEmail: started`, { username });
      check(username, String);

      // Find the user
      const user = Accounts.findUserByUsername(username);
      if (!user) {
        throw new Meteor.Error("user-not-found", "User not found.");
      }
      this.unblock();
      const response = Accounts.sendLoginTokenEmail({ userId: user._id, sequence: generatePasscode(), email: user.emails[0].address });
      log(`user.sendLoginTokenEmail: email sent`, { response });
    } catch (err) {
      error("user.sendLoginTokenEmail: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  /**
   * Get all current attached roles to the user
   *
   * @returns {[String]}
   */
  async "user.getCurrentRoles"() {
    try {
      const currentUserId = this.userId;
      if (!currentUserId) {
        throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
      }
      return Roles.getRolesForUser(currentUserId);
    } catch (error) {
      error("user.getCurrentRoles: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  /**
   * Using the userId on the onCreateUser Account hook, send verification code
   * and attach the expected verification code to the user
   *
   * @param {String} userId
   * @returns {Boolean}
   */

  async "user.sendVerificationCode"(userId) {
    try {
      if (!userId) {
        throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
      }

      const foundUser = await Meteor.users.findOneAsync({ _id: userId });
      console.log(foundUser);
      if (!foundUser) {
        throw new Meteor.Error("user-not-found", "Unable to find the user.");
      }
      const oneTimePasscode = generatePasscode();
      const verificationCodeSet = await Meteor.users.updateAsync(
        { _id: userId },
        {
          $set: {
            "profile.verificationCode": oneTimePasscode,
          },
        },
      );
      log("user.sendVerificationCode: attempted to set and send the one time passcode to verify account ", { verificationCodeSet });

      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

      if (verificationCodeSet) {
        const emailSent = await Email.sendAsync({
          replyTo: Meteor.settings.senderEmailNoReply,
          from: Meteor.settings.senderEmail || "Virtual Transaction Assistance | UCC Congress <registrar@uccvta.app>",
          to: foundUser?.emails[0].address,
          subject: "Verify your account",
          html: HTMLEmailGenerator(
            "Virtual Transaction Assistance | UCC Congress",
            `<p>Please verify your account using the code below. Do not share this code to anyone.</p><br><div>Verification Code: <span><b>${oneTimePasscode}</b></span></div><br><br><small>Do not reply to this email.</small>`,
          ),
        });
        log("user.sendVerificationCode: attempted to send email", {
          emailSent,
        });
        if (!emailSent) return false;
      }

      return true;
    } catch (err) {
      error("user.sendVerificationCode: internal server error", {
        err,
      });
      return false;
    }
  },

  /**
   * Update the account to be verified
   *
   * @param {Number} code
   */

  async "user.verifyAccountUsingVerificationCode"(code) {
    try {
      const user = Meteor.user();
      const currentUserId = user._id;
      log("user.verifyAccountUsingVerificationCode: started", { currentUserId, code });
      if (!currentUserId) {
        throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
      }
      check(code, Number);
      if (!code) {
        throw new Meteor.Error("input-validations", `See Errors: Please provide the verification code.`);
      }
      if (user.profile.verificationCode !== code) {
        throw new Meteor.Error("input-validations", `See Errors: The verification code is invalid.`);
      }

      if (user.emails[0].verified) {
        throw new Meteor.Error("input-validations", `See Errors: The account is already verified.`);
      }

      const response = await Meteor.users.updateAsync({ _id: currentUserId }, { $set: { "emails.0.verified": true }, $unset: { "profile.verificationCode": 1, "profile.verificationAttempts": 1 } });

      log("user.verifyAccountUsingVerificationCode: attempted to verify the account", { currentUserId, response });
      return !!response;
    } catch (err) {
      error("user.verifyAccountUsingVerificationCode: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  /**
   * Resend verification code
   *
   * @returns {Boolean}
   */

  async "user.resendVerificationCode"() {
    try {
      const user = Meteor.user();
      const currentUserId = user._id;
      log("user.resendVerificationCode: started", { currentUserId });
      if (!currentUserId) {
        throw new Meteor.Error("Not Authorized", "Not authorized to do such actions.");
      }
      if (user.profile.verificationAttempts >= MAX_RESEND_VERIFICATION_EMAIL_COUNT) {
        throw new Meteor.Error("input-validations", `See Errors: You have reached the maximum number of attempts to verify your account.`);
      }
      await Meteor.users.updateAsync({ _id: currentUserId }, { $inc: { "profile.verificationAttempts": 1 } });
      const response = await Meteor.callAsync("user.sendVerificationCode", currentUserId);
      log("user.resendVerificationCode: attempted to resend the verification code", { currentUserId, response });
      return !!response;
    } catch (err) {
      error("user.resendVerificationCode: internal server error", {
        err,
      });
      throw new Meteor.Error(err?.error, err?.reason);
    }
  },

  async "user.updateProfileInfo"() {},

  async "user.updateAccount"() {},
});
