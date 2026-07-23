import React, { useEffect, useState } from "react";
import {
  IoEye,
  IoSearch,
  IoTrashOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { FaRegEdit, FaPhoneAlt } from "react-icons/fa";
import { MdAddToDrive, MdEmail, MdAccessTimeFilled } from "react-icons/md";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { RiMessage3Fill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const AllContact = ({
  contacts,
  setContacts,
  editId,
  setEditId,
  role,
  loading,
  setPage,
}) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");

  // handleEdit control
  useEffect(() => {
    if (editId) {
      handleEdit(editId);
      setEditId(null); // reset
    }
  }, [editId]);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search),
  );

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  const indexOfLast = currentPage * contactsPerPage;
  const indexOfFirst = indexOfLast - contactsPerPage;

  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);

  // Total page
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getChangedFields = () => {
    const changed = [];

    for (let key in editData) {
      if (editData[key] !== selectedContact[key]) {
        changed.push(key);
      }
    }

    return changed;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const changedFields = getChangedFields();
    //  No change hole API call bondho
    if (changedFields.length === 0) {
      document.getElementById("edit_contact").close();
      Swal.fire({
        position: "center",
        icon: "info",
        title: "No changes",
        // showConfirmButton: false,
        // timer: 2200,
        text: "You didn't update anything ",
      });
      return;
    }

    // PUT
    fetch(
      `https://contact-server-zs3l.onrender.com/contacts/${selectedContact._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        // Swal.fire({
        //   icon: "success",
        //   title: "Update Successful",
        //   text:
        //     changedFields.length === 1
        //       ? `${changedFields[0]} updated successfully`
        //       : `${changedFields.join(", ")} updated successfully`,
        // });
        const message =
          changedFields.length === 1
            ? `<span style="color:#06b6d4; font-weight:600">${changedFields[0]}</span> updated successfully`
            : `<span style="color:#06b6d4; font-weight:600">${changedFields.join(", ")}</span> updated successfully`;

        Swal.fire({
          position: "center",
          icon: "success",
          html: message, // use html for color
        });

        // UI update
        setContacts((prev) =>
          prev.map((c) => (c._id === selectedContact._id ? data : c)),
        );

        document.getElementById("edit_contact").close();

        // Reset form after update
        setEditData({});
        setSelectedContact(null);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Update failed", "error");
      });

    setEditId(null);
  };

  const handleEdit = (id) => {
    const contact = contacts.find((c) => c._id === id);
    setSelectedContact(contact);
    setEditData(contact);

    document.getElementById("edit_contact").showModal();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This contact will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4", // cyan
      cancelButtonColor: "#ef4444", // red
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://contact-server-zs3l.onrender.com/contacts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Deleted successfully") {
              setContacts((prev) => prev.filter((c) => c._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Contact has been deleted.",
                icon: "success",
                timer: 2200,
                showConfirmButton: false,
              });
            } else {
              Swal.fire("Error!", "Delete failed!", "error");
            }
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };

  const handleViewDetails = (id) => {
    const contact = contacts.find((c) => c._id === id);
    setSelectedContact(contact);

    document.getElementById("view_modal").showModal();
  };

  // Export PDF
  const handlePDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(14);
    doc.text("Contact Management System - All Contact Report", 14, 10);

    const tableColumn = [
      "Name",
      "Email",
      "Phone",
      "Address",
      "Created",
      "Updated",
    ];

    const tableRows = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.phone,
      contact.address,

      // ✅ সুন্দর date format
      new Date(contact.createdAt).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),

      new Date(contact.updatedAt).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: {
        fontSize: 9,
      },
      headStyles: {
        fillColor: [6, 182, 212], // cyan
      },
    });

    doc.save("all_contact.pdf");
  };

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-6">
        {/* Search bar */}
        <div className="h-10 w-full md:w-1/3 bg-white/10 rounded-lg"></div>

        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-5 gap-4 items-center">
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-4 bg-white/10 rounded"></div>
            <div className="h-8 bg-white/10 rounded-lg"></div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 bg-white/10 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-10">
      {/* Heading */}
      <div className="relative mb-6">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl rounded-xl pointer-events-none"></div>

        {/* Glass Container */}
        <div
          className="relative backdrop-blur-xl bg-white/5 border border-white/10 
  rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
        >
          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 
    bg-clip-text text-transparent"
          >
            All Contacts
          </h1>

          {/* Total */}
          <h2 className="text-sm md:text-base text-gray-300">
            Total Contacts:{" "}
            <span className="text-cyan-400 font-semibold">
              {contacts.length}
            </span>
          </h2>
        </div>
      </div>

      {/* search & PDF */}
      <div className="flex flex-col md:flex-row gap-4 py-4">
        {/*  Search Box */}
        <div className="flex-1 relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-xl rounded-xl"></div>

          {/* Glass */}
          <div
            className="relative flex items-center gap-3 px-4 py-3 
    backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
          >
            <IoSearch className="text-cyan-400/40 text-lg" />

            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 📄 PDF Button */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-xl"></div>

          <button
            onClick={handlePDF}
            className="relative px-6 py-3 rounded-xl font-semibold text-white
      bg-gradient-to-r from-green-500/50 to-emerald-500 w-full
      hover:scale-105 active:scale-95 transition shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <HiOutlineDocumentArrowDown className="text-xl font-semibold" />
              Export PDF
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-2xl pointer-events-none"></div>

        {/*  Glass Layer */}
        {loading ? (
          // <div className="flex justify-center py-20">
          //   <span className="loading loading-bars loading-xl"></span>
          // </div>
          // ============================
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 bg-white/10 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : (
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
            <table className="table text-white">
              {/*  Head */}
              <thead>
                <tr className="text-gray-300 text-sm">
                  <th>No.</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              {/*  Body */}
              <tbody>
                {currentContacts.map((c, i) => (
                  <tr
                    key={c._id}
                    className="hover:bg-white/5 transition duration-200"
                  >
                    <th className="text-gray-400">{indexOfFirst + i + 1}</th>

                    {/* 👤 User */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="h-12 w-12 rounded-xl border border-cyan-400/40">
                            <img
                              src={
                                c.image || "https://i.ibb.co/2kR7b6d/user.png"
                              }
                              alt="user"
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-cyan-300">
                            {c.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {c.address}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-gray-300">{c.email}</td>

                    {/* Phone */}
                    <td className="text-gray-300">{c.phone}</td>

                    {/* Time */}
                    <td className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>

                    <td className="text-xs text-gray-400">
                      {new Date(c.updatedAt).toLocaleString()}
                    </td>

                    {/*  Actions */}
                    <td>
                      <div className="flex justify-center items-center gap-2">
                        {/*  View (ALL) */}
                        <button
                          onClick={() => handleViewDetails(c._id)}
                          className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 
      hover:text-black transition cursor-pointer"
                        >
                          <IoEye />
                        </button>

                        {/*  Edit (ONLY ADMIN) */}
                        {role === "admin" && (
                          <button
                            onClick={() => handleEdit(c._id)}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500 
        hover:text-black transition cursor-pointer"
                          >
                            <FaRegEdit />
                          </button>
                        )}

                        {/*  Add (ALL) */}
                        <button
                          onClick={() => setPage("Add Contact")}
                          className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500 
      hover:text-black transition cursor-pointer"
                        >
                          <MdAddToDrive />
                        </button>

                        {/*  Delete (ONLY ADMIN) */}
                        {role === "admin" && (
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 
        hover:text-black transition cursor-pointer"
                          >
                            <IoTrashOutline />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center mt-3">
        {/*  Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-xl pointer-events-none"></div>

        {/*  Glass Container */}
        <div
          className="relative flex items-center gap-2 px-4 py-2 
  backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
        >
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer
          ${
            currentPage === page
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
              : "text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal View-Details*/}
      <dialog id="view_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative overflow-hidden rounded-2xl p-0">
          {/*  Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl"></div>

          {/*  Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"></div>

          {/*  Content */}
          <div className="relative z-10 p-6 text-white">
            <h3 className="text-2xl font-bold text-center mb-5">
              Contact <span className="text-cyan-400">Details</span>
            </h3>

            {selectedContact && (
              <div className="text-center space-y-3">
                {/*  Profile Image */}
                <div className="flex justify-center">
                  <img
                    src={
                      selectedContact.image ||
                      "https://i.ibb.co/2kR7b6d/user.png"
                    }
                    alt="contact"
                    className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
                  />
                </div>

                {/*  Name */}
                <h2 className="text-xl font-semibold text-cyan-300">
                  {selectedContact.name}
                </h2>

                {/*  Info Grid */}
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-300 mt-3">
                  <p className="flex justify-center items-center gap-1">
                    <MdEmail className="text-sm" />
                    <span className="text-gray-400">Email:</span>{" "}
                    {selectedContact.email}
                  </p>
                  <p className="flex justify-center items-center gap-1">
                    <FaPhoneAlt className="text-sm" />
                    <span className="text-gray-400">Phone:</span>{" "}
                    {selectedContact.phone}
                  </p>
                  <p className="flex justify-center items-center gap-1">
                    <IoLocationSharp className="text-sm" />
                    <span className="text-gray-400">Address:</span>{" "}
                    {selectedContact.address}
                  </p>

                  {selectedContact.message && (
                    <p className="flex justify-center items-center gap-1">
                      <RiMessage3Fill className="text-sm" />
                      <span className="text-gray-400"> Message:</span>{" "}
                      {selectedContact.message}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-2 flex justify-center items-center gap-1">
                    <MdAccessTimeFilled className="text-xl" />
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/*  Close Button */}
            <div className="modal-action justify-center mt-6">
              <form method="dialog">
                <button
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
          hover:scale-105 active:scale-95 transition text-white font-semibold shadow-md cursor-pointer"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* Modal update */}
      <dialog id="edit_contact" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative overflow-hidden rounded-2xl p-0">
          {/* 🔥 Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-2xl"></div>

          {/* 💎 Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl"></div>

          {/* ✨ Content */}
          <div className="relative z-10 p-6 text-white">
            <h3 className="text-2xl font-bold text-center mb-5">
              Edit <span className="text-cyan-400">Contact</span>
            </h3>

            {editData && (
              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Name */}
                <input
                  name="name"
                  type="text"
                  value={editData.name || ""}
                  onChange={handleEditChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />

                {/* Email */}
                <input
                  name="email"
                  type="text"
                  value={editData.email || ""}
                  onChange={handleEditChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />

                {/* Phone */}
                <input
                  name="phone"
                  type="number"
                  value={editData.phone || ""}
                  onChange={handleEditChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />

                {/* Address */}
                <input
                  name="address"
                  type="text"
                  value={editData.address || ""}
                  onChange={handleEditChange}
                  placeholder="Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />

                {/* Message */}
                <textarea
                  name="message"
                  rows="3"
                  value={editData.message || ""}
                  onChange={handleEditChange}
                  placeholder="Edit your message..."
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
            focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg font-semibold text-white 
    bg-gradient-to-r from-cyan-500 to-blue-500 
    hover:scale-[1.03] active:scale-[0.97] transition shadow-lg cursor-pointer"
                  >
                    <p className="flex justify-center items-center gap-1">
                      <GrEdit className="text-xl" />
                      Update
                    </p>
                  </button>

                  {/* ✅ REMOVE form, use button */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("edit_contact").close()
                    }
                    className="flex-1 py-3 rounded-lg font-semibold text-white 
    bg-white/10 hover:bg-white/20 transition border border-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllContact;
