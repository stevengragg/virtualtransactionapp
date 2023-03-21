import { Meteor } from "meteor/meteor";
import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import LoginWithGoogle from "../components/auth/LoginWithGoogle";

import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import AuthenticationButton from "../components/shared/form/AuthenticationButton";
import { FormSelectMenu } from "../components/shared/form/FormSelectMenu";
import { COURSES } from "/imports/both/constants";

function RegistrationPage() {
  const [displayRegistrationForm, setDisplayRegistrationForm] = React.useState(false);
  const [acceptedDataPrivacyPol, setAcceptedDataPrivacyPol] = React.useState(false);
  const [showYearGraduated, setShowYearGraduated] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");

  const [formData, setFormData] = React.useState({
    studentId: "",
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    password: "",
    confirmPassword: "",
    course: "",
    accountType: "",
    yearGraduated: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event?.target || event;
    console.log("handleInputChange", { event });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // You can replace this with your own submit logic
    setLoading(true);
    Meteor.callAsync("user.create", { ...formData })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setFormData({
          studentId: "",
          email: "",
          firstName: "",
          lastName: "",
          middleName: "",
          password: "",
          confirmPassword: "",
          course: "",
          accountType: "",
          yearGraduated: "",
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
              onChange={handleInputChange}
              disabled={loading}
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
              onChange={handleInputChange}
              disabled={loading}
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-col lg:flex-row space-x-0 lg:space-x-2">
        {/* Password Field */}
        <div className="flex-1">
          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="mb-4 relative">
            <div className="w-full">
              <input
                type={!showPassword ? "password" : "text"}
                name="password"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                placeholder="Enter your Password"
                aria-label="Password"
                aria-describedby="password-addon"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="text-2xl absolute top-1 right-5 cursor-pointer">
              {!showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(true)} /> : <AiFillEye onClick={() => setShowPassword(false)} />}
            </div>
          </div>
        </div>
        {/* Confirm Password Field */}
        <div className="flex-1">
          <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="mb-4 relative">
            <div className="w-full">
              <input
                type={!showPassword2 ? "password" : "text"}
                name="confirmPassword"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                placeholder="Confirm your Password"
                aria-label="cpassword"
                aria-describedby="cpassword-addon"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="text-2xl absolute top-1 right-5 cursor-pointer">
              {!showPassword2 ? <AiFillEyeInvisible onClick={() => setShowPassword2(true)} /> : <AiFillEye onClick={() => setShowPassword2(false)} />}
            </div>
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
            disabled={loading}
            required
          />
        </div>
      </div>
      {/* Course Field */}
      <div className="mt-1">
        <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
          Course <span className="text-red-500">*</span>
        </label>
        <div className="mb-1">
          <FormSelectMenu id="e76087d6-4185-4d13-b945-0e07f4dba104" selection={COURSES} handleSelection={handleInputChange} name="course" placeHolder="Select Your Course" loading={loading} />
        </div>
      </div>

      <label>
        Account Type: *
        <select name="accountType" value={formData.accountType} onChange={handleInputChange} disabled={loading}>
          <option value="">Select an account type</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>
      </label>
      <AuthenticationButton disabled={loading} type="submit" btnTitle="Continue" />
    </form>
  );

  const dataPrivacyContentForm = (
    <div className="min-w-0 break-words text-left">
      <div className="text-slate-600 text-base">
        The Congress Campus respects your privacy and will keep secure and confidential all personal and sensitive information that you may provide to UCC and/or those that UCC Congress Campus may
        collect from you ("Personal Data"). Please read the{" "}
        <Link className="text-blue-500 underline text-base" to="#">
          UCC Congress Campus Privacy Statement
        </Link>{" "}
        carefully to understand how we treat Personal Data.
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-2/5 bg-slate-50 rounded-xl border border-orange-400 my-2 shadow-md shadow-orange-300">
        <div className="relative flex flex-col min-w-0 mt-2 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl text-left">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">{displayRegistrationForm ? "Account Creation" : "Data Privacy"}</h3>
            <p className="mb-0">{displayRegistrationForm ? "Please provide all required information" : "University of Caloocan City"}</p>
          </div>
          {displayRegistrationForm ? (
            <div className="flex-auto mt-4">
              <LoginWithGoogle title="Sign Up with Google" />

              <div className="mt-4 flex items-center justify-between px-2">
                <span className="border-b w-1/5 lg:w-1/4"></span>
                <span className=" text-sm text-center text-gray-400 font-medium">or</span>
                <span className="border-b w-1/5 lg:w-1/4"></span>
              </div>
            </div>
          ) : null}
          <div className="flex-auto p-6">{displayRegistrationForm ? registrationForm : dataPrivacyContentForm}</div>
          <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
            {displayRegistrationForm ? (
              <div className="mx-auto mb-6 leading-normal text-sm">
                Already have an account?
                <Link to="/login" className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text ml-2">
                  Sign In
                </Link>
              </div>
            ) : (
              <div>
                {" "}
                <div className="flex flex-wrap items-center space-x-2">
                  <input
                    onChange={() => setAcceptedDataPrivacyPol(!acceptedDataPrivacyPol)}
                    name="isAcceptedPrivacyStatement"
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border-2 checked:border-opacity-5  border-gray-300 rounded-sm bg-white checked:bg-green-500 checked:border-blue-600 focus:outline-none focus:ring-green-300 focus:ring transition duration-200 align-top bg-no-repeat bg-center bg-contain cursor-pointer"
                  />
                  <div className="flex-none">I agree</div>
                </div>
                <div className="text-center">
                  <AuthenticationButton disabled={!acceptedDataPrivacyPol} onClick={() => setDisplayRegistrationForm(true)} type="button" btnTitle="Proceed" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;
