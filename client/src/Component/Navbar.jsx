import React, { useState } from "react";
import { LuNotebookTabs } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ page, setPage }) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const btns = ["Home", "Add Contact", "All Contact"];

  const handleLog = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-gray-800 py-3 px-4 md:px-10 sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">

        {/* 🔷 Logo */}
        <div
          onClick={() => setPage("Home")}
          className="flex gap-1 items-center bg-cyan-800/20 p-2 rounded cursor-pointer"
        >
          <LuNotebookTabs className="text-3xl md:text-4xl text-cyan-400" />

          <h2 className="text-cyan-400 leading-tight">
            <p className="text-[10px] md:text-xs">
              <span className="mr-1">contact</span>
              <span>management</span>
            </p>
            <span className="text-sm md:text-lg block -mt-1">
              s y s t e m
            </span>
          </h2>
        </div>

        {/* 🖥️ Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {btns.map((btn, i) => (
            <div
              key={i}
              onClick={() => setPage(btn)}
              className={`py-1 px-4 rounded-lg cursor-pointer font-semibold transition ${
                page === btn
                  ? "bg-cyan-800/50 text-white"
                  : "text-cyan-400/70 hover:text-white"
              }`}
            >
              {btn}
            </div>
          ))}
        </div>

        {/* 🔐 Desktop Button */}
        <div className="hidden md:block">
          <button
            onClick={handleLog}
            className="bg-cyan-600/50 hover:bg-cyan-500/50 py-2 px-5 rounded-lg cursor-pointer font-semibold transition"
          >
            {open ? "Log Out" : "Login"}
          </button>
        </div>

        {/* 📱 Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="text-3xl text-cyan-400" />
            ) : (
              <HiMenu className="text-3xl text-cyan-400" />
            )}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-gray-900 rounded-xl p-4 space-y-3 text-center">
          
          {btns.map((btn, i) => (
            <div
              key={i}
              onClick={() => {
                setPage(btn);
                setMenuOpen(false);
              }}
              className={`py-2 rounded-lg cursor-pointer font-semibold ${
                page === btn
                  ? "bg-cyan-800/50 text-white"
                  : "text-cyan-400/70"
              }`}
            >
              {btn}
            </div>
          ))}

          <button
            onClick={handleLog}
            className="w-full bg-cyan-600/50 hover:bg-cyan-500/50 py-2 px-5 rounded-lg font-semibold"
          >
            {open ? "Log Out" : "Login"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;