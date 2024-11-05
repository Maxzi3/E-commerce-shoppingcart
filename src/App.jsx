import React from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/Homepage";
import ContactPage from "./Pages/ContactPage";
import AllProductPage from "./Pages/AllProductPage";
import Cart from "./Pages/Cart";
import Product from "./Pages/ProductPage";
import NotfoundPage from "./Pages/NotfoundPage";
import { CartProvider } from "./Components/CartContext";

const App = () => {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<AllProductPage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotfoundPage />} />
      </Route>
    )
  );

  return (
    <CartProvider>
      {" "}
      {/* Wrap the entire RouterProvider with CartProvider */}
      <RouterProvider router={Router} />
    </CartProvider>
  );
};

export default App;
