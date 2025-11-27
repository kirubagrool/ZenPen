import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo1 from "../images/logo1.png";
import new1 from "../images/new1.png"

export default function Home({ products, addToCart }) {
  const [addedIds, setAddedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const { user } = useContext(AuthContext);

  const handleAddToCart = (product) => {
    if (!user) return;

    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Banner */}
      {/* Banner */}
<div className="shop-banner">
  
  {/* Banner Background */}
  <div
    className="banner-image"
    style={{ backgroundImage: `url(${new1})` }}
  ></div>

  {/* Scrolling Text */}
  <div className="banner-scroll">
    <span>
      🎉 Welcome to My Shop – Best Deals Await! 🎁 | Fast Delivery | Premium Quality | Affordable Prices 🎉
    </span>
  </div>
</div>

{/* Login Warning */}
{!user && (
  <div className="login-warning">
    ⚠️ Please log in to add items to your cart.
  </div>
)}


      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories-container">
        {categories.map((c) => (
          <button
            key={c}
            className={`category-btn ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="products-container">
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <h2 className="no-result">No products found ❌</h2>
          ) : (
            filteredProducts.map((p) => {
              const isAdded = addedIds.includes(p.id);

              // ---- Auto Discount Calculation ----
              const discount =
                p.mrp && p.mrp > p.price
                  ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
                  : 0;

              return (
                <div key={p.id} className="product-card">
                  
                  {/* IMAGE MODAL TRIGGER */}
                  <img
                    src={p.image}
                    alt={p.name}
                    onClick={() => setModalImage(p.image)}
                    style={{ cursor: "pointer" }}
                  />

                  {/* NAME */}
                  <h3><strong>{p.name}</strong></h3>

                  {/* PRICE + MRP + DISCOUNT */}
                  <div className="price-section">

                    <span className="offer-price">₹{p.price}</span>

                    {p.mrp && p.mrp > p.price && (
                      <span className="mrp">₹{p.mrp}</span>
                    )}
                  </div>

                  {/* DISCOUNT BADGE */}
                  {discount > 0 && (
                    <div className="discount-badge">{discount}% OFF</div>
                  )}

                  {/* BUTTON */}
                  <button
                    className={`add-btn ${isAdded ? "added" : ""}`}
                    onClick={() => handleAddToCart(p)}
                    disabled={!user || isAdded}
                  >
                    {!user
                      ? "Login to Add"
                      : isAdded
                      ? "Added"
                      : "Add to Cart"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ---------- MODAL IMAGE VIEWER ---------- */}
      {modalImage && (
        <div
          style={styles.modalOverlay}
          onClick={() => setModalImage(null)}
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modalImage} alt="preview" style={styles.largeImage} />
            <button
              style={styles.closeBtn}
              onClick={() => setModalImage(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- INLINE MODAL STYLES ---------- */
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modalContent: {
    position: "relative",
    background: "#fff",
    padding: "10px",
    borderRadius: "12px",
  },

  largeImage: {
    width: "90vw",
    maxWidth: "420px",
    borderRadius: "12px",
  },

  closeBtn: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
    background: "#ff3b53",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },
};
