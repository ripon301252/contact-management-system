import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineDataSaverOn } from "react-icons/md";

const AddContact = ({ setContacts }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // empty field check
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Please fill all required fields ⚠️",
      });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(formData.email.trim())) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email ",
        text: "Please enter a valid email address",
      });
    }

    // API call
    setLoading(true);

    try {
      const res = await fetch(
        "https://contact-server-zs3l.onrender.com/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      // 🔥 important check
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      //  success
      Swal.fire({
        icon: "success",
        title: "Contact Saved Successfully ",
        timer: 2000,
        showConfirmButton: false,
      });

      setContacts((prev) => [...prev, data]);

      setFormData({
        name: "",
        email: "",
        image: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed ❌",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Text Side */}
        <div className="relative z-10 text-center py-32 rounded-2xl overflow-hidden">
          {/* 🔥 Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl"></div>

          {/* 💎 Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"></div>

          {/* ✨ Content */}
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              Manage Your Contacts <br />
              <span className="text-cyan-400 flex justify-center items-center gap-3 mt-2">
                Like a Pro
                <FaLayerGroup className="text-3xl animate-pulse" />
              </span>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Add, organize, and access your important contacts anytime.
              <span className="text-cyan-400 font-medium"> Simple</span>,
              <span className="text-blue-400 font-medium"> Fast</span>, and
              <span className="text-purple-400 font-medium"> Secure</span>.
            </p>

            {/* ✅ Feature Points */}
            <div className="flex flex-col items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:scale-105 transition">
                <span className="text-green-400">✔</span>
                Save unlimited contacts
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:scale-105 transition">
                <span className="text-cyan-400">✔</span>
                Quick search & edit
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:scale-105 transition">
                <span className="text-purple-400">✔</span>
                Clean & modern UI
              </div>
            </div>
          </div>
        </div>

        {/*  Form Side */}
        <div className="w-full rounded-2xl relative overflow-hidden">
          {/*  Gradient Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl"></div>

          {/*  Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"></div>

          {/*  Content */}
          <div className="relative z-10 p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">
              Add <span className="text-cyan-400">Contact</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Image */}
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Profile Image URL"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Phone */}
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Address */}
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write something..."
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
        focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              {/* Button */}
              <button
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 transition cursor-pointer
                  duration-200 shadow-lg ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}`}
              >
                <span className="flex justify-center items-center gap-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <MdOutlineDataSaverOn className="text-2xl" />
                      Save 
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
