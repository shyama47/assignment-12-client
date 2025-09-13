import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaPlusCircle,
  FaList,
  FaUser,
  FaUserShield,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaChartBar,
  FaUsers,
  FaGift,
  FaStar,
  FaProductHunt,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import UseAuth from "../hooks/UseAuth";
import UseUserRole from "../hooks/UseUserRole";

const DashboardLayout = () => {
  const { logOut } = UseAuth();
  const { role, roleLoading } = UseUserRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for small device */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Nested Routes */}
        <Outlet></Outlet>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
          {/* Common Links */}
          <h1 className="text-2xl font-bold ml-2">Dashboard</h1>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/">
              <FaHome className="inline-block" /> Home
            </NavLink>
          </li>

          {
            !roleLoading && role === 'user' &&
            <>

            {/* User Routes */}
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/my-profile" className="flex items-center gap-2">
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/add-product" className="flex items-center gap-2">
              <FaPlusCircle /> Add Product
            </NavLink>
          </li>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/my-products" className="flex items-center gap-2">
              <FaList /> My Products
            </NavLink>
          </li>
            </>
          }

          {/* Moderator Routes */}
          {
             !roleLoading && role === 'moderator' &&
             <>
             <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/review-queue" className="flex items-center gap-2">
              <FaCheckCircle /> Product Review Queue
            </NavLink>
          </li>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/reported-contents" className="flex items-center gap-2">
              <FaExclamationTriangle /> Reported Contents
            </NavLink>
          </li>
             </>
          }

          {/* Admin Routes */}
         {
           !roleLoading && role === 'admin' &&
           <>
            <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/statistics" className="flex items-center gap-2">
              <FaChartBar /> Statistics
            </NavLink>
          </li>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/manage-users" className="flex items-center gap-2">
              <FaUsers /> Manage Users
            </NavLink>
          </li>
          <li className="hover:bg-[#FF6B6B] hover:text-white rounded">
            <NavLink to="/dashboard/manage-coupons" className="flex items-center gap-2">
              <FaGift /> Manage Coupons
            </NavLink>
          </li>
           </>
         }
          <li className="mt-24">
            <button
              onClick={logOut}
              className="w-full text-left px-4 py-2 bg-[#FF6B6B] text-white "
            >
             <FiLogOut /> Logout
            </button>
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default DashboardLayout;

