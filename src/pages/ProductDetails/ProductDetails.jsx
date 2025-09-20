
import React from "react";
import { Link, useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import useUpvote from "../../hooks/useUpvote";
import { FaThumbsUp, FaFlag } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../shared/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user,loading } = UseAuth();
  const queryClient = useQueryClient();

    if(loading){
      return<Loading/>
    }
  //  fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singleproduct/${id}`);
      return res.data;
    },
    enabled:!!id && !!user.email,
  });

  //  fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      return data;
    },
    enabled:!!id && !!user.email,
  });

 
  const { handleUpvote } = useUpvote("product", id);

  //  report mutation
  const reportMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/products/report/${id}`, {
        userEmail: user?.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]);
      Swal.fire("Reported!", "Your report has been submitted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "You have already reported this product.", "error");
    },
  });

  // ✅ review mutation
  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      return await axiosSecure.post(`/reviews`, reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      Swal.fire("Success!", "Review submitted successfully.", "success");
    },
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const rating = form.rating.value;

    reviewMutation.mutate({
      productId: id,
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      description,
      rating,
    });

    form.reset();
  };

  if (isLoading) return <Loading />

  const alreadyReported = product?.reportedUsers?.includes(user?.email);

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
    <div className=" p-6 bg-white shadow rounded-2xl my-8 border border-amber-200">
      {/* Product Info */}
      <Helmet>
        <title>ProductDetails || page</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full md:w-1/2 rounded-xl"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-gray-600 my-2">{product?.description}</p>
          <div className="flex gap-2 my-2 flex-wrap">
            {product?.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 my-4">
            <button
              onClick={() => handleUpvote(product)}
              disabled={
                user?.email === product?.owner_email ||
                product?.votedUsers?.includes(user?.email)
              }
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            >
              <FaThumbsUp /> Upvotes {product?.upvotes || 0}
            </button>

            {/* Report */}
            <button
              onClick={() => reportMutation.mutate()}
              disabled={alreadyReported}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            >
              <FaFlag /> {alreadyReported ? "Reported" : "Report"}
            </button>
          </div>
          {/* External Link */}
          {product?.externalLink && (
            <Link 
              to={product.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Visit Website
            </Link>
          )}

        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>

        {/* Review List */}
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">
                      ⭐ {review.rating}/5
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{review.description}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {/* Review Form */}
        {user && (
          <form onSubmit={handleSubmitReview} className="mt-6 space-y-3">
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100"
            />
            <input
              type="text"
              value={user?.photoURL}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-100"
            />
            <textarea
              name="description"
              placeholder="Write your review..."
              required
              className="w-full p-3 border rounded-lg"
            ></textarea>
            <div className="flex gap-10">
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                required
                className="w-24 p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-white px-4 py-2 rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;



