import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        color: "#fff",
        paddingTop: "4rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 5%",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "space-between",
          borderBottom: "1px solid #222",
          paddingBottom: "3rem",
        }}
      >
        {/* Column 1: Info */}
        <div style={{ flex: "1 1 250px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="/logo.png"
              alt="MotoMax EV"
              style={{ height: "40px" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <h2
              style={{
                display: "none",
                color: "#fff",
                margin: 0,
                fontFamily: "Arial",
                fontWeight: "900",
              }}
            >
              MotoMax EV
            </h2>
          </div>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#aaa",
              marginBottom: "15px",
              lineHeight: "1.6",
            }}
          >
            A-53, Naraina Industrial Area Phase 1,
            <br />
            Naraina, Delhi-110028 (India)
          </p>
          <p
            style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "10px" }}
          >
            📞 +91-11-48224444
          </p>
          <p
            style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "10px" }}
          >
            ✉️ info@motomaxev.com
          </p>
          <p style={{ fontSize: "0.85rem", color: "#aaa" }}>
            🌐 www.motomaxev.com
          </p>
        </div>

        {/* Column 2: Useful Links */}
        <div style={{ flex: "1 1 150px" }}>
          <h4
            style={{
              fontSize: "1rem",
              marginBottom: "20px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Useful Links
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <li>
              <Link
                to="/"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Management
              </Link>
            </li>
            <li>
              <Link
                to="/news-events"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                News & Events
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div style={{ flex: "1 1 150px" }}>
          <h4
            style={{
              fontSize: "1rem",
              marginBottom: "20px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Our Products
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <li>
              <Link
                to="/products"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                2 Wheeler
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                3 Wheeler
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Golf Cart
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Solar Street Light
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                style={{
                  color: "#aaa",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                Solid State
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: CTA & Socials */}
        <div style={{ flex: "1 1 200px" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "20px",
              lineHeight: "1.5",
              color: "#eee",
            }}
          >
            Let's energize our spaces with clean power
          </h3>
          <Link to="/contact">
            <button
              style={{
                background: "transparent",
                border: "1px solid #fff",
                color: "#fff",
                padding: "10px 25px",
                borderRadius: "30px",
                cursor: "pointer",
                marginBottom: "25px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              ENQUIRE NOW
            </button>
          </Link>
          <div style={{ display: "flex", gap: "15px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "#fff",
                color: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              f
            </div>
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "#fff",
                color: "#000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              in
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
