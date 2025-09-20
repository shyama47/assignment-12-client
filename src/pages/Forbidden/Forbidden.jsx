import React from "react";
import { useNavigate } from "react-router";
import { FaLock, FaBoxOpen } from "react-icons/fa";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800 p-16">
      
      {/* Icon */}
      <div className="text-red-500 text-9xl mb-6 animate-pulse">
        <FaLock />
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Oops! Access Forbidden
      </h2>

      {/* Description */}
      <p className="max-w-md text-center mb-6">
        You don’t have permission to view this page. Only authorized users can access it.
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
      >
        <FaBoxOpen />
        Go to Home
      </button>
    </div>
  );
};

export default ForbiddenPage;
