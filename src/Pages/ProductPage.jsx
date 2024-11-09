import React, {useContext} from 'react'
import Product from '../Components/Product'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
import { CartContext } from "../Components/CartContext";
const ProductPage = () => {
   const { darkMode } = useContext(CartContext);  
    const navigate = useNavigate()
     const handleBack = () => {
       navigate("/product");
     };
  return (
    <div
      className={` ${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      }pt-10`}
    >
      <button
        onClick={handleBack}
        className="flex items-center p-4 text-secondary hover:text-orange-600"
      >
        <FaArrowLeft className="mx-2" />
        Back to Products
      </button>
      <div>
        <Product />
      </div>
    </div>
  );
}

export default ProductPage
