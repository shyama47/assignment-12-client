import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Loading from "../../shared/Loading/Loading";

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
    <section className="max-w-7xl w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A535C]"
      >
        🚀 Success Stories
      </motion.h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((review, idx) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            // viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                  {review.reviewerName}
                </h3>
                <p className="px-2 py-1 mt-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                  ⭐ Rating {review.rating}
                </p>
              </div>
            </div>

            {/* Review Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {review.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;

