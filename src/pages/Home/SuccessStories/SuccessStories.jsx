// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxiosInstance from "../../../hooks/useAxiosInstance";
// import Loading from "../../shared/Loading/Loading";

// const SuccessStories = () => {
//   const axiosInstance = useAxiosInstance();

//   const { data: reviews, isLoading, isError } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/review");
//       return res.data || [];
//     },
//   });

//   if (isLoading) return <Loading />;

//   if (isError) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <p className="text-red-500">Failed to load Success Stories</p>
//       </div>
//     );
//   }

//   return (
//     <section className="max-w-6xl w-full mx-auto px-4">
//     {/* <section className="max-w-6xl border w-full mx-auto py-12 px-4 sm:px-6 lg:px-8"> */}
//       {/* Section Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         // viewport={{ once: true }}
//         className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A535C]"
//       >
//          Success Stories
//       </motion.h2>

//       {/* Reviews Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//         {reviews.map((review, idx) => (
//           <motion.div
//             key={review._id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: idx * 0.2 }}
//             // viewport={{ once: true }}
//             className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg"
//           >
//             {/* Reviewer Info */}
//             <div className="flex items-center gap-4 mb-4">
//               <img
//                 src={review.reviewerImage}
//                 alt={review.reviewerName}
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
//               />
//               <div className="flex flex-col">
//                 <h3 className="font-semibold text-sm sm:text-base md:text-lg">
//                   {review.reviewerName}
//                 </h3>
//                 <p className="px-2 py-1 mt-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
//                   ⭐ Rating {review.rating}
//                 </p>
//               </div>
//             </div>

//             {/* Review Description */}
//             <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//               {review.description}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SuccessStories;




// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { FaStar, FaQuoteLeft } from "react-icons/fa";
// import useAxiosInstance from "../../../hooks/useAxiosInstance";
// import Loading from "../../shared/Loading/Loading";

// const SuccessStories = () => {
//   const axiosInstance = useAxiosInstance();

//   const { data: reviews, isLoading, isError } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/review");
//       return res.data || [];
//     },
//   });

//   if (isLoading) return <Loading />;

//   if (isError) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <p className="text-red-500">Failed to load Success Stories</p>
//       </div>
//     );
//   }

//   return (
//     <section className="relative bg-gradient-to-r from-green-500/90 to-green-600/90 py-16 overflow-hidden">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
//         {/* Left Side Title Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-white"
//         >
//           <p className="uppercase tracking-wider font-semibold text-sm mb-4">
//             Success Stories
//           </p>
//           <h2 className="text-3xl md:text-4xl font-extrabold mb-6  leading-snug">
//             We Celebrate Our <br />{" "}
//             <span className="text-white">Clients’ Success</span>
//           </h2>
//           <div className="w-16 h-1 bg-white rounded-full mb-8"></div>
//           <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-50 transition">
//             View All Stories
//           </button>
//         </motion.div>

//         {/* Right Side Testimonials */}
//         <div className="grid sm:grid-cols-2 gap-6">
//           {reviews.slice(0, 3).map((review, idx) => (
//             <motion.div
//               key={review._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: idx * 0.2 }}
//               className="relative bg-white text-gray-700 p-6 rounded-2xl shadow-lg"
//             >
//               <FaQuoteLeft className="text-green-500 text-2xl mb-3" />
//               <p className="text-sm leading-relaxed mb-6">
//                 {review.description}
//               </p>
//               {/* Triangle (Speech bubble tail) */}
//               <div className="absolute left-10 -bottom-2 w-4 h-4 bg-white rotate-45"></div>

//               {/* Reviewer Info */}
//               <div className="flex items-center gap-4 mt-6">
//                 <img
//                   src={review.reviewerImage}
//                   alt={review.reviewerName}
//                   className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
//                 />
//                 <div>
//                   <h3 className="font-bold text-gray-800">
//                     {review.reviewerName}
//                   </h3>
//                   <p className="text-xs text-green-600 font-medium">
//                     Happy Customer
//                   </p>
//                   <div className="flex text-yellow-400 text-sm mt-1">
//                     {Array.from({ length: review.rating }).map((_, i) => (
//                       <FaStar key={i} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SuccessStories;













import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Loading from "../../shared/Loading/Loading";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const SuccessStories = () => {
  const axiosInstance = useAxiosInstance();

  const { data: reviews, isLoading, isError } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/review");
      return res.data || [];
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">Failed to load Success Stories</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl w-full mx-auto px-4">
    {/* <section className="max-w-6xl border w-full mx-auto py-12 px-4 sm:px-6 lg:px-8"> */}
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A535C]"
      >
         Success Stories
      </motion.h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {reviews.map((review, idx) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative bg-white text-gray-700 p-6 rounded-2xl shadow-lg"
            >
              <FaQuoteLeft className="text-gray-500 text-2xl mb-3" />
              <p className="text-lg leading-relaxed mb-6">
                {review.description}
              </p>
              {/* Triangle (Speech bubble tail) */}
              <div className="absolute left-10 -bottom-2 w-4 h-4 bg-white rotate-45"></div>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mt-6">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover "
                />
                <div>
                  <h3 className="font-bold text-gray-800">
                    {review.reviewerName}
                  </h3>
                  
                  <div className="flex text-yellow-400 text-sm mt-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default SuccessStories;