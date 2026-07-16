import React, { useState } from "react";
import { LuNotebookTabs } from "react-icons/lu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const btns = ["Home", "Add Contact", "Contact List"];

  const handleLog = () => {
    setOpen(!open);
  };
  return (
    <div className="bg-gray-800 py-3 px-5">
      <nav className="flex justify-between items-center">
        <div className="flex gap-1 items-center bg-cyan-800/20 p-2 rounded-sm cursor-pointer">
          <div>
            <LuNotebookTabs className="text-4xl text-cyan-400" />
          </div>
          <h2 className=" text-cyan-400 ">
            <p className="text-xs">
              <span className="mr-1">contact</span>
              <span>management</span>
            </p>
            <span className="text-lg -mt-2 block">s y s t e m</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          {btns.map((btn, i) => (
            <div key={i} className="bg-cyan-600/50 hover:bg-cyan-500/50 py-1 px-4 rounded-lg cursor-pointer">
              {btn}
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={handleLog}
            className="bg-cyan-600/50 hover:bg-cyan-500/50 py-2 px-5 rounded-lg cursor-pointer font-semibold"
          >
            {open ? "Log Out" : "Login"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
