import React from "react";
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
    <section className="max-w-6xl w-full mx-auto">
      <h2 className="text-3xl font-bold text-center my-12 text-[#1A535C]">
        🚀 How It Works
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-center mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center  max-w-[150px]  md:max-w-full  sm:max-w-full">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
