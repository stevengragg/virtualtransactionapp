import { Meteor } from "meteor/meteor";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MAX_ALLOWED_REQUEST_AT_A_TIME } from "../../utils/constants";
import { FormSelectMenu } from "../shared/form/FormSelectMenu";
import RequestFormButton from "../shared/form/RequestFormButton";
import { ALLOWED_STUDENT_REQUESTS } from "/imports/both/constants";

function RequestForm() {
  let navigate = useNavigate();
  const [forms, setForms] = React.useState([{ documents: "", purpose: "" }]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");
  const handleAddForm = () => {
    if (forms.length === 3)
      return toast.error("You can only request for 3 documents at a time", {
        position: toast.POSITION.TOP_CENTER,
      });
    setForms((prevForms) => [...prevForms, { documents: "", purpose: "" }]);
  };

  const handleFormChange = (event, index) => {
    const { name, value } = event.target || event;
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms[index][name] = value;
      return newForms;
    });
  };

  const handleCancelForm = (index) => {
    setForms((prevForms) => {
      const newForms = [...prevForms];
      newForms.splice(index, 1);
      return newForms;
    });
  };

  const handleSubmitForms = (event) => {
    event.preventDefault();
    console.log(forms); // do something with the form data here
  };

  return (
    <>
      <form onSubmit={handleSubmitForms} className="flex flex-col lg:flex-row gap-1 items-start" id="8beebcf2-3f03-4ecb-8d9c-7115b39dce92">
        {forms.map((form, index) => (
          <div key={index} className="w-full lg:basis-2/6 border border-slate-600 rounded-xl shadow-soft-md p-4">
            <div className="px-1">
              <p className="text-semibold text-sm text-slate-500 leading-1">Request {index + 1}</p>
            </div>
            {/* Select Document */}
            <div className="mt-1">
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700" htmlFor={`documents-${index}`}>
                Select a Document <span className="text-red-500">*</span>
              </label>
              <div className="mb-1">
                <FormSelectMenu
                  idx={index}
                  id={`documents-${index}`}
                  selection={ALLOWED_STUDENT_REQUESTS}
                  handleSelection={handleFormChange}
                  name="documents"
                  placeHolder="Select Your Course"
                  loading={loading}
                />
              </div>
            </div>
            <div className="mt-1">
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700" htmlFor={`purpose-${index}`}>
                Purpose <span className="text-red-500">*</span>
              </label>
              <div className="mb-1">
                <input
                  id={`purpose-${index}`}
                  name="purpose"
                  type="text"
                  className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-orange-300 focus:outline-none focus:transition-shadow"
                  placeholder="State your reason"
                  aria-label="firstName"
                  aria-describedby="firstName-addon"
                  onChange={(event) => handleFormChange(event, index)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <RequestFormButton type="button" btnTitle={loading ? "..." : "Cancel"} disabled={loading} btnType="cancel" onClick={() => handleCancelForm(index)} />
          </div>
        ))}
        <div className="w-48">
          {forms?.length !== MAX_ALLOWED_REQUEST_AT_A_TIME && (
            <RequestFormButton type="button" btnTitle={loading ? "..." : "New Request"} disabled={loading} btnType="success" onClick={handleAddForm} />
          )}
        </div>
      </form>
      <div className="w-48 mb-8">
        {forms?.length ? (
          <RequestFormButton form="8beebcf2-3f03-4ecb-8d9c-7115b39dce92" type="submit" btnTitle={loading ? "Processing..." : "Submit Request(s)"} disabled={loading} btnType="submit" />
        ) : null}
      </div>
    </>
  );
}

export default RequestForm;
