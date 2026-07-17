import {} from "react";

import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import { useState } from "react";
import AllContact from "./Pages/AllContact";
import AddContact from "./Pages/AddContact";

function App() {
  const [page, setPage] = useState("Home");
  const [contacts, setContacts] = useState([]);

  return (
    <>
      <Navbar setPage={setPage} page={page} />
      <div>
        {page === "Home" && <Home page={page} setPage={setPage} contacts={contacts} />}
        {page === "Add Contact" && <AddContact setContacts={setContacts} />}
        {page === "All Contact" && <AllContact contacts={contacts} setContacts={setContacts} setPage={setPage} />}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
