import React, { useState } from "react";
import Swal from "sweetalert2";

const AddContact = ({ setContacts }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // alert("Saved ✅");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your contact has been saved",
          showConfirmButton: false,
          timer: 2200,
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
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* 🖼️ Text Side */}
        <div className="hidden md:flex items-center justify-center rounded-xl relative overflow-hidden">
          {/* 🔥 Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl pointer-events-none"></div>

          {/* 💎 Glass Background */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"></div>

          {/* ✨ Content */}
          <div className="relative z-10 text-center p-8">
            <h1 className="text-3xl font-bold text-white mb-4 leading-snug">
              Manage Your Contacts <br />
              <span className="text-cyan-400">Like a Pro 🚀</span>
            </h1>

            <p className="text-gray-300 text-sm mb-6">
              Add, organize, and access your important contacts anytime. Simple.
              Fast. Secure.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p>✔ Save unlimited contacts</p>
              <p>✔ Quick search & edit</p>
              <p>✔ Clean & modern UI</p>
            </div>
          </div>
        </div>

        {/* 📋 Form Side */}
        <div className="w-full rounded-2xl relative overflow-hidden">
          {/* 🔥 Gradient Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl"></div>

          {/* 💎 Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"></div>

          {/* ✨ Content */}
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
                className="w-full py-3 rounded-lg font-semibold text-white 
        bg-gradient-to-r from-cyan-500 to-blue-500 
        hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-lg"
              >
                Save Contact 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
