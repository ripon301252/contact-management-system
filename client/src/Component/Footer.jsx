import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-5 py-8">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo / Title */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-cyan-400">
              Contact Management System
            </h2>
            <p className="text-sm text-gray-400">
              Manage your contacts easily & securely
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <p className="hover:text-cyan-400 cursor-pointer">Home</p>
            <p className="hover:text-cyan-400 cursor-pointer">Add Contact</p>
            <p className="hover:text-cyan-400 cursor-pointer">All Contact</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a href="https://www.facebook.com/profile.php?id=100089627922381" target="_blank"><FaFacebook className="hover:text-cyan-400 cursor-pointer" /></a>
            <a href="https://github.com/ripon301252" target="_blank"><FaGithub className="hover:text-cyan-400 cursor-pointer" /></a> 
            <a href="https://www.linkedin.com/in/mahfuzur-rahman-280471392/" target="_blank"><FaLinkedin className="hover:text-cyan-400 cursor-pointer" /></a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Contact Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;