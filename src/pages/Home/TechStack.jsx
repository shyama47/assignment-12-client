import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaHtml5 } from "react-icons/fa";
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss } from "react-icons/si";
import { MdOutlineCss } from "react-icons/md";

const TechStack = () => {
  const techs = [
    { icon: <FaHtml5  className="text-lime-600" />, name: "HTML" },
    { icon:  <MdOutlineCss className="text-purple-500" />, name: "CSS" },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
        { icon: <FaReact className="text-sky-500" />, name: "React" },
    { icon: <SiFirebase className="text-amber-500" />, name: "Firebase Auth" },
    { icon: <SiExpress className="text-gray-700" />, name: "Express.js" },
    { icon: <SiMongodb className="text-green-500" />, name: "MongoDB" },
    
  ];

  return (
    <section className="max-w-6xl w-full mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1A535C] mb-6"
      >
        Built With Modern Tech Stack
      </motion.h2>
      <p className="text-gray-500 text-sm italic text-center mb-10 max-w-2xl mx-auto">
        Our platform is powered by cutting-edge technologies ensuring performance, scalability, and seamless user experience.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
        {techs.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center bg-white shadow-md rounded-xl py-6"
          >
            <div className="text-4xl mb-2">{t.icon}</div>
            <p className="font-medium text-gray-700">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
