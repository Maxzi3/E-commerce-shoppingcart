import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <>
        <Navbar />
        <div className="md:pt-24">
          <Outlet />
        </div>
        <Footer />
      </>
    </div>
  );
};

export default MainLayout;
