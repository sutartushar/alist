import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <div className="flex items-center justify-around my-4">
      <Link to="/" className="font-bold text-2xl hover:text-blue-600 transition">
        ECommerce
      </Link>
      <Link to="/cart" className="font-semibold hover:text-blue-600 transition">
        Cart
      </Link>
    </div>
  );
};

export default NavBar;

