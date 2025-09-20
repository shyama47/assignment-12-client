
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loading from "../../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";

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
    return <Loading />;
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
    <div className="min-h-screen p-6">
      <Helmet>
        <title>AdminStatistics || page</title>
      </Helmet>

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
              outerRadius={120}
              dataKey="value"
              label={({ name, value }) =>
                window.innerWidth >= 768 ? `${name}: ${value}` : ""
              }
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

        {/* Small device summary list */}
        <div className="mt-6 md:hidden">
          <h3 className="text-lg font-semibold mb-2">Statistics Summary</h3>
          <ul className="space-y-1 text-gray-700">
            {chartData.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
