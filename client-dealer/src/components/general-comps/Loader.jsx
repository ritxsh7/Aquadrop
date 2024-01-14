import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Loader = ({ loading }) => {
  const cssOverride = {
    position: "fixed",
    top: "50%",
    right: "50%",
    translate: "50% 0",
  };

  return (
    <div>
      <PuffLoader
        loading={loading}
        color="dodgerblue"
        cssOverride={cssOverride}
      />
    </div>
  );
};

export default Loader;
