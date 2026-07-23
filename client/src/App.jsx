import { useEffect } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import { useState } from "react";
import AllContact from "./Pages/AllContact";
import AddContact from "./Pages/AddContact";
import Swal from "sweetalert2";

function App() {
  const [page, setPage] = useState("Home");
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch("https://contact-server-zs3l.onrender.com/contacts")
  //     .then((res) => res.json())
  //     .then((data) => setContacts(data))
  //     .catch(console.error)
  //     .finally(() => setLoading(false));
  // }, []);


  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://contact-server-zs3l.onrender.com/contacts",
        );
        const data = await res.json();

        // ✅ শুধু একবার setLoading(false)
        setTimeout(() => {
          setContacts(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  // const handleAdmin = async () => {
  //   const { value: password } = await Swal.fire({
  //     title: "Admin Login 🔐",
  //     input: "password",
  //     inputLabel: "Enter Admin Password",
  //     inputPlaceholder: "Type password here...",
  //     showCancelButton: true,
  //   });

  //   if (!password) return;

  //   if (password === "12345") {
  //     setRole("admin");
  //     localStorage.setItem("role", "admin");

  //     Swal.fire("Success ✅", "You are now Admin 😎", "success");
  //   } else {
  //     Swal.fire("Error ❌", "Wrong Password", "error");
  //   }
  // };

  const handleAdmin = async () => {
    const { value: password } = await Swal.fire({
      title: "Admin Login",

      input: "password",
      inputLabel: "Enter Admin Password",
      inputPlaceholder: "Type password here...",

      showCancelButton: true,
      confirmButtonText: "Login ",
      cancelButtonText: "Cancel",

      //  Glass Background
      background: "rgba(15, 23, 42, 0.6)",
      backdrop: `
      rgba(0,0,0,0.7)
      backdrop-filter: blur(8px)
    `,

      //  Custom Classes
      customClass: {
        popup:
          "rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)]",
        title: "text-white text-2xl font-bold",
        input:
          "bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-cyan-400 rounded-lg px-3 py-2",
        confirmButton:
          "bg-gradient-to-r from-cyan-500/50 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition",
        cancelButton:
          "bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/40 transition",
      },
    });

    if (!password) return;

    if (password === import.meta.env.VITE_ADMIN_PASS) {
      setRole("admin");
      localStorage.setItem("role", "admin");

      Swal.fire({
        title: "Welcome Admin ",
        text: "Access Granted",
        icon: "success",
        background: "rgba(15, 23, 42, 0.6)",
        backdrop: `rgba(0,0,0,0.7) backdrop-filter: blur(8px)`,
        customClass: {
          popup:
            "rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] text-white",
        },
      });
    } else {
      Swal.fire({
        title: "Access Denied ",
        text: "Wrong Password",
        icon: "error",
        background: "rgba(15, 23, 42, 0.6)",
        backdrop: `rgba(0,0,0,0.7) backdrop-filter: blur(8px)`,
        customClass: {
          popup:
            "rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.25)] text-white",
        },
      });
    }
  };

 
  return (
    <>
      <Navbar setPage={setPage} page={page} handleAdmin={handleAdmin} />
      <div>
        {page === "Home" && (
          <Home
            page={page}
            setPage={setPage}
            contacts={contacts}
            setEditId={setEditId}
            setContacts={setContacts}
            loading={loading}
          />
        )}

        {page === "Add Contact" && <AddContact setContacts={setContacts} />}

        {page === "All Contact" && (
          <AllContact
            contacts={contacts}
            setContacts={setContacts}
            editId={editId}
            setEditId={setEditId}
            role={role}
            loading={loading}
            setPage={setPage}
          />
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
