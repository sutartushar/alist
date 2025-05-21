import { Routes, Route } from "react-router";
import ProductCard from "./components/ProductCard";
import NavBar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage/>} />
      </Routes>
    </div>
  );
};

export default App;
