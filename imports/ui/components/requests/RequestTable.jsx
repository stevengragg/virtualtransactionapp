import { Meteor } from "meteor/meteor";
import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";
// import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";

import { Requests } from "/imports/both/collections/Requests";
import { classNames, extractColorOfStatus } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";

function RequestTable() {
  let navigate = useNavigate();
  const { requests, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("requests.getAll");
    const requests = Requests.find({}, { sort: { createdAt: -1 } }).fetch();

    if (!handler.ready()) {
      return { requests: [], isLoading: true };
    }

    return {
      requests,
      isLoading: false,
    };
  }, []);

  return (
    <div className="mb-8">
      <div className="flex flex-col pb-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-500 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Reference
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Documents
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Status
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Created At
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.length ? (
                    requests.map((request) => (
                      <tr key={request._id} className="cursor-pointer hover:bg-blue-200 " onClick={() => navigate(`/requests/${request?._id}`, { replace: true })}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request?._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{request?.requests.length}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          <span className={classNames("p-2 border-2 border-slate-300 rounded-full", extractColorOfStatus(request?.status))}>{request?.status}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{request?.assignedTo || "Not yet assigned"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{moment(request?.createdAt).fromNow()}</td>

                        {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium cursor-pointer">
                        <Link to={`/${request?._id}`}>
                          <FaPencilAlt color="green" />
                        </Link>
                      </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" colSpan="5">
                        No requests yet
                      </td>
                    </tr>
                  )}

                  {/* <!-- More items... --> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestTable;
