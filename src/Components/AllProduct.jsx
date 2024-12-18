import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import Cart from "../assets/icon-cart.svg";
import Minus from "../assets/icon-minus.svg";
import Plus from "../assets/icon-plus.svg";
import { CartContext } from "./CartContext.jsx";
import { FaStar } from "react-icons/fa6";

const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]); // Full list of properties from API
  const [displayedProducts, setDisplayedProducts] = useState([]); // List of properties to be displayed
  const [remainingProducts, setRemainingProducts] = useState([]); // List of remaining properties to choose from
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search input
  const [Loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState({});
  const { addToCart, darkMode} = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // Replace with your actual API endpoint
        const data = await response.json();
        setAllProduct(data); // Save the full list of products
        console.log(data)
        setDisplayedProducts(data.slice(0, 10)); // Display the first 10 products initially
        setRemainingProducts(data.slice(10)); // Store the remaining products
        // Initialize quantities for each product ID after fetching data
        const initialQuantities = data.reduce((acc, product) => {
          acc[product.id] = 1; // Start each product quantity at 1
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    // Filter the products based on the search term
    const filteredProducts = allProduct.filter((product) =>
      product.category.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // Update displayed products with filtered ones
    setDisplayedProducts(filteredProducts.slice(0, 10));
    setRemainingProducts(filteredProducts.slice(10));
  };
  const loadMoreProducts = () => {
    if (remainingProducts.length === 0) return; // If no remaining products, do nothing

    // Shuffle remaining products to ensure randomness
    const shuffledRemaining = [...remainingProducts];
    for (let i = shuffledRemaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRemaining[i], shuffledRemaining[j]] = [
        shuffledRemaining[j],
        shuffledRemaining[i],
      ];
    }

    // Get the next 5 random products
    const additionalProducts = shuffledRemaining.slice(0, 5);

    // Update displayed products
    setDisplayedProducts((prevDisplayed) => [
      ...prevDisplayed,
      ...additionalProducts,
    ]);

    // Remove the newly added products from the remaining list
    setRemainingProducts(shuffledRemaining.slice(5));
  };
  // Function to handle increase
  const increase = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1, // Default to 1 if undefined
    }));
  };

  // Function to handle decrease
  const decrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) - 1), // Default to 1 if undefined
    }));
  };

  return (
    <div className={` ${
          darkMode ? "dark bg-black text-white" : "bg-white text-black" }text-primary h-auto pt-10 dark:bg-black`}>
      {/* Search Bar */}
      <div className="md:mt-4">
        <input
          className="border-2 p-2 w-10/12 md:mx-12 mx-8 outline-none dark:border-orange-600 "
          type="search"
          name="Search"
          placeholder="Search by Category"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Spinner loading={Loading} />
      <section>
        <div className=" px-5 py-24 mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {displayedProducts.map((product) => {
            const isFullDescriptionShown = showFullDescription[product.id];
            const description = isFullDescriptionShown
              ? product.description
              : product.description.slice(0, 122) + "...";

            return (
              <div
                key={product.id}
                className="flex flex-col md:flex-row -m-4 dark:text-white"
              >
                <div className="p-4 md:w-full">
                  <div className="h-auto border-2 border-gray-200 dark:border-orange-600 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="md:h-56 h-56 w-full mx-auto "
                      src={product.image}
                      alt={product.title}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-secondary mb-1">
                        {product.category}
                      </h2>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-lg font-medium mb-3 hover:underline hover:text-blue-700"
                      >
                        {product.title}
                      </Link>
                      {/* <p className="leading-relaxed mb-3">{description}</p>
                      <button
                        onClick={() => toggleDescription(product.id)}
                        className="text-secondary text-sm text-green-900  hover:text-gray-900"
                      >
                        {isFullDescriptionShown ? "Less" : "More"}
                      </button> */}
                      <div className="flex flex-row justify-between items-center">
                        <p className="leading-relaxed mb-3 flex items-center gap-1">
                          <FaStar />
                          <span>{product.rating.rate}</span>
                        </p>
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
                      <div className="flex justify-between items-center mt-10">
                        <div className="flex items-center md:w-24 justify-between bg-gray-200 p-2 gap-4 rounded-md">
                          <img
                            onClick={() => decrease(product.id)}
                            src={Minus}
                            alt="icon"
                            className="w-3 h-1 cursor-pointer"
                          />
                          <h1 className="dark:text-black">
                            {quantities[product.id] || 1}
                          </h1>
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
                          className="flex justify-center items-center gap-2 bg-gray-200 hover:bg-orange-500 text-black py-2 px-5 rounded-md"
                        >
                          <img src={Cart} alt="icon" className=" w-4" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {remainingProducts.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreProducts}
              className="bg-black dark:bg-white dark:text-black hover:bg-orange-600 text-white py-2 px-4  rounded hover:bg-secondary"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllProduct;
