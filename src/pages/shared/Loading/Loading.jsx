import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-20">
        <RingLoader color="#FF6B6B"  size={100} />
      </div>
  );
};

export default Loading;
