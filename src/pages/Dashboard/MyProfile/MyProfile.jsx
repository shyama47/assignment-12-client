// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../CheckoutForm/CheckoutForm";
// import Loading from "../../shared/Loading/Loading";

// // 🔑 Stripe Public Key from .env
// const stripePromise = loadStripe(import.meta.env.VITE_payment_key);


// const MyProfile = () => {
//   const { user } = UseAuth();
//   const axiosSecure = useAxiosSecure();
//   const [showModal, setShowModal] = useState(false);

//   // ✅ get user subscription status from DB
//   const { data: userInfo =[], isLoading } = useQuery({
//     queryKey: ["userInfo", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   if (isLoading) return <Loading/>

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
//         <h2 className="text-2xl font-bold my-4">{user?.displayName}</h2>
//         <p className="text-gray-600">{user?.email}</p>

//         {/* Membership Status */}
//         {userInfo?.isSubscribed ? (
//           <div className="mt-6">
//             <p className="px-4 py-2 rounded-xl text-green-700 bg-green-100 font-semibold inline-block">
//               ✅ Status: Verified
//             </p>
//           </div>
//         ) : (
//           <div className="mt-4">
//             <button
//               onClick={() => setShowModal(true)}
//               className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all mb-4"
//             >
//               Subscribe $500
//             </button>
//             <p>Status : Unsubscribe</p>
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


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Loading from "../../shared/Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

// 🔑 Stripe Public Key from .env
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const MyProfile = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);

  // ✅ Coupon state
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ get user subscription status from DB
  const { data: userInfo = [], isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ apply coupon handler
  const handleApplyCoupon = async () => {
    try {
      const res = await axiosSecure.post("/coupons/verify", { code: coupon });
      if (res.data.valid) {
        setDiscount(res.data.discountAmount);
        Swal.fire({
          icon: "success",
          title: "Coupon Applied!",
          text: `You got $${res.data.discountAmount} discount 🎉`,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Invalid or Expired Coupon",
      });
    }
  };

  if (isLoading) return <Loading />;

  // ✅ calculate final price
  const finalPrice = 500 - discount;

  return (
    <div className="flex justify-center items-center my-10 px-4">
       <Helmet>
              <title>MyProfile || page</title>
            </Helmet>
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-blue-400 text-center">
        {/* User Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co/2W9F0GZ/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto border-4 border-blue-300 shadow-lg"
        />

        {/* User Name + Email */}
        <h2 className="text-2xl font-bold my-4">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>

        {/* Membership Status */}
        {userInfo?.isSubscribed ? (
          <div className="mt-6">
            <p className="px-4 py-2 rounded-xl text-green-700 bg-green-100 font-semibold inline-block">
              ✅ Status: Verified
            </p>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:scale-105 transition-all mb-4"
            >
              Subscribe ${finalPrice}
            </button>
            <p>Status : Unsubscribe</p>
          </div>
        )}

        {/* Stripe Checkout Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
              <h2 className="text-xl font-bold text-center mb-4">
                🔐 Complete Your Subscription
              </h2>

              {/* Coupon Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-500 text-white px-4 rounded-lg"
                >
                  Apply
                </button>
              </div>

              {/* Show final price */}
              <p className="text-lg font-semibold text-center mb-2">
                Final Price: ${finalPrice}
              </p>

              <Elements stripe={stripePromise}>
                <CheckoutForm setShowModal={setShowModal} price={finalPrice} />
              </Elements>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
