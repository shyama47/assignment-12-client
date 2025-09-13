

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBoxOpen, FaExclamationTriangle, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch data
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axiosSecure.get("/products")).data,
  });

  const { data: reported = [] } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => (await axiosSecure.get("/products/reported")).data,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => (await axiosSecure.get("/reviews/all")).data,
  });

  

 

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#1A535C]">⚙️ Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaUsers className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{users.length}</h2>
          <p>Total Users</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaBoxOpen className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{products.length}</h2>
          <p>Total Products</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaExclamationTriangle className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{reported.length}</h2>
          <p>Reported</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaStar className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{reviews.length}</h2>
          <p>Reviews</p>
        </div>
      </div>

      
      </div>
   
  );
};

export default AdminDashboard;

