import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const JoinCommunity = () => {
  const benefits = [
    { title: "Discover New Products", desc: "Stay ahead by exploring latest AI, apps, and tools every day." },
    { title: "Share Your Creation", desc: "Launch your tech product and get feedback from early adopters." },
    { title: "Upvote & Support", desc: "Support your favorite innovations and help them grow." },
    { title: "Connect with Innovators", desc: "Be part of a vibrant community of tech enthusiasts & creators." },
  ];

  return (
    <section className="max-w-6xl w-full mx-auto px-4  my-20">
    {/* <section className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 border"> */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-[#1A535C]"
      >
        🌟 Join Our Community
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefits.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            // viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-yellow-200"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 text-[#1A535C]">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
             <button className="my-6 px-6 py-3 bg-[#FF6B6B] hover:bg-[#1A535C] text-white font-semibold rounded-lg shadow-lg transition">
                 <NavLink  
                to='add-product'>
                  Explore Now
                </NavLink>
               </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default JoinCommunity;
