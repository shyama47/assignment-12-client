
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { WithContext as ReactTags } from "react-tag-input";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import React from "react";


const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  // 🔹 tags state
  const [tags, setTags] = React.useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  // update
  const onSubmit = (data) => {
  // Map to plain strings
  const formattedTags = tags.map(t => t.text ? t.text : t).filter(Boolean);

  console.log("Tags before submit:", formattedTags); // Debug

  const newProduct = {
    name: data.name,
    description: data.description,
    image: data.image,
    externalLink: data.externalLink,
    tags: formattedTags, // array of strings
    owner_name: user?.displayName,
    owner_email: user?.email,
    owner_image: user?.photoURL,
    upvotes: 0,
    timestamp: new Date(),
  };

  mutation.mutate(newProduct);
};

  const mutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await axiosSecure.post("/products", newProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      reset();
      setTags([]);

      // 🎉 SweetAlert2 Success Message
      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Your product has been added successfully 🎉",
        confirmButtonColor: "#6366f1",
      });

      // 🔹 Redirect user to My Products page
      navigate("/dashboard/my-products");
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the product!",
        confirmButtonColor: "#ef4444",
      });
    },
  });


  return (
    <div className="flex justify-center items-center my-10 px-4 ">
      <div className="w-full max-w-2xl mx-auto  bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-pink-400">
        <h2 className="text-3xl font-extrabold text-center  mb-6">
          🚀 Add New Product
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
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
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
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
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
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="w-full p-3 border-2 border-pink-200 rounded-xl bg-pink-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Owner Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full p-3 border-2 border-pink-200 rounded-xl bg-pink-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Owner Image
              </label>
              <input
                value={user?.photoURL || ""}
                readOnly
                className="w-full p-3 border-2 border-pink-200 rounded-xl bg-pink-50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="border-2 border-pink-300 rounded-xl p-2">
              <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                placeholder="Add new tag"
                inputFieldPosition="bottom"
                classNames={{
                  tag: "bg-pink-500 text-white rounded-md px-2 py-1 m-1 inline-block",
                  tagInputField:
                    "w-full p-2 border-none focus:outline-none text-gray-700",
                }}
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              External Link
            </label>
            <input
              {...register("externalLink")}
              placeholder="https://yourwebsite.com"
              className="w-full p-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:from-indigo-600 hover:to-pink-500 transition-all duration-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "🚀 Adding..." : "✨ Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;


