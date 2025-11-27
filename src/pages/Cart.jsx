import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            {/* FIXED IMAGE DISPLAY */}
            <img
              src={item.images ? item.images[0] : item.image}
              className="cart-img"
              alt={item.name}
            />

            <div className="cart-info">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>

              <div className="qty-controls">
                <button className="qty-btn" onClick={() => decrease(item.id)}>
                  -
                </button>
                <span className="qty-value">{item.qty}</span>
                <button className="qty-btn" onClick={() => increase(item.id)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="cart-footer">
          <h2>Total: ₹{total}</h2>
          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}
