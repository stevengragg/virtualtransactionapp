import { Meteor } from "meteor/meteor";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

import AuthenticationButton from "../components/shared/form/AuthenticationButton";
import { FormSelectMenu } from "../components/shared/form/FormSelectMenu";
import { ACCOUNT_TYPE_ALUMNI, ACCOUNT_TYPE_SELECTION, COURSES } from "/imports/both/constants";
import { yearsBack } from "../utils/helper";
import useTitle from "../hooks/useTitle";

function SettingsPage() {
  useTitle("Settings - Virtual Transaction Assistance | UCC Congress");

  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    firstName: Meteor.user()?.profile?.firstName || "",
    lastName: Meteor.user()?.profile?.lastName || "",
    middleName: Meteor.user()?.profile?.middleName || "",
    course: Meteor.user()?.profile?.course || "",
    accountType: Meteor.user()?.profile?.accountType || "",
    yearGraduated: Meteor.user()?.profile?.yearGraduated || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event?.target || event;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Meteor.callAsync("user.update", { ...formData })
      .then((response) => {
        console.log(response);
        setLoading(false);
        toast.success("Profile updated", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error(error?.reason);
        setErrors(error?.reason);
        setLoading(false);
        toast.error(error?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const registrationForm = (
    <form onSubmit={handleSubmit}>
      <div className="px-1">
        <p className="text-semibold text-sm text-slate-500 leading-1">Account Information</p>
      </div>
      <div className="mt-1 flex flex-col lg:flex-row space-x-0 lg:space-x-2">
        {/* Student ID Field */}
        <div className="flex-1">
          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
            Account/Student ID <span className="text-red-500">*</span>
          </label>
          <div className="mb-1">
            <input
              type="text"
              name="studentId"
              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
              placeholder="XXXXXXXX"
              aria-label="studentId"
              aria-describedby="studentId-addon"
              disabled={true}
              defaultValue={Meteor?.user()?.username}
              required
            />
          </div>
        </div>
        {/* Email Address Field */}
        <div className="flex-1">
          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="mb-1">
            <input
              type="email"
              name="email"
              className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
              placeholder="@"
              aria-label="email"
              aria-describedby="email-addon"
              disabled={true}
              defaultValue={Meteor?.user()?.emails[0]?.address}
              required
            />
          </div>
        </div>
      </div>

      <div className="px-1 my-2">
        <p className="text-semibold text-sm text-slate-500 leading-1">Personal Information</p>
      </div>
      {/* First Name Field */}
      <div className="mt-1">
        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
          First Name <span className="text-red-500">*</span>
        </label>
        <div className="mb-1">
          <input
            type="text"
            name="firstName"
            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
            placeholder="ex. Juan"
            aria-label="firstName"
            aria-describedby="firstName-addon"
            onChange={handleInputChange}
            disabled={loading}
            required
            value={formData.firstName}
          />
        </div>
      </div>
      {/* Last Name Field */}
      <div className="mt-1">
        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
          Last Name <span className="text-red-500">*</span>
        </label>
        <div className="mb-1">
          <input
            type="text"
            name="lastName"
            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
            placeholder="ex. Dela Cruz"
            aria-label="lastName"
            aria-describedby="lastName-addon"
            onChange={handleInputChange}
            disabled={loading}
            required
            value={formData.lastName}
          />
        </div>
      </div>

      {/* Middle Name Field */}
      <div className="mt-1">
        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
          Middle Name <span className="text-slate-500">(optional)</span>
        </label>
        <div className="mb-1">
          <input
            type="text"
            name="middleName"
            className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
            placeholder="ex. Tindugan"
            aria-label="middleName"
            aria-describedby="middleName-addon"
            onChange={handleInputChange}
            value={formData.middleName}
            disabled={loading}
          />
        </div>
      </div>
      {/* Course Field */}
      <div className="mt-1">
        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
          Course <span className="text-red-500">*</span>
        </label>
        <div className="mb-1">
          <FormSelectMenu
            id="f8bce823-ae41-4fe7-8029-ef3a08e6835e"
            selection={COURSES}
            handleSelection={handleInputChange}
            name="course"
            placeHolder="Select Your Course"
            loading={loading}
            defaultSelected={formData.course}
          />
        </div>
      </div>
      <div className="mt-1 flex flex-col lg:flex-row space-x-0 lg:space-x-2">
        {/* Account Type Field */}
        <div className="flex-1">
          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
            Account Type <span className="text-red-500">*</span>
          </label>
          <div className="mb-1">
            <FormSelectMenu
              id="787476e0-1480-4b52-9582-5a5e7d03275b"
              selection={ACCOUNT_TYPE_SELECTION}
              defaultSelected={formData.accountType}
              handleSelection={handleInputChange}
              name="accountType"
              placeHolder="Select Account Type"
              loading={loading}
            />
          </div>
        </div>
        {/* Year Graduated Field */}
        {formData.accountType === ACCOUNT_TYPE_ALUMNI ? (
          <div className="">
            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
              Year Graduated <span className="text-red-500">*</span>
            </label>
            <div className="mb-1">
              <FormSelectMenu
                id="5bb42465-9800-41bf-b760-e448dcba493e"
                defaultSelected={formData.yearGraduated}
                selection={yearsBack(80).reverse()}
                handleSelection={handleInputChange}
                name="yearGraduated"
                placeHolder="Graduation Year"
                loading={loading}
              />
            </div>
          </div>
        ) : null}
      </div>

      <AuthenticationButton disabled={loading} type="submit" btnTitle={loading ? "Saving Changes ..." : "Save Changes"} />
    </form>
  );

  return (
    <>
      <ToastContainer />
      <div className="mb-24 pb-24 flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-2/5 bg-slate-50 rounded-xl border border-slate-400 my-2 shadow-md shadow-slate-300">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl text-left">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Settings</h3>
            <p className="mb-0">Please provide all required information</p>
          </div>

          <div className="flex-auto p-6">{registrationForm}</div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
