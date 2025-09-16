import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";


const ProductReviewQueue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch pending products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/status/pending");
      return res.data;
    },
  });

  // ✅ Accept product mutation
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/products/accept/${id}`);
      return { id, ...res.data };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["products", "pending"], (old) => {
        if (!old) return [];
        return old.map((p) =>
          p._id === data.id ? { ...p, status: "Accepted" } : p
        );
      });
      Swal.fire("Accepted!", "The product has been accepted.", "success");
    },
  });

  // ✅ Reject product mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/products/reject/${id}`);
      return { id, ...res.data };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["products", "pending"], (old) => {
        if (!old) return [];
        return old.map((p) =>
          p._id === data.id ? { ...p, status: "Rejected" } : p
        );
      });
      Swal.fire("Rejected!", "The product has been rejected.", "info");
    },
  });

  // ✅ Make Featured mutation
  const featureMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/products/feature/${id}`);
      return { id, ...res.data };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["products", "pending"], (old) => {
        if (!old) return [];
        return old.map((p) =>
          p._id === data.id ? { ...p, isFeatured: true } : p
        );
      });
      Swal.fire("Featured!", "The product is now featured.", "success");
    },
  });

  // ✅ Confirmation Wrapper
  const confirmAction = (action, id, title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        action(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-[95%] sm:w-[90%] md:w-[80%] lg:max-w-3xl mx-auto my-10 border border-green-200">
      <h2 className="text-2xl font-bold mb-4">📌 Product Review Queue</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No pending products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table w-full ">
            <thead>
              <tr className="bg-gray-300 text-black text-sm md:text-base">
                 <th className="">Product Name</th>
                <th className="">Status</th>
                <th className=" text-center">Actions</th>
               
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="">
                  <td className=" font-medium">{product.name}</td>
                  <td className=" text-sm font-semibold text-gray-700">
                    {product.status}
                  </td>
                  <td className=" flex  justify-center gap-2">
                    {/*  View Details */}
                    <Link
                      to={`/singleproduct/${product._id}`}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 text-sm truncate"
                    >
                      View Details
                    </Link>

                    {/* ✅ Make Featured */}
                    <button
                      onClick={() =>
                        confirmAction(
                          featureMutation.mutate,
                          product._id,
                          "Make Featured?",
                          "Do you want to mark this product as featured?",
                          "warning"
                        )
                      }
                      disabled={product.isFeatured}
                      className={`px-2 rounded text-sm truncate ${
                        product.isFeatured
                          ? "bg-yellow-200 cursor-not-allowed "
                          : "bg-yellow-400 hover:bg-yellow-500"
                      }`}
                    >
                      {product.isFeatured ? "Already Featured" : "Make Featured"}
                    </button>

                    {/* ✅ Accept */}
                    <button
                      onClick={() =>
                        confirmAction(
                          acceptMutation.mutate,
                          product._id,
                          "Accept Product?",
                          "Do you want to accept this product?",
                          "question"
                        )
                      }
                      disabled={product.status === "Accepted"}
                      className={`px-3 py-1 rounded text-sm ${
                        product.status === "Accepted"
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Accept
                    </button>

                    {/* ✅ Reject */}
                    <button
                      onClick={() =>
                        confirmAction(
                          rejectMutation.mutate,
                          product._id,
                          "Reject Product?",
                          "Do you want to reject this product?",
                          "warning"
                        )
                      }
                      disabled={product.status === "Rejected"}
                      className={`px-3 py-1 rounded text-sm ${
                        product.status === "Rejected"
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductReviewQueue;
