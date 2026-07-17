import React, { useEffect, useState } from "react";
import { IoEyeOffSharp, IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdAddToDrive } from "react-icons/md";
import Swal from "sweetalert2";
// import { Eye } from 'lucide-react/lu';

const AllContact = ({ contacts, setContacts, setPage }) => {
  const [selectedContact, setSelectedContact] = useState(null);

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
                timer: 1500,
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
              <th>Create At</th>
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
                <td>
                  <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="View Details"
                    >
                      <button
                        onClick={() => handleViewDetails(c._id)}
                        className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                      >
                        <IoEyeOffSharp className="text-lg" />
                      </button>
                    </div>
                    <div
                      className="relative overflow-visible tooltip tooltip-bottom"
                      data-tip="Edit contact"
                    >
                      <button
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

      {/* Modal */}
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
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-cyan-600/50 hover:bg-cyan-500/50">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllContact;
