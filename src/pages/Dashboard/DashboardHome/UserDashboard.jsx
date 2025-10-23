
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaBoxOpen, FaThumbsUp } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";
// import { Helmet } from "react-helmet-async";
// import useUserRole from "../../../hooks/useUserRole";
// import Loading from "../../shared/Loading/Loading";

// const UserDashboard = () => {
//   const { user } = UseAuth();
//   const axiosSecure = useAxiosSecure();
//   const { roleLoading } = useUserRole();

//   const { data: myProducts = [] ,isLoading } = useQuery({
//     queryKey: ["myProducts", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/user?email=${user?.email}`)
//       return res.data;
//     }
//   });

//   const totalUpvotes = myProducts.reduce((acc, p) => acc + (p.upvotes || 0), 0);

//   if (roleLoading || isLoading) {
//     return <Loading />
//   }
//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-[#1A535C]">👤 User Dashboard</h1>
//       <Helmet>
//         <title>User || dashboard</title>
//       </Helmet>
//       <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6">
//         <div className="bg-blue-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
//           <FaBoxOpen className="text-3xl mb-2" />
//           <p className="font-medium text-2xl">My Products :</p>
//           <h2 className="text-xl font-bold">{myProducts.length}</h2>
//         </div>

//         <div className="bg-green-500 text-white p-6 rounded-2xl flex flex-col items-center shadow-lg">
//           <FaThumbsUp className="text-3xl mb-2" />
//           <p className="font-medium text-2xl">Total Upvotes :</p>
//           <h2 className="text-xl font-bold">{totalUpvotes}</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaBox,
  FaThumbsUp,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import UseAuth from "../../../hooks/UseAuth";

// ✅ Leaflet icon fix for Vite
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const UserDashboard = () => {
  const { user } = UseAuth();

  // Dummy stats
  const stats = {
    totalProducts: 5,
    totalUpvotes: 9,
    totalReviews: 7,
    membership: "Free", // or "Verified"
    pendingProducts: 1,
  };

  const chartData = [
    { name: "Accepted", value: 3 },
    { name: "Pending", value: 1 },
    { name: "Rejected", value: 1 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  const mapMarkers = [
    { id: 1, name: "Project A", position: [23.8103, 90.4125] }, // Dhaka
    { id: 2, name: "Project B", position: [22.3569, 91.7832] }, // Chittagong
  ];

  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 🌟 Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold">
          Welcome back, {user?.displayName || "User"} 👋
        </h2>
        <p className="opacity-90 mt-1">
          Here’s a quick overview of your activities on AppOrbit.
        </p>
      </motion.div>

      {/* 📊 Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="card bg-base-100 shadow-md border-l-4 border-blue-500">
          <div className="card-body flex flex-col items-center">
            <FaBox className="text-3xl text-blue-500 mb-2" />
            <h3 className="text-lg font-semibold">My Products</h3>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border-l-4 border-green-500">
          <div className="card-body flex flex-col items-center">
            <FaThumbsUp className="text-3xl text-green-500 mb-2" />
            <h3 className="text-lg font-semibold">Total Upvotes</h3>
            <p className="text-2xl font-bold">{stats.totalUpvotes}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border-l-4 border-yellow-500">
          <div className="card-body flex flex-col items-center">
            <FaStar className="text-3xl text-yellow-500 mb-2" />
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-2xl font-bold">{stats.totalReviews}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md border-l-4 border-purple-500">
          <div className="card-body flex flex-col items-center">
            <FaCheckCircle className="text-3xl text-purple-500 mb-2" />
            <h3 className="text-lg font-semibold">Membership</h3>
            <p
              className={`text-xl font-bold ${
                stats.membership === "Verified"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {stats.membership}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 📊 Chart + 🗺️ Map + 📅 Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🥧 Pie Chart */}
        <motion.div
          className="bg-base-100 p-4 rounded-xl shadow-md flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-center">
            Product Status Overview
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 🗺️ Map Section */}
        <motion.div
          className="bg-base-100 p-4 rounded-xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-center">
            My Project Locations
          </h3>
          <div className="h-64 w-full rounded-md overflow-hidden">
            <MapContainer
              center={[23.8103, 90.4125]}
              zoom={6}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              />
              {mapMarkers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>{marker.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.div>

        {/* 📅 Calendar Section */}
        <motion.div
          className="bg-base-100 p-4 rounded-xl shadow-md flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-center">
            Upcoming Tasks / Deadlines
          </h3>
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            className="rounded-md shadow-inner"
          />
          <p className="mt-3 text-sm text-gray-600">
            Selected Date: {calendarDate.toDateString()}
          </p>
        </motion.div>
      </div>

      {/* 💎 Membership Section */}
      <motion.div
        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {stats.membership === "Free" ? (
          <>
            <h3 className="text-xl font-semibold mb-2">
              Upgrade to Premium 🚀
            </h3>
            <p className="mb-3">
              Unlock unlimited product uploads and extra perks!
            </p>
            <Link className="btn btn-warning font-semibold">
              Subscribe Now
            </Link>
          </>
        ) : (
          <h3 className="text-xl font-semibold">
            You are a Premium Member ✅
          </h3>
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;
