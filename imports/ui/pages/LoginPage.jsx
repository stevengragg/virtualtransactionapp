import { Meteor } from "meteor/meteor";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import LoginWithGoogle from "../components/auth/LoginWithGoogle";
function LoginPage() {
  let navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [studentID, setStudentID] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    Meteor.loginWithPassword({ username: studentID }, password, (err) => {
      setLoading(false);
      if (err) {
        // alert(err?.reason);
        toast.error(err?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      navigate("/v/dashboard", { replace: true });
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-slate-50 rounded-xl border border-orange-300 my-2 md:my-12">
        <div className="relative flex flex-col min-w-0 mt-2 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Welcome back</h3>
            <p className="mb-0">Enter your Account/Student ID and password to sign in</p>
          </div>
          <div className="flex-auto mt-4 px-6">
            <LoginWithGoogle title="Sign In with Google" />

            <div className="mt-4 flex items-center justify-between px-2">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className=" text-sm text-center text-gray-400 font-medium">or</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
          </div>
          <div className="flex-auto p-6">
            <form onSubmit={handleSubmit}>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Account/Student ID</label>
              <div className="mb-4">
                <input
                  type="studentID"
                  className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                  placeholder="Enter your Account/Student ID"
                  aria-label="studentID"
                  aria-describedby="studentID-addon"
                  onChange={(e) => setStudentID(e.target.value)}
                  required
                />
              </div>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
              <div className="mb-4 relative">
                <div className="w-full">
                  <input
                    type={!showPassword ? "password" : "text"}
                    className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                    placeholder="Enter your Password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-2xl absolute top-1 right-5 cursor-pointer">
                  {!showPassword ? <AiFillEyeInvisible onClick={() => setShowPassword(true)} /> : <AiFillEye onClick={() => setShowPassword(false)} />}
                </div>
              </div>
              <div className="min-h-6 mb-0.5 block pl-12">
                <input
                  id="rememberMe"
                  className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                  type="checkbox"
                  checked
                />
                <label className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-orange-600 to-orange-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
            <div className="mx-auto mb-6 leading-normal text-sm">
              Don't have an account?
              <Link to="/register" className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text ml-2">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
