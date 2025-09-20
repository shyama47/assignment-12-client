
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ThumbsUp, Upload, Users } from "lucide-react";

const steps = [
  {
    title: "Submit Your Product",
    desc: "Add your AI tool, app, game or software to the platform in just a few clicks.",
    icon: <Upload className="w-12 h-12 text-indigo-500" />,
  },
  {
    title: "Moderator Review",
    desc: "Our moderators review your submission to ensure quality and relevance.",
    icon: <CheckCircle className="w-12 h-12 text-green-500" />,
  },
  {
    title: "Get Upvotes",
    desc: "Users explore and upvote your product, helping it gain visibility.",
    icon: <ThumbsUp className="w-12 h-12 text-pink-500" />,
  },
  {
    title: "Grow with Community",
    desc: "Build credibility, gather feedback, and connect with tech enthusiasts.",
    icon: <Users className="w-12 h-12 text-blue-500" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A535C]"
      >
        🚀 How It Works
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            // viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg flex flex-col items-center text-center"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
