

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaThumbsUp } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const UserDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myProducts = [] } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/products/user?email=${user?.email}`)).data,
    enabled: !!user?.email,
  });

  const totalUpvotes = myProducts.reduce((acc, p) => acc + (p.upvotes || 0), 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#1A535C]">👤 User Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaBoxOpen className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{myProducts.length}</h2>
          <p>My Products</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaThumbsUp className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{totalUpvotes}</h2>
          <p>Total Upvotes</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

