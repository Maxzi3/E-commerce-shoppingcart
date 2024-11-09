import React,{useContext} from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";
import { CartContext } from "./CartContext";

const Footer = () => {
   const { darkMode } = useContext(CartContext);
  return (
    <div>
      <footer
        className={`${
          darkMode ? "dark bg-black text-white" : "bg-white text-black"
        }body-font`}
      >
        <div className="container px-5 pt-24 pb-4 mx-auto flex flex-col ">
          <a
            to="/"
            className="flex flex-col w-20 font-medium items-center ml-3 text-sm dark:text-white hover:text-orange-800 pt-10 pb-2"
          >
            <span className="text-xl text-primary">LIZZY</span>{" "}
            <span className="border-t-2 text-primary border-gray-500 dark:border-white hover:border-white">
              STORES
            </span>
          </a>
          <p className="mt-2 text-xs md:text-sm md:w-full w-64 text-gray-500">
            &copy; 2024 LIZZY STORES.CO All rights reserved.
          </p>
        </div>
        <div className="bg-gray-500 text-white/80 dark:bg-white dark:text-black">
          <div className="container mx-auto py-4 px-5 flex flex-row justify-between items-center">
            <a
              href="https://wa.me/234902657211"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-gray-800 text-sm font-bold text-white dark:text-black"
            >
              LIZZY-STORES
            </a>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start text-white dark:text-black">
              <FaFacebookF className="ml-3" />
              <FaTwitter className="ml-3" />
              <FaInstagram className="ml-3" />
              <FaGithub className="ml-3" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
