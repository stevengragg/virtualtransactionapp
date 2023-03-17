import { Meteor } from "meteor/meteor";
import React from "react";
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
    <div>
      <div className="my-2">
        {errors ? (
          <BannerInfo type="error" open={true} noClose={true}>
            <div className="flex flex-col items-start">
              <h3 className="text-base font-semibold text-slate-200">
                Failed to Register:{" "}
              </h3>
              <p className="text-sm text-slate-200">{errors}</p>
            </div>
          </BannerInfo>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Student Id(username): *
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Email: *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          First Name: *
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Last Name: *
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Middle Name:
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Password: *
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Confirm Password: *
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={loading}
          />
        </label>
        <label>
          Course: *
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            disabled={loading}
          >
            <option value="">Select a course</option>
            <option value="Course A">Course A</option>
            <option value="Course B">Course B</option>
          </select>
        </label>
        <label>
          Account Type: *
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
            disabled={loading}
          >
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
  );
}

export default RegistrationPage;
