import React, { useEffect, useState, useContext } from "react";
import Spinner from "./Spinner.jsx";
import Cart from "../assets/icon-cart.svg";
import Minus from "../assets/icon-minus.svg";
import Plus from "../assets/icon-plus.svg";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext.jsx";

const Section1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);
  

  useEffect(() => {
    const fetchProduct = async () => {
      const apiUrl = "https://fakestoreapi.com/products";
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Use Fisher-Yates to shuffle the data array
        const shuffledData = [...data];
        for (let i = shuffledData.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledData[i], shuffledData[j]] = [
            shuffledData[j],
            shuffledData[i],
          ];
        }

        // Filter to select only properties with even IDs
        const evenProduct = shuffledData.filter(
          (product) => parseInt(product.id) % 2 === 0
        );

        // Select the first 3 items after filtering
        const randomProduct = evenProduct.slice(0, 3);
        setData(randomProduct);
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
      }
      setLoading(false);
    };
    fetchProduct();
  }, []);

  // Toggle the description for each product
  const toggleDescription = (id) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
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
  return (
    <div>
      <section className="text-primary body-font">
        <h1 className="text-center text-2xl pt-20 underline underline-offset-8">
          Featured Product
        </h1>
        <Spinner loading={loading} />
        <div className="container px-5 py-24 mx-auto grid grid-cols-1 md:gap-2 gap-10 md:grid-cols-3 md:w-11/12">
          {data.map((product) => {
            const isFullDescriptionShown = showFullDescription[product.id];
            const description = isFullDescriptionShown
              ? product.description
              : product.description.slice(0, 122) + "...";

            return (
              <div key={product.id} className="flex flex-col md:flex-row -mx-4">
                <div className="p-4 md:w-full">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="md:h-56 md:w-10/12 w-7/12 mx-auto "
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-secondary mb-1">
                        {product.category}
                      </h2>
                      <h1 className="text-lg font-medium mb-3">
                        {product.title}
                      </h1>
                      <p className="leading-relaxed mb-3">{description}</p>
                      <button
                        onClick={() => toggleDescription(product.id)}
                        className="text-secondary text-sm text-green-900  hover:text-gray-900"
                      >
                        {isFullDescriptionShown ? "Less" : "More"}
                      </button>
                      <div className="flex flex-row justify-between items-center">
                        <Link
                          to={`/product/${product.id}`}
                          className="hover:text-indigo-500"
                        >
                          Learn More
                        </Link>
                        <div className="flex flex-col gap-2">
                          <span className="text-red-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 line-through">
                            ${product.price}
                          </span>
                          <div>
                            <h1 className="text-xs text-green-800">30% off</h1>
                            <span className="text-secondary font-bold inline-flex items-center leading-none text-xl">
                              {product.price
                                ? `$${(product.price * 0.7).toFixed(2)}`
                                : "$0.00"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4">
                      <div className="flex items-center md:w-24 justify-between bg-gray-200 p-2 gap-4 rounded-md">
                        <img
                          onClick={() => decrease(product.id)}
                          src={Minus}
                          alt="icon"
                          className="w-3 h-1 cursor-pointer"
                        />
                        <h1>{quantities[product.id] || 1}</h1>
                        <img
                          onClick={() => increase(product.id)}
                          src={Plus}
                          alt="icon"
                          className="w-3 cursor-pointer"
                        />
                      </div>
                      <button
                        onClick={() =>
                          addToCart(product, quantities[product.id] || 1)
                        }
                        className="flex justify-center items-center  gap-2 bg-black/50 text-white py-2 px-5 rounded-md "
                      >
                        <img src={Cart} alt="icon" className="w-4" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          to="/product"
          className="bg-black text-white py-2 px-1 rounded hover:bg-secondary flex justify-center w-32 mx-auto"
        >
          Load More
        </Link>
      </section>
    </div>
  );
};

export default Section1;
