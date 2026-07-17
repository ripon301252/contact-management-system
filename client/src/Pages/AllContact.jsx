import React, { useEffect, useState } from "react";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/contacts")
      .then((res) => res.json())
      .then((api) => setContacts(api))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-7">
      <h1 className="text-3xl font-bold text-cyan-600/70">All Contacts</h1>
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
              <th>Actin</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={c._id}>
                <th>
                 {i + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={c.image}
                          alt={c.image}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-sm opacity-50">{c.address}</div>
                    </div>
                  </div>
                </td>
                <td>
                 {c.email}
                </td>
                <td>{c.phone}</td>
                <th>
                  <button className="btn btn-xs">View</button>
                  <button className="btn btn-xs mx-2">Add</button>
                  <button className="btn btn-xs mr-2">Edit</button>
                  <button className="btn btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContact;
