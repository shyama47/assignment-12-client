import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowUp } from "react-icons/fa";
import useUpvote from "../../hooks/useUpvote";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../shared/Loading/Loading";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
const axiosInstance = useAxiosInstance();
  const { user } = UseAuth();
    const { handleUpvote, isLoading: isUpvoting } = useUpvote(); 
  const [searchTerm, setSearchTerm] = useState("");

  //  Fetch all accepted products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["acceptedProducts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/status/Accepted");
      return res.data;
    },
  });

  //  Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <Helmet>
        <title>Product || page</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🛍️ All Products
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found for your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className=" bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg mb-4"
              />
              <Link
                to={`/singleproduct/${product._id}`}
                className="text-lg font-semibold text-blue-600 hover:underline mb-2"
              >
                {product.name}
              </Link>
              <p className="text-gray-600 text-xm mb-2">{product.description.slice(0,100)}...</p>

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
                user?.email === product.owner_email ||
                isUpvoting // disable during mutation
              }
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                user?.email === product.owner_email
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#FF6B6B] to-[#FFE66D] text-white"
              }`}
            >
              <FaArrowUp />
              {isUpvoting ? "Upvoting..." : `Upvote ${product.upvotes || 0}`}
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;




