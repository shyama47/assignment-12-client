import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch reported products
  const { data: reportedProducts = [], isLoading } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      const res  = await axiosSecure.get("/products/reported");
      return res.data;
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/products/reported/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Product has been removed.", "success");
      queryClient.invalidateQueries(["reportedProducts"]);
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-[95%] sm:w-[90%] md:w-[80%] lg:max-w-3xl mx-auto my-10 border border-green-200">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        🚨 Reported Products
      </h2>
        <Helmet>
          <title>ReportedProduct || page</title>
        </Helmet>
      {reportedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No reported products found.</p>
      ) : (
        <div className=" overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full table">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedProducts.map((product,index) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 flex gap-3">
                    <Link
                      to={`/singleproduct/${product._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "This will permanently delete the product!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteMutation.mutate(product._id);
                          }
                        })
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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

export default ReportedContents;



