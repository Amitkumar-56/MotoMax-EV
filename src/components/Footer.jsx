import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Info */}
        <div className="footer-col" style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <img
              src="/logo.png"
              alt="MotoMax EV"
              style={{ height: "45px" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            <h2 className="footer-logo-text" style={{ display: "none" }}>
              MotoMax EV
            </h2>
          </div>
          <div className="footer-contact-info">
            <p>
              📍 A-53, Naraina Industrial Area Phase 1,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;Naraina, Delhi-110028 (India)
            </p>
            <p>📞 +91-11-48224444</p>
            <p>✉️ info@motomaxev.com</p>
            <p>🌐 www.motomaxev.com</p>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="footer-col" style={{ flex: "1 1 150px" }}>
          <h4>Useful Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
            <li><Link to="/team">Management</Link></li>
            <li><Link to="/news-events">News & Events</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: Our Products */}
        <div className="footer-col" style={{ flex: "1 1 150px" }}>
          <h4>Our Products</h4>
          <ul className="footer-links">
            <li><Link to="/products/2-wheeler">2 Wheeler</Link></li>
            <li><Link to="/products/3-wheeler">3 Wheeler</Link></li>
            <li><Link to="/products/golf-cart">Golf Cart</Link></li>
            <li><Link to="/products/solar-street-light-storage">Solar Street Light</Link></li>
            <li><Link to="/products/solid-state">Solid State</Link></li>
          </ul>
        </div>

        {/* Column 4: CTA & Socials */}
        <div className="footer-col" style={{ flex: "1 1 280px" }}>
          <div className="footer-cta">
            <h3>Let's energize our spaces with clean power</h3>
            <Link to="/contact-us">
              <button className="btn-primary" style={{ padding: "12px 30px", fontSize: "0.9rem" }}>
                ENQUIRE NOW
              </button>
            </Link>
          </div>
          <div className="social-icons-wrapper">
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">in</a>
            <a href="#" className="social-icon">𝕏</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MotoMax EV. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
