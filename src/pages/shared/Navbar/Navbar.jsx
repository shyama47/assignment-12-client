// import { Link, NavLink } from "react-router";
// import { useState } from "react";
// import UseAuth from "../../../hooks/UseAuth";


// const Navbar = () => {
//   const { user, logOut } = UseAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = (
//     <>
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           `px-3 py-2 rounded-lg transition-all duration-300 ${
//             isActive
//               ? "md:bg-[#FF6B6B] md:text-white"
//               : "text-gray-700 "
//           }`
//         }
//       >
//         Home
//       </NavLink>
//       <NavLink
//         to="/products"
//         className={({ isActive }) =>
//           `px-3 py-2 rounded-lg transition-all duration-300 ${
//             isActive
//               ? "md:bg-[#FF6B6B] md:text-white"
//               : "text-gray-700"
//           }`
//         }
//       >
//         Products
//       </NavLink>
//     </>
//   );

//   return (
//     <nav className="bg-[#FFE66D] shadow-md sticky top-0 z-50 ">
//       <div className="px-4 py-3 grid grid-cols-3 items-center ">
//         {/* Left: Logo */}
//         <Link to="/" className="text-2xl font-bold text-[#1A535C]">
//           MyShop
//         </Link>

//         {/* Center: Nav Links */}
//         <div className="hidden md:flex justify-center gap-4">
//           {navLinks}
//         </div>

//         {/* Right: Auth buttons */}
//         <div className="hidden md:flex justify-end items-center gap-4">
//           {!user ? (
//             <Link
//               to="/login"
//               className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#1A535C] transition-all"
//             >
//               Login
//             </Link>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-10 h-10 rounded-full border-2 border-[#1A535C] overflow-hidden"
//               >
//                 <img
//                   src={user.photoURL || "https://i.ibb.co/YZVwBnk/user.png"}
//                   alt="User"
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//               {isOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
//                   <div className="px-4 py-2 font-semibold text-gray-700">
//                     {user.displayName || "User"}
//                   </div>
//                   <Link
//                     to="/dashboard"
//                     className="block px-4 py-2 hover:bg-[#FF6B6B] hover:text-white"
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={logOut}
//                     className="w-full text-left px-4 py-2 hover:bg-[#FF6B6B] hover:text-white"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile menu button */}
//         <div className="md:hidden flex justify-end">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-2xl text-[#1A535C] "
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden flex flex-col gap-2 px-4 pb-4 ">
//        <div className="border-t-2 md:hidden block w-full">
//          <div className="flex flex-col  ">
//               {navLinks}
//         </div>
//        </div>
//           {!user ? (
//             <Link
//               to="/login"
//               className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#1A535C] transition-all"
//             >
//               Login
//             </Link>
//           ) : (
//             <>
//               <div className="px-3 py-2 font-semibold text-gray-700">
//                 {user.displayName || "User"}
//               </div>
//               <Link
//                 to="/dashboard"
//                 className="px-3 py-2 hover:bg-[#FF6B6B] hover:text-white rounded-lg"
//               >
//                 Dashboard
//               </Link>
//               <button
//                 onClick={logOut}
//                 className="text-left px-3 py-2 hover:bg-[#FF6B6B] hover:text-white rounded-lg"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import { Link, NavLink } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseAuth from "../../../hooks/UseAuth";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `md:px-3 md:py-2 rounded-lg transition-all duration-300 ${
            isActive ? "md:bg-[#FF6B6B] md:text-white" : " hover:bg-[#FF6B6B] hover:text-white rounded-lg text-gray-700 "
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `md:px-3 md:py-2 rounded-lg transition-all duration-300 ${
            isActive ? "md:bg-[#FF6B6B] md:text-white" : " hover:bg-[#FF6B6B] hover:text-white rounded-lg text-gray-700 "
          }`
        }
      >
        Products
      </NavLink>
    </>
  );

  return (
    <nav className="bg-[#FFE66D] shadow-md ">
      <div className="flex justify-between px-4 py-3 items-center">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-[#1A535C] ">
          AppOrbit
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex justify-center gap-4">{navLinks}</div>

        {/* Right: Auth buttons */}
        <div className="hidden md:flex justify-end items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="bg-[#4ECDC4] text-white px-4 py-2 rounded-lg hover:bg-[#1A535C] transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-[#1A535C] overflow-hidden"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/YZVwBnk/user.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* ✅ Animated Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                  >
                    <div className="px-4 py-2 font-semibold text-gray-700 hover:bg-[#FF6B6B] hover:text-white">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-[#FF6B6B] hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logOut}
                      className="w-full text-left px-4 py-2 hover:bg-[#FF6B6B] hover:text-white"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-[#1A535C]"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col px-4 space-y-1 pb-2"
          >
            <div className="border-t-2 md:hidden block w-full">
              <div className="flex flex-col space-y-1 pt-2">{navLinks}</div>
            </div>
            {!user ? (
              <Link
                to="/login"
                className=" text-white px-4 py-2 rounded-lg bg-[#FF6B6B] transition-all"
              >
                Login
              </Link>
            ) : (
              <>
                <div className=" font-semibold text-gray-700">
                  {user.displayName || "User"}
                </div>
                <Link
                  to="/dashboard"
                  className=""
                >
                  Dashboard
                </Link>
                <button
                  onClick={logOut}
                  className="text-left"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

