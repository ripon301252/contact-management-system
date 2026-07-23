import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ setPage }) => {
  return (
    <footer className="relative ">

      {/* 🔥 Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-2xl"></div>

      {/* 💎 Glass Container */}
      <div className="relative backdrop-blur-xl bg-white/5 border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 py-10">

          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            {/* 🧠 Title */}
            <div className="text-center md:text-left">
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 
              bg-clip-text text-transparent">
                Contact Management System
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Manage your contacts easily & securely
              </p>
            </div>

            {/* 🔗 Links */}
            <div className="flex gap-6 text-sm">

              {["Home", "Add Contact", "All Contact"].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setPage(item)}
                  className="text-gray-300 hover:text-cyan-400 transition"
                >
                  {item}
                </button>
              ))}

            </div>

            {/* 🌐 Social */}
            <div className="flex gap-4 text-xl">

              <a
                href="https://www.facebook.com/profile.php?id=100089627922381"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 transition hover:scale-110"
              >
                <FaFacebook />
              </a>

              <a
                href="https://github.com/ripon301252"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 transition hover:scale-110"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/mahfuzur-rahman-280471392/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 transition hover:scale-110"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-6"></div>

          {/* Bottom */}
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-medium">
              Contact Management System
            </span>{" "}
            . All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;