import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const SmallLoader = ({ loading }) => {
  return (
    <div>
      <SyncLoader
        cssOverride={{ translate: "40% 0" }}
        size={15}
        loading={loading}
        color="#1DA1F2"
      />
    </div>
  );
};

export default SmallLoader;
