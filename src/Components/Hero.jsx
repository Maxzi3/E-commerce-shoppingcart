import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between md:items-center bg-gray-500 text-white w-full md:h-screen h-auto py-20 bg-center bg-cover">
        <div>
          <h1 className="pt-10 pb-4 px-10 md:text-5xl text-2xl font-extrabold ">
            BEST OF THE BEST
          </h1>
          <h2 className="pb-10 px-10 md:text-xl text-base">
            THE DISCOUNT STORE
          </h2>
          <Link
            to="/product"
            className="bg-black hover:bg-orange-600 text-white font-bold py-3 px-4 rounded mx-10"
          >
            Buy Now
          </Link>
        </div>
        <div className="md:m-20 mx-auto mt-14 z-0 hidden md:block ">
          <h1
            className="relative md:w-56 w-56 md:h-56 h-56 bg-white text-black text-4xl uppercase rounded-full flex items-center justify-center z-10
               before:content-[''] before:absolute before:inset-0 before:bg-white/20 before:rounded-full hover:before:scale-150
               before:transition-transform before:duration-300"
          >
            Explore
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
