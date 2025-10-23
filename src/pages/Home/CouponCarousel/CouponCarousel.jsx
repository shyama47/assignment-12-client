import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../shared/Loading/Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const CouponCarousel = () => {
  const axiosInstance = useAxiosInstance();

  // Fetch only valid coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["validCoupons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coupons");
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
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500, slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#1A535C]">
      Special Coupons
      </h2>
      <p className="text-gray-500 text-sm text-center max-w-2xl mx-auto mb-10">Discover limited-time discounts and special offers designed to help you save more on every purchase you make today.</p>
      <Slider {...settings}>
        {coupons.map((coupon) => (
          <div key={coupon._id} className="p-3">
            <div className="bg-gradient-to-r from-[#FFE66D] to-[#FF6B6B] text-white rounded-xl shadow-lg p-5 sm:p-6 h-40 sm:h-44 md:h-48 flex flex-col justify-between transition-transform transform hover:scale-105 duration-300">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">
                  Code: {coupon.code}
                </h3>
                <p className="text-base sm:text-lg font-semibold">
                  {coupon.discount}% OFF
                </p>
                <p className="text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                  {coupon.description}
                </p>
              </div>
              <p className="text-xs sm:text-sm mt-2">
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