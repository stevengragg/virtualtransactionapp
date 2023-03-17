import React, { Children } from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <Outlet />
      <footer className="py-12">
        <div className="container">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-shrink-0 w-full max-w-full mx-auto mb-6 text-center lg:flex-0 lg:w-8/12">
              <a href="#" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12">
                {" "}
                Home{" "}
              </a>
              <a href="#" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12">
                {" "}
                Guide{" "}
              </a>
              <a href="#" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12">
                {" "}
                Register{" "}
              </a>
              <a href="#" className="mb-2 mr-4 text-slate-400 sm:mb-0 xl:mr-12">
                {" "}
                Announcements{" "}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
              <p className="mb-0 text-slate-400">Copyright © 2023 UCC Congress | Virtual Transaction Assistance.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default AuthLayout;
