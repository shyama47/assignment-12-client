import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ fetch single product by id
 // ✅ এখন id দিয়ে specific product আনবে
const { data: product, isLoading } = useQuery({
  queryKey: ["product", id],
  queryFn: async () => {
    const res = await axiosSecure.get(`/singleproduct/${id}`);
    return res.data;
  },
});


  // ✅ react-hook-form setup
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        image: product.image,
        externalLink: product.externalLink,
      });
    }
  }, [product, reset]);

  // ✅ mutation for update
  const mutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await axiosSecure.patch(`/productUp/${id}`, updatedProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      Swal.fire("Updated!", "Your product has been updated.", "success");
      navigate("/dashboard/my-products");
    },
  });

  const onSubmit = (data) => {
    const updatedProduct = {
      name: data.name,
      description: data.description,
      image: data.image,
      externalLink: data.externalLink,
    };
    mutation.mutate(updatedProduct);
  };

  if (isLoading) return <p className="text-center">Loading product...</p>;

  return (
    <div className="flex justify-center items-center my-10 px-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-blue-400">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          ✨ Update Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter product name"
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Product Image URL *
            </label>
            <input
              {...register("image", { required: true })}
              placeholder="https://example.com/product.png"
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write a short description"
              rows={3}
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              External Link
            </label>
            <input
              {...register("externalLink")}
              placeholder="https://yourwebsite.com"
              className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 shadow-lg hover:from-blue-600 hover:to-green-500 transition-all duration-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "⏳ Updating..." : "💾 Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
