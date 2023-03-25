import React from "react";

import RequestForm from "../components/requests/RequestForm";
import RequestTable from "../components/requests/RequestTable";
import useTitle from "../hooks/useTitle";

function RequestsPage() {
  useTitle("Requests - Virtual Transaction Assistance | UCC Congress");
  return (
    <div class="w-full px-6 py-6 mx-auto">
      {/* Request content */}

      <div className="flex flex-col items-center gap-8">
        {/* Request Form */}
        <RequestForm />
        {/* Request Table */}
        <RequestTable />
      </div>
    </div>
  );
}

export default RequestsPage;
