// import React from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";
// import Swal from "sweetalert2";
// import { useQueryClient } from "@tanstack/react-query";

// const CheckoutForm = ({ setShowModal }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const { user } = UseAuth();
//   const queryClient = useQueryClient(); // ✅ get queryClient

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const card = elements.getElement(CardElement);
//     if (!card) return;

//     try {
//       // 1️⃣ Create PaymentMethod
//       const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card,
//         billing_details: {
//           name: user?.displayName || "Anonymous",
//           email: user?.email,
//         },
//       });

//       if (pmError) {
//         Swal.fire("Error", pmError.message, "error");
//         return;
//       }

//       // 2️⃣ Create PaymentIntent from backend
//       const res = await axiosSecure.post("/create-payment-intent", { price: 20 });
//       const clientSecret = res.data.clientSecret;

//       // 3️⃣ Confirm Card Payment
//       const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//         clientSecret,
//         { payment_method: paymentMethod.id }
//       );

//       if (confirmError) {
//         Swal.fire("Error", confirmError.message, "error");
//         return;
//       }

//       // 4️⃣ If succeeded → update DB
//       if (paymentIntent.status === "succeeded") {
//         await axiosSecure.patch(`/users/subscribe/${user?.email}`, {
//           isSubscribed: true,
//         });

//         // ✅ Refetch userInfo query to update UI
//         queryClient.invalidateQueries(["userInfo", user?.email]);

//         Swal.fire("Success!", "You are now a verified member 🎉", "success");
//         setShowModal(false);
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong. Please try again.", "error");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="p-3 border rounded-lg" />
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition"
//       >
//         Pay $20
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;
