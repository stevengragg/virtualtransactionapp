import { Meteor } from "meteor/meteor";
import React from "react";
import { Link } from "react-router-dom";
import LoginWithGoogle from "../components/auth/LoginWithGoogle";

import BannerInfo from "../components/shared/banners/BannerInfo";

function RegistrationPage() {
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
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
        });
      })
      .catch((error) => {
        console.error(error?.reason);
        setErrors(error?.reason);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
      <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
        <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl text-center">
          <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Account Creation</h3>
          {/* <p className="mb-0">Enter your Account/Student ID and password to sign in</p> */}
        </div>
        <div className="flex-auto mt-4">
          <LoginWithGoogle title="Sign Up with Google" />

          <div className="mt-4 flex items-center justify-between px-2">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className=" text-sm text-center text-gray-400 font-medium">or</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
        </div>
        <div className="flex-auto p-6">
          <form onSubmit={handleSubmit}>
            <label>
              Student Id(username): *
              <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Email: *
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              First Name: *
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Last Name: *
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Middle Name:
              <input type="text" name="middleName" value={formData.middleName} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Password: *
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Confirm Password: *
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} disabled={loading} />
            </label>
            <label>
              Course: *
              <select name="course" value={formData.course} onChange={handleInputChange} disabled={loading}>
                <option value="">Select a course</option>
                <option value="Course A">Course A</option>
                <option value="Course B">Course B</option>
              </select>
            </label>
            <label>
              Account Type: *
              <select name="accountType" value={formData.accountType} onChange={handleInputChange} disabled={loading}>
                <option value="">Select an account type</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
            </label>
            <button type="submit" disabled={loading}>
              Create Account
            </button>
          </form>
        </div>
        <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
          <div className="mx-auto mb-6 leading-normal text-sm">
            I already have an account.
            <Link to="/login" className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text ml-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
