import React from "react";
import { FaUsers, FaProductHunt, FaComments, FaChartPie } from "react-icons/fa";

const RecentActivitySection = () => {
  // Dummy Data — চাইলে backend থেকে axiosSecure দিয়ে আনতে পারো
  
  const recentProducts = [
    { name: "AI Helper", status: "Pending", date: "18 Oct 2025" },
    { name: "TaskMaster", status: "Accepted", date: "17 Oct 2025" },
    { name: "ChatVerse", status: "Rejected", date: "16 Oct 2025" },
  ];

  const recentUsers = [
    { name: "Rina", role: "Moderator", joinDate: "17 Oct 2025" },
    { name: "Tuhin", role: "User", joinDate: "18 Oct 2025" },
    { name: "Arif", role: "Admin", joinDate: "16 Oct 2025" },
  ];

  const recentReviews = [
    { product: "AI Helper", user: "Tuhin", date: "18 Oct 2025" },
    { product: "TaskMaster", user: "Rina", date: "17 Oct 2025" },
    { product: "GameHub", user: "Arif", date: "16 Oct 2025" },
  ];

  return (
    <div className="p-4">
      
      {/* Recent Activities */}
      <div className="">
        <h2 className="text-2xl font-bold  text-center"> Recent Activities</h2>
        <div className="border border-b max-w-3/12 mx-auto mb-6 "/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Products */}
          <div className="bg-base-100 shadow-xl rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FaProductHunt className="text-primary text-xl" />
              <h3 className="text-xl font-semibold">Recent Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.status === "Accepted"
                              ? "badge-success"
                              : p.status === "Pending"
                              ? "badge-warning"
                              : "badge-error"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="truncate">{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Users */}
          <div className="bg-base-100 shadow-xl rounded-2xl p-5 max-h-700">
            <div className="flex items-center gap-2 mb-3">
              <FaUsers className="text-primary text-xl" />
              <h3 className="text-xl font-semibold">Recent Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th>Name</th>
                    <th>Role</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>
                        <span
                          className={`badge ${
                            u.role === "Admin"
                              ? "badge-primary"
                              : u.role === "Moderator"
                              ? "badge-secondary"
                              : "badge-neutral"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="truncate">{u.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-base-100 shadow-xl rounded-2xl p-5 ">
            <div className="flex items-center gap-2 mb-3">
              <FaComments className="text-primary text-xl" />
              <h3 className="text-xl font-semibold">Recent Reviews</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-sm text-gray-500">
                    <th>Product</th>
                    <th>User</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReviews.map((r, i) => (
                    <tr key={i}>
                      <td>{r.product}</td>
                      <td>{r.user}</td>
                      <td className="truncate">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivitySection;
