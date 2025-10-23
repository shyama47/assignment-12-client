import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I submit a product?",
    a: "Go to 'Add Product' section, fill in the required details, and submit. Our moderators will review and publish it soon.",
  },
  {
    q: "Can I edit my product after submission?",
    a: "Yes, you can edit product details anytime from your dashboard before it’s approved.",
  },
  {
    q: "Is there any review process?",
    a: "All submissions go through a quick moderation process to maintain quality and authenticity.",
  },
  {
    q: "How do upvotes work?",
    a: "Users can upvote products they like. The more upvotes, the higher your product appears in trending lists.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
           {/* Section Title */}
      <div className="mb-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold  text-[#1A535C] text-left"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Colorful Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="h-1 w-[200px] bg-gradient-to-r from-[#FF6B6B] via-[#FFE66D] to-[#4ECDC4] rounded-full mt-4"
        ></motion.div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="https://i.postimg.cc/bJrqNnyS/Screenshot-2025-10-22-131518.png"
            alt="FAQ Illustration"
            className="w-full max-w-6xl rounded-xl shadow-md"
          />
        </motion.div>
        <div>
     
        {/* Right Side - FAQ List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {faqs.map((item, i) => (
            <div
              key={i}
              className="mb-4 rounded-lg overflow-hidden shadow-md bg-white hover:bg-gray-200 transition-all duration-700"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <span className="font-medium text-gray-800">{item.q}</span>
                <ChevronDown
                  className={`transition-transform ${
                    open === i ? "rotate-180 text-[#FF6B6B]" : "[#4ECDC4]"
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-gray-600"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
