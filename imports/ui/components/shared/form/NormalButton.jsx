import React from "react";
import { classNames } from "/imports/ui/utils/helper";

function NormalButton({ type, onClick, disabled, btnTitle, color }) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(
        color,
        "disabled:text-slate-400 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-800 inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl  hover:scale-102 hover:shadow-soft-xs active:opacity-85",
      )}
    >
      {btnTitle || "Submit"}
    </button>
  );
}

export default NormalButton;
