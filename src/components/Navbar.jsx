import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("solar");
  const [activeSubMenu, setActiveSubMenu] = useState("industrial");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);

  return (
    <nav className="navbar-light">
      <div className="logo">
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          {/* Default to the logo provided by user or text fallback */}
          <img
            src="/Icon.png"
            alt="MotoMax EV Logo"
            style={{
              height: "45px",
              width: "auto",
              objectFit: "contain",
              borderRadius: "5px"
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <h2
            style={{
              display: "none",
              color: "var(--primary)",
              margin: 0,
              fontWeight: 900,
            }}
          >
            MotoMax EV
          </h2>
        </Link>
      </div>

      <div
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: "#ffffffff" }}
      >
        ☰
      </div>

      <ul className={`nav-links-light ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about-us" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
        </li>
        <li className={`dropdown-mega ${megaMenuOpen ? "mobile-active" : ""}`}>
          <Link
            to="#"
            className="dropbtn-light"
            onClick={(e) => {
              if (window.innerWidth <= 900) {
                e.preventDefault();
                setMegaMenuOpen(!megaMenuOpen);
              }
            }}
          >
            Products ▾
          </Link>
          {/* Desktop Mega Menu */}
          <div className="dropdown-content-mega desktop-mega-menu">
            <div className="mega-menu-container">
              {/* Top Icons */}
              <div className="mega-menu-top">
                <Link
                  to="/products/electric-scooter-battery"
                  className="mega-menu-item"
                  onMouseEnter={() => setActiveMenu("automotive")}
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/assets/nav-automotive.jpg" alt="Automotive" />
                  <span>Automotive Lithium Battery</span>
                </Link>
                <Link
                  to="/products/lithium-inverter-battery-home"
                  className="mega-menu-item"
                  onMouseEnter={() => setActiveMenu("inverter")}
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/assets/inverter-battery.jpg" alt="Inverter" />
                  <span>Inverter Lithium Battery</span>
                </Link>
                <div
                  className={`mega-menu-item ${activeMenu === "solar" ? "active" : ""}`}
                  onMouseEnter={() => setActiveMenu("solar")}
                >
                  <img src="/assets/solar-battery-cluster.jpg" alt="Solar" />
                  <span>Lithium Battery Solar Application</span>
                </div>
                <Link
                  to="/products/solid-state"
                  className="mega-menu-item"
                  onMouseEnter={() => setActiveMenu("drone")}
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/assets/drone-single-battery.jpg" alt="Drone" />
                  <span>Drone Lithium Battery</span>
                </Link>
                <Link
                  to="/products/charger"
                  className="mega-menu-item"
                  onMouseEnter={() => setActiveMenu("charger")}
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/assets/nav-automotive.jpg" alt="EV Charger" />
                  <span>EV Charger</span>
                </Link>
                <Link
                  to="/products/inverter"
                  className="mega-menu-item"
                  onMouseEnter={() => setActiveMenu("inverter-device")}
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/assets/inverter-hero-house.jpg"
                    alt="Inverter Device"
                  />
                  <span>Inverter</span>
                </Link>
              </div>

              {/* Bottom Details (Only for Solar currently based on screenshot) */}
              {activeMenu === "solar" && (
                <div className="mega-menu-bottom">
                  <div className="mega-menu-sub">
                    <Link
                      to="/products/solar-street-light-storage"
                      className={`mega-menu-sub-item ${activeSubMenu === "solar-street" ? "active" : ""}`}
                      onMouseEnter={() => setActiveSubMenu("solar-street")}
                      onClick={() => setIsOpen(false)}
                    >
                      Solar Street Light & Robots Battery
                    </Link>
                    <div
                      className={`mega-menu-sub-item ${activeSubMenu === "home" ? "active" : ""}`}
                      onMouseEnter={() => setActiveSubMenu("home")}
                    >
                      Home
                    </div>
                    <div
                      className={`mega-menu-sub-item ${activeSubMenu === "office" ? "active" : ""}`}
                      onMouseEnter={() => setActiveSubMenu("office")}
                    >
                      Small Office
                    </div>
                    <div
                      className={`mega-menu-sub-item ${activeSubMenu === "industrial" ? "active" : ""}`}
                      onMouseEnter={() => setActiveSubMenu("industrial")}
                    >
                      Industrial BESS
                    </div>
                  </div>

                  <div className="mega-menu-details">
                    {activeSubMenu === "industrial" && (
                      <div style={{ maxWidth: "300px" }}>
                        <a href="#">TKESS-261</a>
                        <a href="#">TKESS-418</a>
                        <a href="#">5 MWH</a>
                        <a href="#">Mobile Maintenance BESS</a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Text-Based Products Menu */}
          <div className="dropdown-content-mega mobile-products-menu">
            <Link
              to="/products/electric-scooter-battery"
              onClick={() => setIsOpen(false)}
            >
              Automotive Lithium Battery ▾
            </Link>
            <Link
              to="/products/lithium-inverter-battery-home"
              onClick={() => setIsOpen(false)}
            >
              Inverter Lithium Battery ▾
            </Link>
            <Link
              to="/products/solar-street-light-storage"
              onClick={() => setIsOpen(false)}
            >
              Lithium Battery Solar Applications
            </Link>
            <Link to="/products/solid-state" onClick={() => setIsOpen(false)}>
              Drone Lithium Battery ▾
            </Link>
            <Link to="/products/charger" onClick={() => setIsOpen(false)}>
              EV Charger ▾
            </Link>
            <Link to="/products/inverter" onClick={() => setIsOpen(false)}>
              Inverter ▾
            </Link>
          </div>
        </li>
        <li>
          <Link to="/team" onClick={() => setIsOpen(false)}>
            Team
          </Link>
        </li>
        <li className={`dropdown-light ${investorOpen ? "mobile-active" : ""}`}>
          <Link
            to="#"
            className="dropbtn-light"
            onClick={(e) => {
              if (window.innerWidth <= 900) {
                e.preventDefault();
                setInvestorOpen(!investorOpen);
              }
            }}
          >
            Investor Relations ▾
          </Link>
          <div className="dropdown-content-light">
            <Link
              to="/investor-relations/financials"
              onClick={() => setIsOpen(false)}
            >
              Financials
            </Link>
            <Link
              to="/investor-relations/policies"
              onClick={() => setIsOpen(false)}
            >
              Policies
            </Link>
          </div>
        </li>
        <li>
          <Link to="/news-events" onClick={() => setIsOpen(false)}>
            News & Events
          </Link>
        </li>
        <li>
          <Link to="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/contact-us"
            className="pulse-btn"
            style={{
              background: "var(--primary)",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "30px",
              fontWeight: "bold",
              textShadow: "none"
            }}
            onClick={() => setIsOpen(false)}
          >
            Enquire Now
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            style={{ color: "var(--primary)", fontWeight: "bold" }}
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
