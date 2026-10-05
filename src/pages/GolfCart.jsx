import React from "react";
import { Link } from "react-router-dom";

const GolfCart = () => {
  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
            {/* Premium Hero Section */}
      <div className="premium-product-hero">
        <div className="hero-particles"></div>
        <div className="premium-hero-container">
          <div className="premium-hero-text">
            <span className="premium-badge">Next-Gen Tech</span>
            <h1 className="premium-hero-title">Golf Cart Battery</h1>
            <p className="premium-hero-subtitle">Experience unmatched performance, reliability, and innovation with MotoMax EV's state-of-the-art golf cart battery. Designed for maximum efficiency and power delivery.</p>
          </div>
          <div className="premium-hero-img-wrapper">
            <img src="/assets/1.png" alt="Golf Cart Battery" className="premium-hero-img" />
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <section
        style={{
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left Side: Image */}
        <div style={{ flex: "1 1 500px" }}>
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="/assets/6.png"
              alt="Golf Cart Battery"
              style={{ width: "100%", height: "400px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div style={{ flex: "1 1 500px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "20px",
            }}
          >
            Why Choose Golf Cart Battery?
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 30px 0",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {[
              "Drop-in replacement for traditional lead-acid batteries.",
              "Consistent power delivery across the entire discharge cycle.",
              "Significantly lighter weight reducing wear on the cart.",
              "No watering, no acid spills, zero maintenance.",
            ].map((feature, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                {feature}
              </li>
            ))}
          </ul>
          
          <Link
            to="/contact-us"
            className="pulse-btn"
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "#000",
              padding: "15px 35px",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textDecoration: "none"
            }}
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GolfCart;
