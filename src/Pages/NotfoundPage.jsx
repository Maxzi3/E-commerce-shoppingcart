import React,{useContext} from "react";
import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceSmile } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../Components/CartContext";
const NotfoundPage = () => {
  const { darkMode } = useContext(CartContext);
  return (
    <div
      className={`pt-20 h-screen ${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      }`}
    >
      <FaFaceFrown className=" text-8xl mx-auto  text-center text-red-600" />
      <h1 className="text-center my-10  text-5xl font-bold">404</h1>
      <p className="text-center text-xl mb-12">Page not found</p>
      <Link
        to="/"
        className="flex justify-center items-center gap-2  text-orange-600 animate-bounce hover:underline text-2xl"
      >
        {" "}
        <FaFaceSmile /> Return to home
      </Link>
    </div>
  );
};

export default NotfoundPage;
