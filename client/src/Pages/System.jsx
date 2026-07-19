import React from "react";

const System = ({ contacts, setPage }) => {
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const saveEmails = contacts.filter((contact) => contact.email);

  return (
    <div className="min-h-screen px-4 md:px-10 py-16 text-white relative">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-3xl"></div>

      {/* 🧠 Header */}
      <div className="relative text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold 
        bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Contact Management System
        </h1>

        <p className="text-gray-400 mt-4 text-sm md:text-base">
          Manage and organize your contacts with a clean modern dashboard.
        </p>
      </div>

      {/* 📦 Main Container */}
      <div className="relative mt-14 flex flex-col lg:flex-row gap-10">

        {/* 📊 LEFT */}
        <div className="w-full lg:w-1/2 space-y-10">

          {/* 📊 Stats */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-6">
              Contact Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {[{
                title: " Total Contacts",
                value: contacts.length
              },{
                title: "Recently Added",
                value: recentContacts.length
              },{
                title: "Saved Emails",
                value: saveEmails.length
              }].map((item, i) => (

                <div
                  key={i}
                  className="relative p-6 rounded-xl backdrop-blur-xl 
                  bg-white/5 border border-white/10 text-center
                  hover:scale-105 transition"
                >
                  <h2 className="text-3xl font-bold text-cyan-400">
                    {item.value}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    {item.title}
                  </p>
                </div>

              ))}

            </div>
          </div>

          {/* ⚡ Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-5">
              Quick Actions
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => setPage("Add Contact")}
                className="flex-1 py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-500 to-blue-500
                hover:scale-105 active:scale-95 transition shadow-lg"
              >
                ➕ Add Contact
              </button>

              <button
                onClick={() => setPage("All Contact")}
                className="flex-1 py-3 rounded-xl font-semibold 
                bg-white/10 hover:bg-white/20 border border-white/10 transition"
              >
                📋 View Contacts
              </button>

            </div>
          </div>
        </div>

        {/* 📋 RIGHT */}
        <div className="w-full lg:w-1/2 space-y-10">

          {/* 📋 Recent Contacts */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-6">
              Recent Contacts
            </h2>

            <div className="space-y-4">

              {recentContacts.length === 0 ? (
                <p className="text-gray-400 text-center">
                  No recent contacts
                </p>
              ) : (
                recentContacts.map((contact, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl 
                    backdrop-blur-xl bg-white/5 border border-white/10
                    hover:scale-[1.02] transition"
                  >
                    <img
                      src={contact.image || "https://i.ibb.co/2kR7b6d/user.png"}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover border border-cyan-400/40"
                    />

                    <div>
                      <h3 className="font-semibold text-cyan-300">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {contact.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {contact.phone}
                      </p>
                    </div>
                  </div>

                ))
              )}

            </div>
          </div>

          {/* ⚡ Right Actions */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-5">
              Manage
            </h2>

            <div className="flex flex-col gap-4">

              <button
                onClick={() => setPage("Add Contact")}
                className="py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-500 to-blue-500 transition"
              >
                ➕ Create Contact
              </button>

              <button
                onClick={() => setPage("All Contact")}
                className="py-3 rounded-xl font-semibold 
                bg-white/10 hover:bg-white/20 border border-white/10 transition"
              >
                📋 Manage Contacts
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default System;