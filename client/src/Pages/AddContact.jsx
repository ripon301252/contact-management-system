import React, { useState } from "react";

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
        alert("Saved ✅");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        
        {/* 🖼️ Image Side */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/contact-us-concept-landing-page_52683-12860.jpg"
            alt="contact"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* 📋 Form Side */}
        <div className="card w-full shadow-2xl bg-gray-800 text-white">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center text-cyan-400/50">
              Add Contact
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="input input-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="input input-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="input input-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="input input-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="input input-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write something..."
                className="textarea textarea-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <button className="btn bg-cyan-600/50 hover:bg-cyan-500/50 font-semibold border-none w-full mt-3">
                Save Contact
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;