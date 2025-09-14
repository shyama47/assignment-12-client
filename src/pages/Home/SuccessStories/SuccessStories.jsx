import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import Loading from "../../shared/Loading/Loading";



const SuccessStories = () => {
    const axiosInstance =useAxiosInstance();
  const { data: reviews, isLoading, isError } = useQuery({
    queryKey:['riview'],
    queryFn:async()=>{
        const res =await axiosInstance.get('review')
        return res.data || []
    }
  });

  if (isLoading) return <Loading/>;

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">Failed to load Success Stories</p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl w-full mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#1A535C]">
        🚀 Success Stories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold mb-2">{review.reviewerName}</h3>
                <p className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full ">Rating  {review.rating}</p>
              </div>
            </div>
 <p className="text-gray-600 ">
  {review.description}
</p>

          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;


