import React from "react";
import { Link } from "react-router-dom";

const TwoWheeler = () => {
  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            color: "var(--text-main)",
            marginBottom: "20px",
            textTransform: "uppercase"
          }}
        >
          2 Wheeler Battery
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--text-muted)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Power your journey with MotoMax EV's high-performance 2 Wheeler Lithium Batteries. Engineered for extended range, fast charging, and ultimate reliability.
        </p>
      </section>

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
              src="/assets/1.png"
              alt="2 Wheeler Battery"
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
            Why Choose 2 Wheeler Battery?
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
              "High Energy Density for longer riding range.",
              "Smart Battery Management System (BMS) included.",
              "Fast charging capabilities with zero heating issues.",
              "Lightweight and compact design for electric scooters and bikes.",
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

export default TwoWheeler;
