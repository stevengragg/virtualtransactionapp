import React from "react";
import { Outlet } from "react-router-dom";

function PreAuthLayout() {
  return (
    <>
      <main className="mt-0 transition-all duration-200 ease-soft-in-out h-full">
        <section>
          <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen ">
            <div className="container z-10 ">
              <div className="flex flex-wrap mt-0 -mx-3 ">
                <Outlet />
                <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 lg:w-6/12">
                  <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-6 -right-40 rounded-bl-xl lg:block">
                    <div className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-6" style={{ backgroundImage: "url('/imgs/ucc_bg.jpg')" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-12">
        <div className="container">
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

export default PreAuthLayout;
