import React, { useState } from "react";

export default function ProductCard({ item, addToCart }) {
  const [showModal, setShowModal] = useState(false);

  if (!item) {
    return <div>Loading...</div>;
  }

  // ----- AUTO DISCOUNT CALCULATION -----
  const discount =
    item.mrp && item.mrp > item.price
      ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
      : 0;

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <>
      {/* ---------- PRODUCT CARD ---------- */}
      <div style={styles.card}>
        <img
          src={item.image}
          alt={item.name}
          style={styles.image}
          onClick={() => setShowModal(true)}
        />

        <h3 style={styles.name}>{item.name}</h3>

        {/* ---------- PRICE + MRP ---------- */}
        <div style={styles.priceBox}>
          <span style={styles.offerPrice}>₹{item.price}</span>

          {item.mrp && item.mrp > item.price && (
            <span style={styles.mrp}>₹{item.mrp}</span>
          )}
        </div>

        {/* ---------- DISCOUNT BADGE ---------- */}
        {discount > 0 && (
          <div style={styles.discountBadge}>{discount}% OFF</div>
        )}

        <button onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>

      {/* ---------- IMAGE MODAL ---------- */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={item.image} alt={item.name} style={styles.largeImage} />

            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- INLINE STYLES ---------- */
const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "14px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(17, 17, 17, 0.06)",
    transition: "0.2s",
  },

  image: {
    width: "100%",
    height: "200px",
    borderRadius: "10px",
    objectFit: "cover",
    cursor: "pointer",
  },

  name: { marginTop: "10px", fontSize: "18px", fontWeight: "600" },

  /* PRICE SECTION */
  priceBox: {
    marginTop: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  offerPrice: {
    color: "#ff4d6d",
    fontWeight: "700",
    fontSize: "18px",
  },

  mrp: {
    color: "#888",
    textDecoration: "line-through",
    fontSize: "15px",
  },

  discountBadge: {
    marginTop: "6px",
    background: "#ff4d6d",
    color: "#fff",
    padding: "4px 10px",
    fontSize: "14px",
    borderRadius: "6px",
    display: "inline-block",
    fontWeight: "600",
  },

  /* BUTTON */
  button: {
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#ff4d6d",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.3s",
  },

  /* MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modalContent: {
    position: "relative",
    background: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },

  largeImage: {
    width: "90vw",
    maxWidth: "500px",
    borderRadius: "10px",
  },

  closeBtn: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    background: "#ff4d6d",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    cursor: "pointer",
    fontSize: "18px",
  },
};
