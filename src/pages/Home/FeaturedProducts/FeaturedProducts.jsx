import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowUp } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../shared/Loading/Loading";
import useUpvote from "../../../hooks/useUpvote"; 

const FeaturedProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const { handleUpvote, isLoading: isUpvoting } = useUpvote(); 

  // ✅ Fetch Featured Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🌟 Featured Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 flex flex-col"
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

            <div className="flex gap-2 mb-3">
              {product.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* ✅ Upvote Button (Reusable via custom hook) */}
            <button
              onClick={() => handleUpvote(product)}
              disabled={
                user?.email === product.owner_email ||
                isUpvoting // disable during mutation
              }
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                user?.email === product.owner_email
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <FaArrowUp />
              {isUpvoting ? "Upvoting..." : `Upvote ${product.upvotes || 0}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
