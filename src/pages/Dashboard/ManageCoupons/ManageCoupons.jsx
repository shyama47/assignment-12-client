import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";


const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  // Add coupon
  const addCoupon = useMutation({
    mutationFn: async (coupon) => {
      return await axiosSecure.post("/coupons", coupon);
    },
    onSuccess: () => {
      Swal.fire("Success", "Coupon added successfully!", "success");
      queryClient.invalidateQueries(["coupons"]);
      reset(); // clear form after success
    },
  });

  //  Delete coupon
  const deleteCoupon = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/coupons/${id}`);
    },
    onSuccess: () => {
      Swal.fire(" Deleted!", "Coupon has been removed.", "success");
      queryClient.invalidateQueries(["coupons"]);
    },
  });

  // Handle form submit
  const onSubmit = (data) => {
    addCoupon.mutate(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 my-10">
     
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🎟️ Manage Coupons
      </h2>

      {/* Add Coupon Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow mb-8 grid gap-4 md:grid-cols-2"
      >
        <input
          type="text"
          placeholder="Coupon Code"
          {...register("code", { required: "Coupon code is required" })}
          className="input input-bordered w-full"
        />
        {errors.code && (
          <p className="text-red-500 text-sm">{errors.code.message}</p>
        )}

        <input
          type="date"
          {...register("expiryDate", { required: "Expiry date is required" })}
          className="input input-bordered w-full"
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
        )}

        <input
          type="number"
          placeholder="Discount Amount (%)"
          {...register("discount", {
            required: "Discount amount is required",
            min: { value: 1, message: "Minimum discount is 1%" },
            max: { value: 100, message: "Maximum discount is 100%" },
          })}
          className="input input-bordered w-full md:col-span-2"
        />
        {errors.discount && (
          <p className="text-red-500 text-sm">{errors.discount.message}</p>
        )}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="textarea textarea-bordered md:col-span-2 w-full"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 text-white md:col-span-2"
        >
          ➕ Add Coupon
        </button>
      </form>

      {/* Coupon List */}
      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">No coupons available.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full table ">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th>Code</th>
                <th>Expiry Date</th>
                <th>Discount</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className=" font-bold">{coupon.code}</td>
                  <td className="">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="">{coupon.discount}%</td>
                  <td className="max-w-[180px] truncate">{coupon.description}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => deleteCoupon.mutate(coupon._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                       Delete
                    </button>
                    {/* Future: Edit feature modal */}
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

export default ManageCoupons;
