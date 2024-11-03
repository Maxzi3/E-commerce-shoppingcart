import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner.jsx";
const AllProduct = () => {
  const [allProduct, setAllProduct] = useState([]); // Full list of properties from API
  const [displayedProducts, setDisplayedProducts] = useState([]); // List of properties to be displayed
  const [remainingProducts, setRemainingProducts] = useState([]); // List of remaining properties to choose from
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search input
  const [Loading, setLoading] = useState(true);
   const [showFullDescription, setShowFullDescription] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); // Replace with your actual API endpoint
        const data = await response.json();
        setAllProduct(data); // Save the full list of products
        setDisplayedProducts(data.slice(0, 10)); // Display the first 10 products initially
        setRemainingProducts(data.slice(10)); // Store the remaining products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Filter the products based on the search term
    const filteredProducts = allProduct.filter((product) =>
      product.location.toLowerCase().includes(e.target.value.toLowerCase())
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

    // Update displayed properties
    setDisplayedProducts((prevDisplayed) => [
      ...prevDisplayed,
      ...additionalProducts,
    ]);

    // Remove the newly added products from the remaining list
    setRemainingProducts(shuffledRemaining.slice(5));
  };

  return (
    <div className="text-primary">
      {/* Search Bar */}
      {/* <div className="mb-4">
        <input
          className="border-2 p-2 w-11/12 "
          type="search"
          name="Search"
          placeholder="Search by location"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div> */}
      <Spinner loading={Loading} />
      <section>
        <div className="container px-5 py-24 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedProducts.map((product) => {
            const isFullDescriptionShown = showFullDescription[product.id];
            const description = isFullDescriptionShown
              ? product.description
              : product.description.slice(0, 122) + "...";

            return (
              <div key={product.id} className="flex flex-col md:flex-row -m-4">
                <div className="p-4 md:w-full">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                      className="md:h-56 w-10/12 mx-auto "
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
              className="bg-black text-white py-2 px-4 rounded hover:bg-secondary"
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
