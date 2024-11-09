import React,{useContext} from "react";
import Hero from "../Components/Hero";
import Section1 from "../Components/Section1";
import { CartContext } from "../Components/CartContext";

const Homepage = () => {
   const { darkMode } = useContext(CartContext);
  return (
    <div
      className={` ${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Hero />
      <Section1 />
    </div>
  );
};

export default Homepage;
