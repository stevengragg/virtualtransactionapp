import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import LoginWithGoogle from "../components/auth/LoginWithGoogle";
import AuthenticationButton from "../components/shared/form/AuthenticationButton";
function LoginPage() {
  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Accounts.requestLoginTokenForUser(
      {
        selector: email,
        userData: "",
        options: {
          userCreationDisabled: true,
        },
      },
      (err) => {
        setLoading(false);
        if (err) {
          toast.error(err?.reason, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        navigate(`/verify-login-token?email=${email}`, { replace: true });
      },
    );

    // Meteor.callAsync("user.sendLoginTokenEmail", studentID)
    //   .then((res) => {
    //     setLoading(false);
    //     toast.success("Secure login token was sent to your email.", {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.error(err?.reason, {
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-slate-50 rounded-xl border border-orange-400 my-2 md:my-12 shadow-lg shadow-orange-300">
        <div className="relative flex flex-col min-w-0 mt-2 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Welcome back</h3>
            <p className="mb-0">Enter your Account/Student ID and proceed.</p>
          </div>
          <div className="flex-auto mt-1 px-6">
            <LoginWithGoogle title="Sign In with Google" />

            <div className="mt-2 flex items-center justify-between px-2">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className=" text-sm text-center text-gray-400 font-medium">or</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
          </div>
          <div className="flex-auto p-6">
            <form onSubmit={handleSubmit}>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Email Address</label>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                  placeholder="@"
                  aria-label="email"
                  aria-describedby="email-addon"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="text-center">
                <AuthenticationButton type="submit" btnTitle={loading ? "Checking ..." : "Proceed"} disabled={loading} />
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
