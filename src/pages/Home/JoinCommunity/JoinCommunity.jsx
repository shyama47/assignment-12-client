import React from "react";

const JoinCommunity = () => {
  const benefits = [
    {
      title: "Discover New Products",
      desc: "Stay ahead by exploring latest AI, apps, and tools every day.",
    },
    {
      title: "Share Your Creation",
      desc: "Launch your tech product and get feedback from early adopters.",
    },
    {
      title: "Upvote & Support",
      desc: "Support your favorite innovations and help them grow.",
    },
    {
      title: "Connect with Innovators",
      desc: "Be part of a vibrant community of tech enthusiasts & creators.",
    },
  ];

  return (
    <section className="max-w-5xl w-full mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-5 text-[#1A535C]">
         Join Our Community
      </h2>
      <div className="grid grid-cols-2 gap-8 px-6 max-w-5xl mx-auto">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border border-yellow-200"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinCommunity;
