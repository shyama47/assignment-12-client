import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../shared/Loading/Loading";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CouponCarousel = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch only valid coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["validCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      // filter out expired coupons
      return res.data.filter(
        (c) => new Date(c.expiryDate) >= new Date()
      );
    },
  });

  if (isLoading) return <Loading />;

  if (coupons.length === 0)
    return (
      <p className="text-center text-gray-500 my-6">
        No valid coupons available right now.
      </p>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#1A535C]">
        🎟️ Special Coupons
      </h2>

      <Slider {...settings}>
        {coupons.map((coupon) => (
          <div key={coupon._id} className="p-4">
            <div className="bg-gradient-to-r from-[#FFE66D] to-[#FF6B6B] text-white rounded-xl shadow-lg p-6 h-44 flex flex-col justify-between">
            {/* <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 h-44 flex flex-col justify-between"> */}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Code: {coupon.code}
                </h3>
                <p className="text-lg font-semibold">
                  {coupon.discount}% OFF
                </p>
                <p className="text-sm mt-2">{coupon.description}</p>
              </div>
              <p className="text-sm mt-2">
                Expiry:{" "}
                {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CouponCarousel;
