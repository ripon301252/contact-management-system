import {} from "react";

import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import { useState } from "react";
import SendContact from "./Pages/SendContact"
import AllContact from "./Pages/AllContact";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar setPage={setPage} page={page}></Navbar>
      <div>
        {page === "Home" && <Home />}
        {page === "Add Contact" && <SendContact></SendContact>}
        {page === "All Contact" && <AllContact />}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
