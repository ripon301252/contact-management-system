import React, {} from "react";
import { MdAddTask } from "react-icons/md";
import { IoEye } from "react-icons/io5";

const System = ({ contacts, setPage, setEditId, loading }) => {

  const recentContacts = [...contacts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const saveEmails = contacts.filter((contact) => contact.email);

  if (loading) {
    return (
      <div className="min-h-screen px-4 md:px-10 py-16 animate-pulse space-y-10">
        {/* Header */}
        {/* <div className="text-center space-y-3">
          <div className="h-10 w-72 mx-auto bg-white/10 rounded"></div>
          <div className="h-4 w-96 mx-auto bg-white/10 rounded"></div>
        </div> */}

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 space-y-10">
            {/* Stats */}
            <div className="space-y-5">
              <div className="h-6 w-40 bg-white/10 rounded"></div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="h-24 bg-white/10 rounded-xl"></div>
                <div className="h-24 bg-white/10 rounded-xl"></div>
                <div className="h-24 bg-white/10 rounded-xl"></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <div className="h-6 w-40 bg-white/10 rounded"></div>

              <div className="flex gap-4">
                <div className="flex-1 h-12 bg-white/10 rounded-xl"></div>
                <div className="flex-1 h-12 bg-white/10 rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 space-y-10">
            {/* Recent */}
            <div className="space-y-4">
              <div className="h-6 w-40 bg-white/10 rounded"></div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                    <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manage */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-white/10 rounded"></div>

              <div className="h-12 bg-white/10 rounded-xl"></div>
              <div className="h-12 bg-white/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-10 py-16 text-white relative">
      {/*  Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-3xl"></div>

      {/*  Header */}
      <div className="relative text-center max-w-2xl mx-auto">
        <h1
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 p-2 bg-clip-text text-transparent 
  md:whitespace-nowrap"
        >
          Contact Management System
        </h1>

        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Manage and organize your contacts with a clean modern dashboard.
        </p>
      </div>

      {/*  Main Container */}
      <div className="relative mt-14 flex flex-col lg:flex-row gap-10">
        {/*  LEFT */}
        <div className="w-full lg:w-1/2 space-y-10">
          {/*  Stats */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-6">
              Contact Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  title: " Total Contacts",
                  value: contacts.length,
                },
                {
                  title: "Recently Added",
                  value: recentContacts.length,
                },
                {
                  title: "Saved Emails",
                  value: saveEmails.length,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative p-6 rounded-xl backdrop-blur-xl 
                  bg-white/5 border border-white/10 text-center
                  hover:scale-105 transition"
                >
                  <h2 className="text-3xl font-bold text-cyan-400">
                    {item.value}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">{item.title}</p>
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
                hover:scale-105 active:scale-95 transition shadow-lg cursor-pointer"
              >
                <span className="flex justify-center items-center gap-2">
                  <MdAddTask className="text-2xl" />
                  Add Contact
                </span>
              </button>

              <button
                onClick={() => setPage("All Contact")}
                className="flex-1 py-3 rounded-xl font-semibold 
                bg-white/10 hover:bg-white/20 border border-white/10 transition cursor-pointer"
              >
                <span className="flex justify-center items-center gap-2">
                  <IoEye className="text-2xl" />
                  View Contacts
                </span>
              </button>
            </div>
          </div>
        </div>

        {/*  RIGHT */}
        <div className="w-full lg:w-1/2 space-y-10">
          {/*  Recent Contacts */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-6 ">
              Recent Contacts
            </h2>

            <div className="space-y-4">
              {recentContacts.length === 0 ? (
                <p className="text-gray-400 text-center">No recent contacts</p>
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
                      <p className="text-sm text-gray-400">{contact.email}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-300 mb-5">Manage</h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setPage("Add Contact")}
                className="py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-500 to-blue-500 transition hover:scale-105 cursor-pointer"
              >
                <span className="flex justify-center items-center gap-2">
                  <MdAddTask className="text-2xl" />
                  Create Contact
                </span>
              </button>

              <button
                onClick={() => {
                  setEditId(recentContacts[0]?._id); //  latest contact edit
                  setPage("All Contact");
                }}
                className="py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-500 to-purple-500 border border-white/10 transition hover:scale-105 cursor-pointer"
              >
                <span className="flex justify-center items-center gap-2">
                  <IoEye className="text-2xl" />
                  Manage Contacts
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;
