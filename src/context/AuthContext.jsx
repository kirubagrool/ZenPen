// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged-in user
  const [cart, setCart] = useState([]);   // user cart

  // Get cart key for localStorage
  const getCartKey = () => (user ? `cart_${user.email}` : "cart_guest");

  // Load cart from localStorage whenever user changes
  useEffect(() => {
    const saved = localStorage.getItem(getCartKey());
    setCart(saved ? JSON.parse(saved) : []);
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
  }, [cart, user]);

  // Login function
  const login = (email, name, mobile) => {
    const loggedUser = { email, name, mobile };
    setUser(loggedUser);
    setCart([]); // clear cart on new login
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setCart([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, cart, setCart }}
    >
      {children}
    </AuthContext.Provider>
  );
};
