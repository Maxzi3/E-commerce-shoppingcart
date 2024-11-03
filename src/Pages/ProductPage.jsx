import React from 'react'
import Product from '../Components/Product'
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'
const ProductPage = () => {
    const navigate = useNavigate()
     const handleBack = () => {
       navigate("/product");
     };
  return (
    <div className="pt-24">
      <button onClick={handleBack} className="flex items-center p-4 text-secondary">
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
