import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Cart from "../assets/icon-cart.svg";
import Avatar from "../assets/image-avatar.png";
import Menu from "../assets/icon-menu.svg";
import Close from "../assets/icon-close.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      {/* Desktop View */}
      <header className="text-gray-600 body-font">
        <div className="hidden md:flex fixed bg-white w-full flex-row items-center justify-between mx-auto p-8 text-gray-600 z-50 shadow-md">
          <nav className="text-base">
            <NavLink to="/" className="mr-20 font-bold text-3xl">
              LIZZY STORES
            </NavLink>
            <NavLink to="/" className="mr-10 hover:text-gray-900 ">
              Home
            </NavLink>
            <NavLink to="product" className="mr-10 hover:text-gray-900">
              Product
            </NavLink>
            <NavLink to="contact" className="mr-10 hover:text-gray-900">
              Contact
            </NavLink>
          </nav>
          <div className="flex gap-10 ">
            <NavLink to="/cart" onClick={handleCart}>
              <img src={Cart} className="w-8" alt="" />
            </NavLink>
            <img src={Avatar} alt="" className="w-8" />
          </div>
        </div>
      </header>
      {/* Mobile View */}
      <header className="text-gray-600 body-font fixed w-full top-0 bg-white">
        <div className="md:hidden flex flex-row justify-between w-11/12 h-full  mx-auto py-4 px-2 z-50">
          <button onClick={ToggleMenu} className="md:hidden z-50">
            {!isOpen ? (
              <img src={Menu} alt="" className="w-7 cursor-pointer" />
            ) : (
              <img src={Close} alt="" className="w-7 cursor-pointer" />
            )}
          </button>
          <NavLink to="/" className="mr-4 font-bold text-2xl">
            LIZZY STORES
          </NavLink>
          <div className="flex gap-4">
            <NavLink to="/cart" onClick={handleCart}>
              <img src={Cart} className="w-8" alt="" />
            </NavLink>
            <img src={Avatar} alt="" className="w-8" />
          </div>
        </div>
        <nav
          className={`bg-white overflow-hidden w-1/2 max-h-auto absolute top-0 left-0 flex flex-col px-5 pt-20 pb-40 shadow-2xl text-2xl ${
            isOpen ? "transform translate-x-0" : "transform -translate-x-full"
          }`}
        >
          <NavLink
            to="/"
            onClick={ToggleMenu}
            className="my-4 hover:text-gray-900 cursor-pointer"
          >
            Home
          </NavLink>
          <NavLink
            to="product"
            onClick={ToggleMenu}
            className="my-4 hover:text-gray-900"
          >
            Product
          </NavLink>
          <NavLink
            to="contact"
            onClick={ToggleMenu}
            className="mt-4 mb-80 hover:text-gray-900"
          >
            Contact
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
