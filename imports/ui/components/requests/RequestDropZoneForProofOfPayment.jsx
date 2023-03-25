import React from "react";
import { useDropzone } from "react-dropzone";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import axios from "axios";

const RequestDropZoneForProofOfPayment = ({ requestId }) => {
  const [files, setFiles] = React.useState([]);

  const onDrop = async (acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
    // Upload the file to Google Drive using the Meteor method
    const file = acceptedFiles[0];
    console.log(file);
    const fileId = Random.id();
    // const uploadUrl = await Meteor.callAsync("request.getUploadUrl", { requestId, fileId, fileName: file.name });
    // const response = await fetch(uploadUrl, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": file.type,
    //     "Content-Length": file.size,
    //   },
    //   body: file,
    // });
    // console.log(response);

    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("requestId", requestId);

      const config = {
        headers: {
          "Content-Type": file.type,
          "Content-Length": file.size,
        },
      };
      const response = await axios.post(`${Meteor.settings.public.REACT_APP_API_HOSTNAME || "http://localhost:8080"}/api/upload-proof-of-payment`, formData, config);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()} className={`w-64 h-64 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center ${isDragActive ? "border-green-500" : "border-gray-300"}`}>
      <input {...getInputProps()} />
      {files.length === 0 ? (
        <>
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9l3 3m0 0l3-3m-3 3v6m0-6H6m12 0h-3m-6 0l2.5-2.5m0 0L15 12" />
          </svg>
          <p className="mt-1 text-sm text-gray-600">Drag and drop your file here or click to select a file</p>
        </>
      ) : (
        <>
          {files.map((file) => (
            <div key={file.name} className="mt-2">
              <img src={file.preview} alt={file.name} className="w-32 h-32 object-cover" />
              <p className="mt-1 text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{file.size} bytes</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RequestDropZoneForProofOfPayment;
