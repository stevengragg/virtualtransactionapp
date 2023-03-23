import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import AuthenticationButton from "../components/shared/form/AuthenticationButton";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import NormalButton from "../components/shared/form/NormalButton";

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

function VerifyAccountPage() {
  const navigate = useNavigate();

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [requestingNewCode, setRequestingNewCode] = React.useState(false);

  const handleVerifyAccount = (e) => {
    e.preventDefault();
    setLoading(true);

    Meteor.callAsync("user.verifyAccountUsingVerificationCode", Number(code))
      .then((res) => {
        console.log(res);
        setLoading(false);
        // navigate to dashboard
        // navigate("/dashboard", { replace: true });
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCode("");
      });
  };

  const handleResendVerificationCode = () => {
    setRequestingNewCode(true);
    Meteor.callAsync("user.resendVerificationCode")
      .then((res) => {
        console.log(res);
        toast.success("Verification code sent", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  // if (loggingOut) return <div>Logging out ...</div>;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12 bg-slate-50 rounded-xl border border-orange-400 my-2 md:my-12 shadow-lg shadow-orange-300">
        <div
          className=" p-1 text-slate-500 font-semibold text-sm w-20 cursor-pointer hover:text-slate-800"
          onClick={() =>
            Meteor.logout((err) => {
              if (err) {
                console.log(err);
              }
              navigate("/", { replace: true });
            })
          }
        >
          logout <AiOutlineLogout color="red" />
        </div>
        <div className="relative flex flex-col min-w-0 mt-2 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
            <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-orange-600 to-orange-400 bg-clip-text">Verify Your Account</h3>
            <p className="mb-0">Please enter the verification code sent to your provided email </p>
          </div>
        </div>

        <div className="flex-auto p-6">
          <form onSubmit={handleVerifyAccount}>
            <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Verification Code</label>
            <div className="mb-4">
              {/* Create a verification code input field that only accepts exactly 6 digits not alphabet characters but only numbers */}

              <input
                type="text"
                pattern="[0-9]{6}"
                title="Please enter exactly 6 digits"
                className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                placeholder="XXXXXX"
                aria-label="verificationCode"
                aria-describedby="verificationCode-addon"
                disabled={loading}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                minLength={6}
              />
            </div>
            <div className="text-center">
              <AuthenticationButton type="submit" btnTitle={loading ? "Verifying account ..." : "Verify"} disabled={loading} />
            </div>
          </form>
          <div className="text-center">
            <NormalButton
              color={"from-blue-600 to-blue-400 text-white"}
              type="button"
              btnTitle={requestingNewCode ? <Timer time={30} onTimeEnd={() => setRequestingNewCode(false)} /> : "Resend Verification Code"}
              disabled={requestingNewCode}
              onClick={handleResendVerificationCode}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyAccountPage;
