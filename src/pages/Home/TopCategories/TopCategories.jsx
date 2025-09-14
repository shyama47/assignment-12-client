import React from "react";

const TopCategories = () => {
  const categories = [
    { name: "AI Tools", icon: "🤖", desc: "Explore latest AI innovations" },
    { name: "Games", icon: "🎮", desc: "Discover trending games" },
    { name: "Software", icon: "💻", desc: "Find useful desktop tools" },
    { name: "Mobile Apps", icon: "📱", desc: "Check out new mobile apps" },
  ];

  return (
    <section className="max-w-6xl w-full mx-auto ">
      <h2 className="text-3xl font-bold text-center my-12 text-[#1A535C]">
         Top Categories
      </h2>
      <div className="grid  grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition border border-yellow-200"
          >
            <div className="text-5xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
            <p className="text-gray-600">{cat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
