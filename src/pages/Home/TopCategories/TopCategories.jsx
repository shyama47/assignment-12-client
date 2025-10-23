import React from "react";
import { motion } from "framer-motion";

const TopCategories = () => {
  const categories = [
    { name: "AI Tools", icon: "🤖", desc: "Explore latest AI innovations" },
    { name: "Games", icon: "🎮", desc: "Discover trending games" },
    { name: "Software", icon: "💻", desc: "Find useful desktop tools" },
    { name: "Mobile Apps", icon: "📱", desc: "Check out new mobile apps" },
  ];

  return (
    <section className="max-w-6xl w-full mx-auto px-4">
    {/* <section className="max-w-6xl border w-full mx-auto py-12 px-4 sm:px-6 lg:px-8"> */}
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-[#1A535C]"
      >
         Top Categories
      </motion.h2>
<p className="text-gray-500 text-sm italic max-w-2xl mx-auto text-center mb-14">
  Explore the most popular categories where innovation meets passion — from cutting-edge AI tools to exciting games and powerful apps loved by our community.
</p>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            // viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="text-center "
          >
            <div className="text-4xl sm:text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{cat.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{cat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
