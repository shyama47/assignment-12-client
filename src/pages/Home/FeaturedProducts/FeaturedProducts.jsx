

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../shared/Loading/Loading";
import useUpvote from "../../../hooks/useUpvote";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const FeaturedProducts = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = UseAuth();
  const { handleUpvote, isLoading: isUpvoting } = useUpvote();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/featured");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-center mb-6 text-[#1A535C]"
      >
        Featured Products
      </motion.h2>

      {/* Products Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {products.map((product, idx) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.12)" }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg  p-5 border border-gray-100 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-lg mb-4"
            />
            <Link
              to={`/singleproduct/${product._id}`}
              className="text-lg font-semibold text-blue-600 hover:underline mb-2"
            >
              {product.name}
            </Link>

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

            <button
              onClick={() => handleUpvote(product)}
              disabled={
                user?.email === product.owner_email || isUpvoting
              }
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                user?.email === product.owner_email
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-l from-[#FF6B6B] to-[#FFE66D] text-white"
              }`}
            >
              <FaArrowUp />
              {isUpvoting ? "Upvoting..." : `Upvote ${product.upvotes || 0}`}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProducts;
