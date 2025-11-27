// src/pages/Checkout.jsx
import React, { useState } from "react";

const Checkout = ({ cart, user, setCart }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user.name || "");
  const [mobile, setMobile] = useState(user.mobile || "");
  const [address, setAddress] = useState("");

  // Update quantity
  const handleQuantityChange = (id, value) => {
    const qty = Number(value);
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: qty < 1 ? 1 : qty } : item
      )
    );
  };

  // Remove item
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = subtotal >= 500 ? 0 : 50;
  const freeDeliverySavings = subtotal >= 500 ? 50 : 0;
  const totalAmount = subtotal + deliveryCharge;

  const handleProceed = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    setStep(2);
  };

  const handleCheckout = () => {
    if (!name || !mobile || !address) {
      alert("Please fill all delivery details before checkout.");
      return;
    }

    const itemsText = cart
      .map((item) => `${item.name} x ${item.qty} = ₹${item.price * item.qty}`)
      .join("\n");

    const message = `
New Order Received! 🛍️

👤 Customer Details
Name: ${name}
Mobile: ${mobile}
Address: ${address}

🧸 Order Items:
${itemsText}

💰 Subtotal: ₹${subtotal}
🚚 Delivery: ${deliveryCharge === 0 ? "FREE" : "₹50"}
🏷️ Total Amount: ₹${totalAmount}
    `;

    const whatsappLink = `https://wa.me/917092934160?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Checkout</h1>

      {/* ==========================  STEP 1: CART REVIEW  ========================== */}
      {step === 1 && (
        <>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              Your cart is empty.
            </p>
          ) : (
            <>
              {/* WRAPPER — LEFT CART + RIGHT SUMMARY */}
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* LEFT SIDE — CART ITEMS */}
                <div style={{ flex: "2", minWidth: "260px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(220px, 1fr))",
                      gap: "1.5rem",
                    }}
                  >
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "10px",
                          padding: "1rem",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "380px",
                          background: "#fff",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            margin: "0 auto",
                          }}
                        />

                        <div>
                          <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
                          <p>₹{item.price}</p>
                        </div>

                        <div style={{ marginTop: "10px" }}>
                          <label>
                            Quantity:{" "}
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                              style={{
                                width: "50px",
                                textAlign: "center",
                                padding: "3px",
                              }}
                            />
                          </label>

                          <p style={{ marginTop: "5px" }}>
                            Subtotal: ₹{item.price * item.qty}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "auto",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE — ORDER SUMMARY */}
                <div style={{ flex: "1", minWidth: "260px" }}>
                  <div
                    style={{
                      padding: "1.5rem",
                      borderRadius: "14px",
                      border: "1px solid #ddd",
                      background: "#ffffff",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                      position: "sticky",
                      top: "20px",
                    }}
                  >
                    <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
                      Order Summary
                    </h2>

                    <p style={{ fontSize: "1.1rem" }}>
                      <strong>No. of Items:</strong> {totalItems}
                    </p>

                    <p style={{ fontSize: "1.1rem" }}>
                      <strong>Subtotal:</strong> ₹{subtotal}
                    </p>

                    <p style={{ fontSize: "1.1rem" }}>
                      <strong>Delivery Charge:</strong>{" "}
                      {deliveryCharge === 0 ? (
                        <span style={{ color: "green" }}>FREE</span>
                      ) : (
                        "₹50"
                      )}
                    </p>

                    {freeDeliverySavings > 0 && (
                      <p style={{ color: "green", fontWeight: "600" }}>
                        Free Delivery Savings: -₹50
                      </p>
                    )}

                    {subtotal < 500 && (
                      <div
                        style={{
                          background: "#fff3cd",
                          padding: "10px",
                          borderRadius: "8px",
                          color: "orange",
                          marginTop: "10px",
                          marginBottom: "15px",
                        }}
                      >
                        Add items worth{" "}
                        <strong>₹{500 - subtotal}</strong> more to get{" "}
                        <strong>FREE Delivery!</strong>
                      </div>
                    )}

                    <h2
                      style={{
                        marginTop: "20px",
                        textAlign: "center",
                      }}
                    >
                      Total: ₹{totalAmount}
                    </h2>

                    <button
                      onClick={handleProceed}
                      style={{
                        marginTop: "1rem",
                        width: "100%",
                        padding: "0.8rem",
                        fontSize: "1rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Proceed to Delivery
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ==========================  STEP 2 — DELIVERY FORM  ========================== */}
      {step === 2 && (
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <h2>Delivery Details</h2>

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full delivery address"
            rows="3"
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          />

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <h2>Total: ₹{totalAmount}</h2>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.5rem",
                fontSize: "1rem",
                backgroundColor: "#25D366",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Checkout via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
