import React, { useState } from "react";

const SendContact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    address: "",
    message: "",
  });

  // input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handle (POST)
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

      // UI instantly update
      setContacts(prev => [...prev, data]);
    });
};

  return (
    <div className="max-w-7xl mx-auto px-7 min-h-screen">
      <h2>Add Contact</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
        />

        <br />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />
        <br />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
        <br />
        <textarea
          name="message"
          placeholder="Text your won"
          onChange={handleChange}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SendContact;