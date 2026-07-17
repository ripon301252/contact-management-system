import React from "react";

const System = ({ contacts, setPage }) => {
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const saveEmails = contacts.filter((contact) => contact.email);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 md:px-10 py-16">
      
      {/* 🔥 Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400">
          Contact Management System
        </h1>
        <p className="text-gray-400 mt-4 text-sm md:text-base">
          Easily add, manage, and organize all your contacts in one place.
        </p>
      </div>

      {/* 📦 Main Container */}
      <div className="mt-12 flex flex-col lg:flex-row gap-10 justify-center items-start">
        
        {/* 📊 LEFT SIDE */}
        <div className="w-full lg:w-1/2">
          
          {/* Stats */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
              Contact Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-cyan-500/20 transition">
                <h2 className="text-3xl font-bold text-cyan-400">
                  {contacts.length}
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                  Total Contacts
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-cyan-500/20 transition">
                <h2 className="text-3xl font-bold text-cyan-400">
                  {recentContacts.length}
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                  Recently Added
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-cyan-500/20 transition">
                <h2 className="text-3xl font-bold text-cyan-400">
                  {saveEmails.length}
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                  Saved Emails
                </p>
              </div>
            </div>
          </div>

          {/* ⚡ Quick Actions */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-cyan-400/70 mb-5">
              Quick Actions
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setPage("Add Contact")}
                className="bg-cyan-500/50 hover:bg-cyan-400/50 font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
              >
                ➕ Add Contact
              </button>

              <button
                onClick={() => setPage("All Contact")}
                className="bg-gray-700 hover:bg-gray-600 font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
              >
                📋 View Contacts
              </button>
            </div>
          </div>
        </div>

        {/* 📋 RIGHT SIDE */}
        <div className="w-full lg:w-1/2">
          
          {/* Recent Contacts */}
          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-6 text-center lg:text-left">
              Recent Contacts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {recentContacts.length === 0 ? (
                <p className="text-gray-400 text-center">
                  No recent contacts
                </p>
              ) : (
                recentContacts.map((contact, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-cyan-500/20 hover:scale-[1.02] transition"
                  >
                    <h3 className="text-lg font-semibold">
                      {contact.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {contact.email}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {contact.phone}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ⚡ Quick Actions (Right) */}
          <div className="mt-10 text-center lg:text-left">
            <h2 className="text-xl font-semibold text-cyan-400/70 mb-5">
              Quick Actions
            </h2>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                onClick={() => setPage("Add Contact")}
                className="bg-cyan-600/50 hover:bg-cyan-500/50 font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
              >
                ➕ Create New Contact
              </button>

              <button
                onClick={() => setPage("All Contact")}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 font-semibold rounded-lg transition cursor-pointer"
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