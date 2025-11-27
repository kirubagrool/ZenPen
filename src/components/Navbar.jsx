import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import logo1 from "../images/logo1.png";
export default function Navbar() {
  const { user, logout, cart } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="navbar">
      {/* <Link to="/" className="logo">
        Zen&Pen
      </Link> */}
      <img src={logo1} alt="Shop Logo" className="shop-logo" />

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/cart">Cart ({cart.length})</Link>
          </>
        )}
      </div>
    </nav>
  );
}
