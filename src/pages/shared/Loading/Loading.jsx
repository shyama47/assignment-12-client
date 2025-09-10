import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <ClipLoader color="#FF6B6B" size={80} />
    </div>
  );
};

export default Loading;
