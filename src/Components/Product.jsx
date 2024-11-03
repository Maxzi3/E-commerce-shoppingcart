import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const apiUrl = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data);
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

  const { id } = useParams();
  const ProductItem = data.find((product) => product.id === parseInt(id));

  // Check if ProductItem is defined
  if (!ProductItem) {
    return (
      <div>
        <Spinner loading={loading} />
      </div>
    );
  }
  return (
    <div className="p-4 border w-9/12 mx-auto bg rounded-md shadow-md">
      <img
        src={ProductItem.image || "https://dummyimage.com/721x401"}
        alt={ProductItem.title}
        className="w-9/12 mx-auto"
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-primary mb-2">
          {ProductItem.category}
        </h1>
        <h3 className="text-xl font-bold text-primary mb-2">
          {ProductItem.title}
        </h3>

        {/* Price Display */}
        <div className="flex flex-row justify-between">
          <span className="text-red-600 line-through">
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

        <p className="text-lg mt-2">{ProductItem.description}</p>
        <span className="flex items-center justify-between">
          <a
            href={ProductItem.sellerLink}
            target="_blank"
            className="bg-black hover:bg-blue-700 text-white font-bold py-3 px-4 rounded my-6 "
          >
            Add to cart
          </a>
        </span>
      </div>
    </div>
  );
};

export default Product;
