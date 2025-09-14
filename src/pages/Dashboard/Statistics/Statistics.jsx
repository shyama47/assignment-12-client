import React from "react";
import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Loading from "../../shared/Loading/Loading";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all data in parallel
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [productsRes, reviewsRes, usersRes] = await Promise.all([
        axiosSecure.get("/products"),
        axiosSecure.get("/reviews/all"), 
        axiosSecure.get("/users"),
      ]);

      const products = productsRes.data || [];
      const reviews = reviewsRes.data || [];
      const users = usersRes.data || [];

      // Count products by status
      const accepted = products.filter((p) => p.status === "Accepted").length;
      const pending = products.filter((p) => p.status === "pending").length;
      const rejected = products.filter((p) => p.status === "Rejected").length;

      return {
        accepted,
        pending,
        rejected,
        totalProducts: products.length,
        totalReviews: reviews.length,
        totalUsers: users.length,
      };
    },
  });

  if (isLoading) {
    return <Loading/>
  }

  // Pie Chart Data
  const chartData = [
    { name: "Accepted Products", value: stats.accepted },
    { name: "Pending Products", value: stats.pending },
    { name: "Rejected Products", value: stats.rejected },
    { name: "Total Reviews", value: stats.totalReviews },
    { name: "Total Users", value: stats.totalUsers },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#1A535C"];

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h2 className="text-3xl font-bold text-center text-[#1A535C] mb-8">
        📊 Admin Statistics
      </h2>
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
            //   labelLine={false}
              outerRadius={120}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
