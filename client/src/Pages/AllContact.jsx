import React, { useEffect, useState } from "react";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Contacts</h2>
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
                  <button className="btn btn-ghost btn-xs">details</button>
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
