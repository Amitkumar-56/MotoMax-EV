import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#0f0f0f", color: "#ffffff", padding: "60px 5% 40px", fontFamily: "'Inter', sans-serif" }}>
      <style>
        {`
          .footer-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr 1.5fr 1.2fr;
            gap: 40px;
            max-width: 1300px;
            margin: 0 auto;
          }
          .footer-col h4 {
            font-size: 1.15rem;
            font-weight: 600;
            margin-bottom: 25px;
            color: #ffffff;
          }
          .footer-contact p {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            font-size: 0.9rem;
            margin-bottom: 18px;
            color: #e0e0e0;
            line-height: 1.5;
          }
          .footer-contact .icon {
            color: #00a8ff;
            font-size: 1.1rem;
            margin-top: 2px;
          }
          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-links li {
            margin-bottom: 18px;
          }
          .footer-links a {
            color: #e0e0e0;
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s;
          }
          .footer-links a:hover {
            color: #ffffff;
          }
          .footer-cta h3 {
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.3;
            margin-bottom: 25px;
            color: #ffffff;
          }
          .enquire-btn {
            background: transparent;
            color: #ffffff;
            border: 1px solid #ffffff;
            border-radius: 30px;
            padding: 10px 25px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s, color 0.3s;
            margin-bottom: 30px;
            letter-spacing: 0.5px;
          }
          .enquire-btn:hover {
            background: #ffffff;
            color: #000000;
          }
          .social-icons {
            display: flex;
            gap: 12px;
          }
          .social-circle {
            width: 35px;
            height: 35px;
            background: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000000;
            text-decoration: none;
            font-weight: bold;
            font-size: 1rem;
            transition: transform 0.3s;
          }
          .social-circle:hover {
            transform: translateY(-3px);
          }
          .footer-bottom {
            max-width: 1300px;
            margin: 40px auto 0;
            padding-top: 20px;
            border-top: 1px solid #333;
            text-align: center;
            font-size: 0.85rem;
            color: #888;
          }
          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (max-width: 600px) {
            .footer-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
      <div className="footer-grid">
        {/* Column 1 */}
        <div className="footer-col footer-contact">
          <img src="/Icon.png" alt="MotoMax EV" style={{ height: "60px", marginBottom: "25px" }} onError={(e) => e.target.style.display='none'} />
          <h2 style={{ color: "#fff", marginBottom: "20px", display: "none" }} className="fallback-logo-text">MotoMax EV</h2>
          <p>
            <span className="icon">📍</span>
            <span>A-53, Naraina Industrial Area Phase-1,<br />Naraina, Delhi-110028 (India)</span>
          </p>
          <p>
            <span className="icon">📞</span>
            <span>+91-11-48224444</span>
          </p>
          <p>
            <span className="icon">✉️</span>
            <span>info@motomaxev.com</span>
          </p>
          <p>
            <span className="icon">🌐</span>
            <span>www.motomaxev.com</span>
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
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

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Our Products</h4>
          <ul className="footer-links">
            <li><Link to="/products/electric-scooter-battery">Automotive Lithium Battery</Link></li>
            <li><Link to="/products/lithium-inverter-battery-home">Inverter Lithium Battery</Link></li>
            <li><Link to="/products/solar-street-light-storage">Lithium Battery Solar App.</Link></li>
            <li><Link to="/products/solid-state">Drone Lithium Battery</Link></li>
            <li><Link to="/products/charger">EV Charger</Link></li>
            <li><Link to="/products/inverter">Inverter</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col footer-cta">
          <h3>Let's energize<br/>our spaces with<br/>clean power</h3>
          <Link to="/contact-us">
            <button className="enquire-btn">ENQUIRE NOW</button>
          </Link>
          <div className="social-icons">
            <a href="#" className="social-circle">f</a>
            <a href="#" className="social-circle" style={{fontSize: "0.8rem"}}>📷</a>
            <a href="#" className="social-circle">in</a>
          </div>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
