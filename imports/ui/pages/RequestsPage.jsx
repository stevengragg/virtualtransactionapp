import React from "react";
import { ToastContainer } from "react-toastify";

import useTitle from "../hooks/useTitle";

import RequestForm from "../components/requests/RequestForm";
import RequestTable from "../components/requests/RequestTable";

function RequestsPage() {
  useTitle("Requests - Virtual Transaction Assistance | UCC Congress");
  return (
    <>
      <ToastContainer />
      <div className="w-full px-6 py-6 mx-auto">
        {/* Request content */}

        <div className="flex flex-col gap-8 w-full">
          {/* Request Form */}
          <div className="px-1">
            <h3 className="text-semibold text-slate-500 text-lg">Request a document and state the purpose.</h3>
          </div>
          <RequestForm />
          {/* Request Table */}
          <RequestTable />
        </div>
      </div>
    </>
  );
}

export default RequestsPage;
