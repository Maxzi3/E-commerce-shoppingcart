import React, { useState, useEffect, useContext } from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";
import Cart from "../assets/icon-cart.svg";
import Minus from "../assets/icon-minus.svg";
import Plus from "../assets/icon-plus.svg";
import { CartContext } from "./CartContext.jsx";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const { addToCart,  darkMode } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const apiUrl = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data);
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.log(
          "There was an error fetching the data from the API:",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);
  // Function to handle increase
  const increase = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  // Function to handle decrease
  const decrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1), // Prevent going below 1
    }));
  };
  const { id } = useParams();
  const ProductItem = data.find(
    (ProductItem) => ProductItem.id === parseInt(id)
  );

  // Check if ProductItem is defined
  if (!ProductItem) {
    return (
      <div>
        <Spinner loading={loading} />
      </div>
    );
  }
  return (
    <div
      className={`${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      } border md:w-9/12 w-11/12 mx-auto bg rounded-md shadow-md  dark:border-orange-600`}
    >
      <img
        src={ProductItem.image || "https://dummyimage.com/721x401"}
        alt={ProductItem.title}
        className="w-7/12 mx-auto h-7/12 object-cover  rounded-md"
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary mb-2">
          {ProductItem.category}
        </h1>
        <h3 className="text-xl font-bold text-primary mb-2">
          {ProductItem.title}
        </h3>
        <p className="text-lg mt-2">{ProductItem.description}</p>
        {/* Price Display */}
        <div className="flex flex-row justify-between items-center my-4">
          <span className="text-red-600 line-through text-xl">
            ${ProductItem.price}
          </span>
          <div>
            <h1 className="text-xs text-green-800">30% off</h1>
            <span className="text-secondary font-bold text-4xl">
              {ProductItem.price
                ? `$${(ProductItem.price * 0.7).toFixed(2)}`
                : "$0.00"}
            </span>
          </div>
        </div>
        <span className="flex items-center justify-between">
          <div className="flex justify-between items-center gap-2 mx-auto md:p-4">
            <div className="flex items-center md:w-24 justify-between bg-gray-200 p-2 gap-4 rounded-md">
              <img
                onClick={() => decrease(ProductItem.id)}
                src={Minus}
                alt="icon"
                className="w-3 h-1 cursor-pointer"
              />
              <h1 className="dark:text-black">
                {quantities[ProductItem.id] || 1}
              </h1>
              <img
                onClick={() => increase(ProductItem.id)}
                src={Plus}
                alt="icon"
                className="w-3 cursor-pointer"
              />
            </div>
            <button
              onClick={() =>
                addToCart(ProductItem, quantities[ProductItem.id] || 1)
              }
              className="flex justify-center items-center  gap-2 bg-gray-200 hover:bg-orange-500 text-black py-2 px-5 rounded-md "
            >
              <img src={Cart} alt="icon" className="w-4" />
              Add to cart
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Product;
