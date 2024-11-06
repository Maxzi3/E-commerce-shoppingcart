import React, { createContext, useState } from "react";
import { toast } from "react-toastify";


// Create a new context for the cart
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Function to add an item to the cart with the selected quantity
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find((item) => item.id === product.id);
      if (isProductInCart) {
         toast.info(`${product.title} quantity updated!`);
        // If product is already in cart, increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product to cart with the selected quantity
        toast.success(`${product.title} added to cart!`);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  // Function to update the quantity of a product directly from the cart
  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Context value to provide to consuming components
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
