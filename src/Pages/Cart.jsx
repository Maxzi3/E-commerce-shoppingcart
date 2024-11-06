import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { CartContext } from "../Components/CartContext";
import Minus from "../assets/icon-minus.svg";
import Plus from "../assets/icon-plus.svg";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);
const handleQuantityChange = (productId, quantity) => {
  if (quantity >= 1) {
    // Ensure quantity doesn't go below 1
    updateCartQuantity(productId, quantity);
  }
};
  return (
    <div className="h-auto">
      <h1 className="text-center font-bold text-3xl py-5 uppercase ">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-lg py-4 underline underline-offset-4 text-red-600 pb-24">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-10 pb-4 border-b-2"
            >
              <img className="w-24" src={item.image} alt={item.tittle} />
              <div>
                <h2 className=" text-xl mb-2">{item.title}</h2>
                <p className="mb-2">
                  Price: $
                  {item.price ? `${(item.price * 0.7).toFixed(2)}` : "$0.00"}
                </p>
                <p className="mb-2">Quantity: {item.quantity}</p>
                <p>
                  Total Price: $
                  {item.price ? `${((item.price * 0.7)* item.quantity).toFixed(2)}` : "$0.00"}
                </p>
                <div className="flex md:justify-normal justify-between md:gap-20 my-4   ">
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
          {cart.length > 0 && (
            <button className="bg-orange-600 text-white py-2 my-10 w-11/12 mx-auto">
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
