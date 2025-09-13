
import React from "react";
import toast from "react-hot-toast";
import { Mail, User, MessageSquare, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    console.log("Form Submitted:", formData);

    toast.success("Message sent successfully!");

    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 border border-[#FF6B6B]">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-transparent bg-clip-text">
          📩 Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
         {/* Contact Info */}
          <div className=" p-6 flex flex-col justify-center space-y-5 ">
            <h3 className="text-2xl font-bold text-[#FF6B6B]">My Contact Info</h3>
            <p className="flex items-center gap-3 text-gray-600">
              <Phone className="text-[#FF6B6B]" /> +880 170 9035 593
            </p>
            <p className="flex items-center gap-3 text-gray-600">
              <Mail className="text-[#FF6B6B]" /> shyama588@gmail.com
            </p>
            <p className="flex items-center gap-3 text-gray-600">
              <MapPin className="text-[#FF6B6B]" /> Dhaka, Bangladesh
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#FF6B6B]">
              <User className="text-[#FF6B6B] mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full outline-none"
                required
              />
            </div>

            <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#FF6B6B]">
              <Mail className="text-[#FF6B6B] mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full outline-none"
                required
              />
            </div>

            <div className="flex items-start border rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#FF6B6B]">
              <MessageSquare className="text-[#FF6B6B] mr-3 mt-1" />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="w-full outline-none resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFE66D] text-white py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
            >
              🚀 Send Message
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Contact;

