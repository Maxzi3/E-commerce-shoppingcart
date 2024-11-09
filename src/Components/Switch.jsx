import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Switch = () => {
  const { toggleDarkMode, darkMode } = useContext(CartContext);

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${
        darkMode ? "bg-blue-600" : "bg-gray-300"
      }`}
      onClick={toggleDarkMode}
    >
      {/* The toggle circle */}
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
