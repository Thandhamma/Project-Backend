import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Product from "./component/Product";
import Register from "./component/Register";
import Profile from "./component/Profile";
import ProtectedRoute from "./component/ProtectedRoute";
import ProductAdmin from "./component/Productadmin";
import Cart from "./component/Cart";
import AddProduct from "./component/add-product";
import ProductDetail from "./component/ProductDetail";
import CheckoutPage from "./component/Checkout";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/products" element={<ProductAdmin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
