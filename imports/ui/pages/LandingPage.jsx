import React from "react";
import { Link } from "react-router-dom";
import CreateSVG from "../svg/CreateSVG";
import RequirementsSVG from "../svg/RequirementsSVG";

function LandingPage() {
  return (
    <>
      <section id="hero" className="pt-24 bg-orange-500">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-left">
            <p className="uppercase tracking-loose w-full">Virtual Transaction Assistance</p>
            <h1 className="my-4 text-5xl font-bold text-white leading-tight">
              UCC Congress Registrar office is within your reach
            </h1>
            <p className="leading-normal text-2xl mb-8">Register and start creating your first request.</p>
            <Link
              to="/register"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              Get Started
            </Link>
          </div>

          {/* <div className="w-full md:w-3/5 py-6 text-center">
            <img className="w-full md:w-4/5 z-50" src="hero.png" />
          </div> */}
        </div>
      </section>
      <section id="guide" className="bg-white border-b py-8 mt-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-left text-gray-800 p-2">
            Guide on how to create your request
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">Create your Request</h3>
              <p className="text-gray-600 mb-8">
                ✅ Go to the Request Page.
                <br />
                ✅ Then, click new request.
                <br />✅ After that, you can now fill up the request form with required fields and documents you want to
                request.
                <br />✅ Hit "Submit" and that's it! Wait for an email with your scheduled appointment to the Registrar.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <CreateSVG width={256} height={256} />
            </div>
          </div>
          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <RequirementsSVG width={256} height={256} />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">Successful appointment</h3>
                <p className="text-gray-600 mb-8">
                  Do not forget to bring required documents before going to the Registrar
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
