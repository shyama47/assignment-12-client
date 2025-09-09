// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../CheckoutForm/CheckoutForm";

// // 🔑 Stripe Public Key from .env
// const stripePromise = loadStripe(import.meta.env.VITE_payment_key);


// const MyProfile = () => {
//   const { user } = UseAuth();
//   const axiosSecure = useAxiosSecure();
//   const [showModal, setShowModal] = useState(false);

//   // ✅ get user subscription status from DB
//   const { data: userInfo, isLoading } = useQuery({
//     queryKey: ["userInfo", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="flex justify-center items-center my-10 px-4">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-blue-400 text-center">
//         {/* User Image */}
//         <img
//           src={user?.photoURL || "https://i.ibb.co/2W9F0GZ/default-avatar.png"}
//           alt="Profile"
//           className="w-28 h-28 rounded-full mx-auto border-4 border-blue-300 shadow-lg"
//         />

//         {/* User Name + Email */}
//         <h2 className="text-2xl font-bold mt-4">{user?.displayName}</h2>
//         <p className="text-gray-600">{user?.email}</p>

//         {/* Membership Status */}
//         {userInfo?.isSubscribed ? (
//           <div className="mt-6">
//             <p className="px-4 py-2 rounded-xl text-green-700 bg-green-100 font-semibold inline-block">
//               ✅ Status: Verified
//             </p>
//           </div>
//         ) : (
//           <div className="mt-6">
//             <button
//               onClick={() => setShowModal(true)}
//               className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all"
//             >
//               Subscribe $20
//             </button>
//           </div>
//         )}

//         {/* Stripe Checkout Modal */}
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//             <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
//               <h2 className="text-xl font-bold text-center mb-4">
//                 🔐 Complete Your Subscription
//               </h2>
//               <Elements stripe={stripePromise}>
//                 <CheckoutForm setShowModal={setShowModal} />
//               </Elements>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
//               >
//                 ✖
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
