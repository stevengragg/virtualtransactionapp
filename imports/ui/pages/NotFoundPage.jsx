import React from "react";
import { useNavigate } from "react-router-dom";
import VoidSVG from "../svg/VoidSVG";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="w-full mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div className="max-w-2xl m-auto mt-16">
            <div className="text-center px-4">
              <div className="inline-flex mb-8">
                <VoidSVG width={256} height={256} />
              </div>
              <h1 className="text-6xl font-extrabold">404</h1>
              <div className="mb-6">Hmm...this page doesn’t exist. Try searching for something else.</div>
              <button onClick={() => navigate(-1)} type="button" className="p-4 rounded-md bg-orange-500 text-white">
                Go back
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
