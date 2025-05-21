import React from "react";
import { useParams, useNavigate } from "react-router";
import { useProducts } from "../context/CartContex";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useProducts();

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500">Product not found.</p>
    );
  }

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      // Increase quantity if item already exists
      updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Add new item to cart
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart page
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain bg-gray-50 p-4 rounded-xl"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center text-yellow-500 text-sm mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    i < Math.round(product.rating.rate)
                      ? "currentColor"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.976 2.892a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.892a1 1 0 00-1.176 0l-3.976 2.892c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.072 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.519-4.674z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                ({product.rating.count} ratings)
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
