import React from "react";

const System = ({ contacts, setPage }) => {
  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

    const saveEmails = contacts.filter(contact => contact.email)

  return (
    <div className="min-h-screen bg-gray-900 text-white px-5 py-16">
      {/* 🔥 Hero Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">
          Contact Management System
        </h1>
        <p className="text-gray-400 mt-4">
          Easily add, manage, and organize all your contacts in one place.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage("Add Contact")}
            className="bg-cyan-500/50 hover:bg-cyan-400/50 font-semibold px-6 py-2 rounded-lg cursor-pointer"
          >
            ➕ Add Contact
          </button>
          <button
            onClick={() => setPage("All Contact")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg cursor-pointer"
          >
            📋 View Contacts
          </button>
        </div>
      </div>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold text-cyan-400">
            {contacts.length}
          </h2>
          <p className="text-gray-400 mt-2">Total Contacts</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold text-cyan-400">
            {recentContacts.length}
          </h2>
          <p className="text-gray-400 mt-2">Recently Added</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold text-cyan-400">{saveEmails.length}</h2>
          <p className="text-gray-400 mt-2">Saved Emails</p>
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="mt-14 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-cyan-400/50 mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={() => setPage("Add Contact")}
            className="bg-cyan-600/50 hover:bg-cyan-500/50 px-6 py-3 rounded-lg cursor-pointer"
          >
            ➕ Create New Contact
          </button>

          <button
            onClick={() => setPage("All Contact")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg cursor-pointer"
          >
            📋 Manage Contacts
          </button>
        </div>
      </div>

      {/* 📋 Recent Contacts (Static Demo) */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
          Recent Contacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {recentContacts.length === 0 ? (
            <p className="text-gray-400 text-center col-span-3">No recent contacts</p>
          ) : (
            recentContacts.map((contact, i) => (
              <div
                key={i}
                className="bg-gray-800 p-5 rounded-xl shadow hover:scale-105 transition"
              >
                <h3 className="text-lg font-semibold">{contact.name}</h3>
                <p className="text-gray-400 text-sm">{contact.email}</p>
                <p className="text-gray-500 text-sm mt-1">{contact.phone}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default System;
