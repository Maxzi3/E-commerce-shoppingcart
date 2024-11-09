import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";

const Switch = () => {
  const { toggleDarkMode, darkMode } = useContext(CartContext);

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${
        darkMode ? "bg-white text-black" : "bg-black text-white"
      }`}
      onClick={toggleDarkMode}
    >
      {/* The toggle circle */}
      <div
        className={` shadow-md transform transition-transform duration-300 ease-in-out ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {darkMode ? <FaMoon className="" /> : <FaSun />}
      </div>
    </div>
  );
};

export default Switch;
