import { NavLink } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#FFE66D] text-[#1A535C] pb-5 pt-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          // viewport={{ once: true }}
          className="flex flex-col md:col-span-1 mb-6 md:mb-0"
        >
          <h2 className="text-2xl font-bold mb-3">AppOrbit</h2>
          <p className="text-sm leading-relaxed md:max-w-[300px]">
            AppOrbit is a community-driven platform to discover, share, and review
            the latest tech products — including Web Apps, AI Tools, Software,
            Games, and Mobile Apps. Join our community to explore innovations,
            upvote your favorites, and showcase your own creations.
          </p>
        </motion.div>

        {/* Other Sections (Menu, Quick Links, Social Media) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          // viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 md:col-span-3"
        >
          {/* Menu Links */}
          <motion.div
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:ml-20"
          >
            <h3 className="text-lg font-semibold mb-3">Menu</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="hover:text-[#FF6B6B]">Home</NavLink></li>
              <li><NavLink to="/products" className="hover:text-[#FF6B6B]">Products</NavLink></li>
              <li><NavLink to="/login" className="hover:text-[#FF6B6B]">Login</NavLink></li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/contact" className="hover:text-[#FF6B6B]">Contact</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-[#FF6B6B]">Terms & Conditions</NavLink></li>
              <li><NavLink to="/privacy" className="hover:text-[#FF6B6B]">Privacy Policy</NavLink></li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { to: "/facebook", icon: <FaFacebookF /> },
                { to: "/twitter", icon: <FaTwitter /> },
                { to: "/linkedin", icon: <FaLinkedinIn /> },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-[#1A535C] text-white rounded-full hover:bg-[#FF6B6B] transition"
                >
                  <NavLink to={item.to}>{item.icon}</NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        // viewport={{ once: true }}
        className="mt-6 text-center text-[#1A535C] text-sm border-t border-[#1A535C]/30 pt-7"
      >
        © {new Date().getFullYear()} MyShop. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
