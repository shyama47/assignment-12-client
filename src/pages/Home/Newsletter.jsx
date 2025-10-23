import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="bg-[#F7FAFC] py-16 px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A535C] mb-4"
      >
        Stay Updated with Trending Innovations
      </motion.h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-6">
        Subscribe to our newsletter and get the latest trending products, tools, and creator updates delivered to your inbox.
      </p>

      <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1A535C]"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#1A535C] text-white rounded-lg hover:bg-[#163e44] transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
