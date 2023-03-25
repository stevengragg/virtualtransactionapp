import React from "react";
import { classNames } from "/imports/ui/utils/helper";

const extractColorFromBtnType = (btnType) => {
  switch (btnType) {
    case "submit":
      return "from-orange-600 to-orange-400";
    case "danger":
      return "from-red-600 to-red-400";
    case "success":
      return "from-green-600 to-green-400";
    case "cancel":
      return "from-slate-600 to-slate-400";

    default:
      return "from-orange-600 to-orange-400";
  }
};

function RequestFormButton({ type, onClick, disabled, btnTitle, btnType }) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(
        "disabled:text-slate-400 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-800 inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl hover:scale-102 hover:shadow-soft-xs active:opacity-85",
        extractColorFromBtnType(btnType),
      )}
    >
      {btnTitle || "Submit"}
    </button>
  );
}

export default RequestFormButton;
