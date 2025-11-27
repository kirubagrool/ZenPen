// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import products from "./data/products";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, logout, cart, setCart } = useContext(AuthContext);

  // Add product to cart
  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);
    if (exists) {
      setCart(cart.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  return (
    <>
      <Navbar
        cartCount={cart.reduce((t, i) => t + i.qty, 0)}
        logout={logout}
      />

      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout cart={cart} user={user} setCart={setCart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
