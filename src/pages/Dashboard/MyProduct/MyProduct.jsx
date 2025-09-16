import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";


const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  // ✅ fetch user-specific products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts", user?.email]);
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    },
  });

  // ✅ handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="w-full max-w-3xl mx-auto  p-6  my-16">
      <Helmet>
        <title>MyProduct || page</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 text-center ">📦 My Products</h2>

      {products.length === 0 ? (
        <p className="bg-white shadow-xl border rounded-2xl text-center text-gray-500 p-6">You haven’t posted any product yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
          <table className="table w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th>Product Name</th>
                <th>Votes</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="font-medium">{product.name}</td>
                  <td>{product.upvotes || 0}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.status === "Accepted"
                          ? "bg-green-100 text-green-600"
                          : product.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {product.status }
                    </span>
                  </td>
                  <td className="flex gap-3 justify-center">
                    <Link
                      to={`/dashboard/update-product/${product._id}`}
                      className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
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

export default MyProducts;
