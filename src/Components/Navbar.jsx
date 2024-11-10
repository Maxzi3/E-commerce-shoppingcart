import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Cart from "../assets/icon-cart.svg";
import Avatar from "../assets/image-avatar.png";
import Menu from "../assets/icon-menu.svg";
import Switch from "./Switch";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalQuantity } = useContext(CartContext);
  const { darkMode } = useContext(CartContext);

  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const linkClass = ({ isActive }) =>
    isActive
      ? "mr-10 hover:text-gray-900 cursor-pointer dark:hover:text-orange-600 text-orange-600"
      : "mr-10 hover:text-gray-900 cursor-pointer dark:hover:text-orange-600";
  const linkClass2 = ({ isActive }) =>
    isActive
      ? "my-4 hover:text-gray-900 cursor-pointer dark:hover:text-orange-600 text-orange-600"
      : "my-4 hover:text-gray-900 cursor-pointer dark:hover:text-orange-600";

  return (
    <div>
      {/* Desktop View */}
      <header
        className={`${
          darkMode ? "dark bg-gray-800 text-white" : "bg-white text-black"
        } text-gray-600 body-font`}
      >
        <div className="hidden md:flex fixed bg-white dark:bg-black dark:text-white w-full flex-row items-center justify-between mx-auto p-8 text-gray-600 z-50 shadow-md">
          <nav className="text-base">
            <NavLink to="/" className="mr-20 font-bold text-3xl capitalize">
              Lizzy stores
            </NavLink>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="product" className={linkClass}>
              Product
            </NavLink>
            <NavLink to="contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>
          <div className="flex gap-10 ">
            <NavLink to="/cart" onClick={handleCart}>
              <img src={Cart} className="w-8" alt="" />
              {totalQuantity > 0 && (
                <span className="absolute top-7 right-28 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
            <Switch />
          </div>
        </div>
      </header>
      {/* Mobile View */}
      <header
        className={`${
          darkMode ? "dark bg-black text-white" : "bg-white text-black"
        } text-gray-600 body-font fixed top-0 left-0 shadow-md z-50  w-full`}
      >
        <div className="md:hidden flex flex-row justify-between w-11/12 h-full  mx-auto py-4 px-2 z-50">
          <button onClick={ToggleMenu} className="md:hidden z-50">
            <img src={Menu} alt="" className="w-7 cursor-pointer" />
            {totalQuantity > 0 && (
              <span className="absolute top-2 right-16 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>
          <NavLink to="/" className=" capitalize mr-4 font-bold text-2xl z-50">
            Lizzy stores
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/cart" onClick={handleCart}>
              <img src={Cart} className="w-8" alt="" />
            </NavLink>
            <Switch />
          </div>
        </div>
        <nav
          className={`bg-white dark:bg-black dark:text-white overflow-hidden w-2/3 h-screen absolute top-0 left-0 flex flex-col px-5 pt-20 pb-40 shadow-2xl text-2xl
            transition-transform duration-500 ease-in-out
            ${
              isOpen ? "transform translate-x-0" : "transform -translate-x-full"
            }
          `}
        >
          <NavLink to="/" onClick={ToggleMenu} className={linkClass2}>
            Home
          </NavLink>
          <NavLink to="product" onClick={ToggleMenu} className={linkClass2}>
            Product
          </NavLink>
          <NavLink to="contact" onClick={ToggleMenu} className={linkClass2}>
            Contact
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
