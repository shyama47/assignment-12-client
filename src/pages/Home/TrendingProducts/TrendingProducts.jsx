import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaArrowUp } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

import Loading from "../../shared/Loading/Loading";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const TrendingProducts = () => {
  const axiosInstance = useAxiosInstance();

  const { data: trendingProducts = [], isLoading } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/trending");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      {/* Section Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-4 text-[#1A535C]"
      >
        Trending Products
      </motion.h2>
      <p className="text-gray-500 text-sm italic max-w-2xl mx-auto text-center mb-10">
          Discover the most loved innovations that are capturing attention across our community — products voted by real users for their creativity, performance, and impact in the digital world
        </p>

      {/* Products Grid with Staggered Animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {trendingProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.12)" }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-center"
              />
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {product.description.slice(0, 100)}...
              </p>
              <div className="flex gap-2 mb-3 flex-wrap">
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                {/* Upvote Button Animation */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition bg-gradient-to-l from-[#FF6B6B] to-[#FFE66D] text-white"
                >
                  <FaArrowUp />
                  upvote {product.upvotes}
                </motion.button>

                <Link
                  to={`/singleproduct/${product._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Show All Products Button Animation */}
      <div className="text-center mt-12">
        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg"
          >
            Show All Products
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;



