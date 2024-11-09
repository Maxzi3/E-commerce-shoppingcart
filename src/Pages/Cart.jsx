import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { CartContext } from "../Components/CartContext";
import Minus from "../assets/icon-minus.svg";
import Plus from "../assets/icon-plus.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, totalPrice, darkMode } =
    useContext(CartContext);
  const handleQuantityChange = (productId, quantity) => {
    if (quantity >= 1) {
      // Ensure quantity doesn't go below 1
      updateCartQuantity(productId, quantity);
    }
  };
  return (
    <div
      className={` ${
        darkMode ? "dark bg-black text-white" : "bg-white text-black"
      } md:h-auto m-h-auto`}
    >
      <h1 className="text-center font-bold text-3xl py-10  uppercase">
        Your Cart
      </h1>
      {cart.length === 0 ? (
        <Link to='/product' className="flex justify-center cursor-pointer hover:text-blue-600 text-lg py-4 underline underline-offset-4 text-red-600 pb-24">
          Your cart is empty.
        </Link>
      ) : (
        <div className="flex md:flex-row flex-col md:justify-around gap-10 md:items-start mx-auto">
          <div className="flex flex-col pl-4 gap-2 bg-white dark:bg-black rounded-md shadow-md md:pt-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-10 pb-4 border-b-2 dark:border-b-orange-600"
              >
                <img
                  className="md:w-32 w-32 md:h-32"
                  src={item.image}
                  alt={item.tittle}
                />
                <div>
                  <h2 className="md:text-xl mb-2">{item.title}</h2>
                  <p className="mb-2">
                    Price: $
                    {item.price ? `${(item.price * 0.7).toFixed(2)}` : "$0.00"}
                  </p>
                  <p className="mb-2">Quantity: {item.quantity}</p>
                  <p>
                    Total Price: $
                    {item.price
                      ? `${(item.price * 0.7 * item.quantity).toFixed(2)}`
                      : "$0.00"}
                  </p>
                  <div className="flex md:justify-normal justify-between md:gap-20 my-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-red-600"
                    >
                      Delete
                      <FaTrash className="md:text-lg text-xl text-red-600" />
                    </button>
                    <div className="flex items-center md:w-24 justify-between bg-gray-200 p-2 gap-10 rounded-md ">
                      <img
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        src={Minus}
                        alt="icon"
                        className="w-3 h-1 cursor-pointer"
                      />
                      <img
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        src={Plus}
                        alt="icon"
                        className="w-3 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-2 bg-white dark:text-black shadow-md rounded-lg md:w-56 w-11/12 mx-auto">
            <h3 className="font-bold flex justify-between py-4">
              SubTotal: <span>${totalPrice.toFixed(2)}</span>
            </h3>
            {cart.length > 0 && (
              <button className="bg-orange-600 text-white rounded-md my-4 py-1 w-full">
                Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
