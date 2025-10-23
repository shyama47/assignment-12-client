

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBoxOpen, FaExclamationTriangle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";



const ModeratorDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { roleLoading } = useUserRole();



  const { data: pending = [], isLoading: pendingLoading } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/pending")
      return res.data;
    }
  });

  const { data: reported = [], isLoading: reportedLoading } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/reported")
      return res.data;
    }
  });

  if (roleLoading || pendingLoading || reportedLoading) {
    return <Loading />
  }

  return (
    <div className="p-6 space-y-8">
      <Helmet>
        <title>Moderator || Dashboard</title>
      </Helmet>
      <h1 className="text-2xl  md:text-3xl font-bold text-[#1A535C]">🛡️ Moderator Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-yellow-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaBoxOpen className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{pending.length}</h2>
          <p >Pending Products</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaExclamationTriangle className="text-3xl mb-2" />
          <h2 className="text-2xl font-bold">{reported.length}</h2>
          <p >Reported Products</p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;




