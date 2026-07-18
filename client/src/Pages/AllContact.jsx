import React, { useEffect, useState } from "react";
import { IoEye, IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdAddToDrive } from "react-icons/md";
import Swal from "sweetalert2";

const AllContact = ({ contacts, setContacts, setPage }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [editData, setEditData] = useState({});

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

    // ❌ No change hole API call bondho
    if (changedFields.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "No changes",
        showConfirmButton: false,
        timer: 2200,
        text: "You didn't update anything ",
      });
      return;
    }

    fetch(`/contacts/${selectedContact._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
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
          position: "top-end",
          icon: "success",
          html: message, // 🔥 use html for color
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
  };

  const handleEdit = (id) => {
    const contact = contacts.find((c) => c._id === id);
    setSelectedContact(contact);
    setEditData(contact);

    document.getElementById("edit_contact").showModal();
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
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
        fetch(`/contacts/${id}`, {
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

  useEffect(() => {
    fetch("/contacts")
      .then((res) => res.json())
      .then((api) => setContacts(api))
      .catch((err) => console.error(err));
  }, [setContacts]);

  return (
    <div className="max-w-7xl mx-auto px-7 py-16">
      <h1 className="text-4xl font-bold text-cyan-600/70">All Contacts</h1>
      <h2 className="text-cyan-500/50">Total Contacts : {contacts.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Create Time</th>
              <th>Update Time</th>
              <th>Actin</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={c._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={c.image} alt={c.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-sm opacity-50">{c.address}</div>
                    </div>
                  </div>
                </td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>{new Date(c.updatedAt).toLocaleString()} </td>
                <td>
                  <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="View Details"
                    >
                      <button
                        onClick={() => handleViewDetails(c._id)}
                        className="btn btn-outline btn-square text-cyan-500 hover:bg-cyan-500 hover:text-black"
                      >
                        <IoEye className="text-lg" />
                      </button>
                    </div>
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Edit contact"
                    >
                      <button
                        onClick={() => handleEdit(c._id)}
                        className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                        title="Edit Contact"
                      >
                        <FaRegEdit className="text-lg" />
                      </button>
                    </div>
                    <div
                      onClick={() => setPage("Add Contact")}
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Add Contact"
                    >
                      <button
                        className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black"
                        title="Add Contact"
                      >
                        <MdAddToDrive className="text-lg" />
                      </button>
                    </div>
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Delete"
                    >
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                        title="Delete"
                      >
                        <IoTrashOutline className="text-lg" />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal View-Details*/}
      <dialog id="view_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-800 text-white">
          <h3 className="font-bold text-3xl text-center text-cyan-400 mb-3">
            Contact Details
          </h3>

          {selectedContact && (
            <div className="space-y-2">
              <img
                src={selectedContact.image}
                alt="contact"
                className="w-48 h-48 rounded-full mx-auto"
              />

              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedContact.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedContact.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedContact.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedContact.address}
              </p>
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {selectedContact.message}
              </p>
              <p className="text-sm text-gray-400">
                Created: {new Date(selectedContact.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-cyan-600/50 hover:bg-cyan-500/50">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal update */}
      <dialog id="edit_contact" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-800 text-white">
          <h3 className="font-bold text-cyan-500/50 text-3xl mb-3">
            Edit Contact
          </h3>

          {editData && (
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                name="name"
                type="text"
                value={editData.name || ""}
                onChange={handleEditChange}
                placeholder="Name"
                className="input input-bordered w-full bg-gray-900"
              />

              <input
                name="email"
                type="text"
                value={editData.email || ""}
                onChange={handleEditChange}
                placeholder="Email"
                className="input input-bordered w-full bg-gray-900"
              />

              <input
                name="phone"
                type="number"
                value={editData.phone || ""}
                onChange={handleEditChange}
                placeholder="phone"
                className="input input-bordered w-full bg-gray-900"
              />

              <input
                name="address"
                type="text"
                value={editData.address || ""}
                onChange={handleEditChange}
                placeholder="Address"
                className="input input-bordered w-full bg-gray-900"
              />

              <textarea
                name="message"
                type="text"
                cols="10"
                rows="5"
                value={editData.message || ""}
                onChange={handleEditChange}
                placeholder="Edit Your Message"
                className="textarea textarea-bordered w-full bg-gray-900 border-gray-700 focus:border-cyan-400"
              />

              <button className="btn bg-cyan-600 w-full mt-3">Update</button>
            </form>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="w-full btn bg-cyan-500/50">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllContact;
