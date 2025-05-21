import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // const [cart, setCart] = useState([]);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(`error: ${error}`);
      setError(error.message || `failed to fetch data`);
    }
    finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CartContext.Provider value={{ products, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useProducts = () => useContext(CartContext);
