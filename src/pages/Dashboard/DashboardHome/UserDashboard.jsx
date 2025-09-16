

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaThumbsUp } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { Helmet } from "react-helmet-async";

const UserDashboard = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myProducts = [] } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () =>{
      const res = await axiosSecure.get(`/products/user?email=${user?.email}`)
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalUpvotes = myProducts.reduce((acc, p) => acc + (p.upvotes || 0), 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#1A535C]">👤 User Dashboard</h1>
     <Helmet>
      <title>User || dashboard</title>
     </Helmet>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaBoxOpen className="text-3xl mb-2" />
          <p className="font-medium text-2xl">My Products :</p>
          <h2 className="text-xl font-bold">{myProducts.length}</h2>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaThumbsUp className="text-3xl mb-2" />
          <p className="font-medium text-2xl">Total Upvotes :</p>
          <h2 className="text-xl font-bold">{totalUpvotes}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

