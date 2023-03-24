import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthenticationButton from "../components/shared/form/AuthenticationButton";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import NormalButton from "../components/shared/form/NormalButton";
import useTitle from "../hooks/useTitle";

const Timer = ({ time, onTimeEnd }) => {
  const [seconds, setSeconds] = React.useState(time);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      onTimeEnd();
    }
  }, [seconds]);

  return seconds;
};

function VerifyLoginToken() {
  useTitle("Verify Login Token - Virtual Transaction Assistance | UCC Congress");
  const navigate = useNavigate();

  const [email] = useSearchParams();
  console.log(email.get("email"));
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleVerifyAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    Meteor.passwordlessLoginWithToken(email.get("email"), code, (err) => {
      setLoading(false);
      if (err) {
        toast.error(err?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      // navigate(`/dashboard`, { replace: true });
      window.location.replace("/dashboard");
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-slate-50 rounded-xl border border-orange-400 my-2 md:my-12 shadow-lg shadow-orange-300">
        <div className="relative flex flex-col min-w-0 mt-2 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Verify Login Token</h3>
            <p className="mb-0">Provide the login token sent through your email </p>
          </div>
        </div>

        <div className="flex-auto p-6">
          <form onSubmit={handleVerifyAccount}>
            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Secure Login Token</label>
            <div className="mb-4">
              {/* Create a verification code input field that only accepts exactly 6 digits not alphabet characters but only numbers */}

              <input
                type="text"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                placeholder="XXXXXX"
                aria-label="loginToken"
                aria-describedby="loginToken-addon"
                disabled={loading}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                minLength={6}
              />
            </div>
            <div className="text-center">
              <AuthenticationButton type="submit" btnTitle={loading ? "Authenticating ..." : "Access Account"} disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VerifyLoginToken;
