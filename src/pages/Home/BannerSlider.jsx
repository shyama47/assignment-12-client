import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../../assets/slider5.png'
import slider2 from '../../assets/slider4.png'
import slider3 from '../../assets/slider3.png'
import { NavLink } from "react-router";
const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      img: slider2,
      title: "Discover Innovative Tech Products ",
      desc: "Explore trending web apps, AI tools, software, games, and mobile apps all in one platform.",
    },
    {
      id: 2,
      img: slider1,
      title: "Share Your Creations with the Community ",
      desc: "Submit your own tech products and get recognition from a global community of enthusiasts.",
    },
    {
      id: 3,
      img: slider3,
      title: "Upvote, Review & Collaborate 💡",
      desc: "Connect, review, and discover innovative products that can change the tech world.",
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            {/* Background image */}
            <div
              className="md:min-h-[70vh] min-h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-6"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text */}
              <div className="relative z-10 max-w-xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold  mt-6">
                  {slide.title}
                </h2>
                <p className="mt-4 text-lg md:text-xl">
                  {slide.desc}
                </p>
               <button className="my-6 px-6 py-3 bg-[#FF6B6B] hover:bg-[#1A535C] text-white font-semibold rounded-lg shadow-lg transition">
                 <NavLink  
                to='products'>
                  Explore Now
                </NavLink>
               </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
