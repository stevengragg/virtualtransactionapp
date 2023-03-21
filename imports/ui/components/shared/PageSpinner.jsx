import React from "react";

const PageSpinner = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <img src={"/imgs/spinner.svg"} width={"96"} height={"96"} alt={"Loading..."} />
      </div>
    </div>
  );
};

export default PageSpinner;
