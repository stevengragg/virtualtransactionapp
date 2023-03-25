import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { ImCloudDownload } from "@react-icons/all-files/im/ImCloudDownload";

import useTitle from "../hooks/useTitle";
import { classNames, extractColorOfStatus } from "../utils/helper";
import { Requests } from "/imports/both/collections/Requests";
import { WAITING_FOR_PAYMENT } from "/imports/both/constants";
import RequestDropZoneForProofOfPayment from "../components/requests/RequestDropZoneForProofOfPayment";

function ManageRequestPage() {
  useTitle("Manage Request - Virtual Transaction Assistance | UCC Congress");
  let { id } = useParams();
  const { request, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("requests.getOne", id);
    const request = Requests.find({ _id: id }).fetch();

    if (!handler.ready()) {
      return { request: {}, isLoading: true };
    }

    return {
      request: request[0],
      isLoading: false,
    };
  }, []);

  console.log(id, request, isLoading);
  // return (
  //   <div>
  //     ManageRequestPage
  //     <div>
  //       {request?.requests?.map((item, idx) => (
  //         <div key={idx}>
  //           <div>{item?.documents}</div>
  //           <div>{item?.purpose}</div>
  //         </div>
  //       ))}
  //     </div>
  //     <div>{request?._id}</div>
  //     <div>{request?.modeOfClaiming}</div>
  //   </div>
  // );

  return (
    <div className="w-full px-6 pt-6 mx-auto pb-24 ">
      <div className="relative flex flex-col h-full min-w-0 break-words bg-white border shadow-soft-xl rounded-2xl bg-clip-border border-slate-500 mb-8 pb-8">
        <div className="flex flex-wrap">
          <div className="flex-1 p-4">{request?.isApproved ? "✅" : "❌"} Request Approved ▶</div>
          <div className="flex-1 p-4">{request?.isPaid ? "✅" : "❌"} OR Paid/Request Paid ▶</div>
          <div className="flex-1 p-4">{request?.isScheduled ? "✅" : "❌"} Request Scheduled ▶</div>
          <div className="flex-1 p-4">{request?.isCompleted ? "✅" : "❌"} Request Completed ▶</div>
        </div>
        <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
          <div className="flex flex-wrap -mx-3">
            <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
              <h6 className="mb-0">Request ({request?._id})</h6>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          <hr className="h-px my-6 bg-transparent bg-gradient-to-r from-transparent via-white to-transparent" />
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
              <strong className="text-slate-700">Status</strong> &nbsp;{" "}
              <span className={classNames("p-2 border-2 border-slate-300 rounded-full", extractColorOfStatus(request?.status))}>{request?.status}</span>
            </li>
            <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
              <strong className="text-slate-700">Mode of Claiming:</strong> &nbsp; {request?.modeOfClaiming}
            </li>
            <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
              <strong className="text-slate-700">Created At:</strong> &nbsp; {moment(request?.createdAt).fromNow()}
            </li>
            <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
              <strong className="text-slate-700">Assigned To:</strong> &nbsp; {request?.assignedTo || "Not yet Assigned"}
            </li>
          </ul>
        </div>
        {request?.status === WAITING_FOR_PAYMENT ? (
          <div className="flex-auto p-4">
            <a href={request?.attachedOrderOfPayment} target="_blank" rel="noreferrer" className="font-extrabold text-lg italic text-blue-400 cursor-pointer">
              <ImCloudDownload /> Download the Order of Payment
            </a>
          </div>
        ) : null}
        {request?.status === WAITING_FOR_PAYMENT && !request?.proofOfPayment ? (
          <div className="flex-auto p-4">
            <label className="text-lg font-semibold text-slate-700"> Upload your proof of payment</label>
            <RequestDropZoneForProofOfPayment requestId={id} />
          </div>
        ) : (
          <div className="flex-auto p-4">
            <label className="text-lg font-semibold text-slate-700"> You already uploaded your proof of payment. Your request is now being evaluated</label>
            <div className="mt-2">
              <img src={request?.proofOfPayment} className="w-32 h-32 object-cover" />
            </div>
          </div>
        )}

        <div className="p-8 flex flex-col gap-4">
          {request?.requests?.map((item, idx) => (
            <div key={idx} className="w-full lg:basis-2/6 border border-slate-600 rounded-xl shadow-soft-md p-4">
              <div className="px-1">
                <p className="text-semibold text-sm text-slate-500 leading-1">Document {idx + 1}</p>
              </div>
              {/* Select Document */}
              <div className="mt-1">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <strong className="block text-sm font-semibold text-gray-700">Document Requested:</strong> &nbsp; {item?.documents}
                    <strong className="block text-sm font-semibold text-gray-700">Purpose:</strong> &nbsp; {item?.purpose}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageRequestPage;
