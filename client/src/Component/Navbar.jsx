import React, { useState } from "react";
import { LuNotebookTabs } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ page, setPage, handleAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const btns = ["Home", "Add Contact", "All Contact"];

  return (
    <div className="sticky top-0 z-50">
      {/* 🔥 Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-xl pointer-events-none"></div>

      {/* 💎 Glass Navbar */}
      <nav className="relative backdrop-blur-xl bg-white/5 border-b border-white/10 px-4 md:px-10 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* 🔷 Logo */}
          <div
            onClick={() => setPage("Home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <LuNotebookTabs className="text-3xl text-cyan-400 group-hover:rotate-6 transition pointer-events-none" />

            <h2 className="leading-tight">
              <span className="block text-[10px] text-gray-400 tracking-wide">
                contact management
              </span>
              <span className="text-sm md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SYSTEM
              </span>
            </h2>
          </div>

          {/* 🖥️ Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {btns.map((btn, i) => (
              <button
                key={i}
                onClick={() => setPage(btn)}
                className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
                  page === btn
                    ? "bg-gradient-to-r from-cyan-500/50 to-blue-500/50 text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* 🔐 Desktop Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleAdmin()}
              className="px-5 py-2 rounded-lg font-semibold text-white
              bg-gradient-to-r from-cyan-500/50 to-blue-500/50
              hover:scale-105 active:scale-95 transition shadow-md cursor-pointer"
            >
              Admin
            </button>
          </div>

          {/* 📱 Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => {
                console.log("clicked");
                setMenuOpen((prev) => !prev);
              }}
            >
              {menuOpen ? (
                <HiX className="text-3xl text-cyan-400" />
              ) : (
                <HiMenu className="text-3xl text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* 📱 Mobile Dropdown */}
        {menuOpen && (
          <div className="mt-4 md:hidden rounded-xl overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none"></div>

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 text-center">
              {btns.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(btn);
                    setMenuOpen(false);
                  }}
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    page === btn
                      ? "bg-cyan-500/20 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {btn}
                </button>
              ))}

               <button
              onClick={() => handleAdmin()}
              className="w-full px-5 py-2 rounded-lg font-semibold text-white
              bg-gradient-to-r from-cyan-500/50 to-blue-500/50
              hover:scale-105 active:scale-95 transition shadow-md cursor-pointer"
            >
              Admin
            </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
