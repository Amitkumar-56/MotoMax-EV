import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const uStr = localStorage.getItem("authUser");
      if (!uStr) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        return Array.isArray(guestCart) ? guestCart.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
      }
    } catch {
      return 0;
    }
    return 0;
  });
  const location = useLocation();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("authUser");
    return userStr ? JSON.parse(userStr) : null;
  });

  const navRef = useRef(null);

  // Extract unique categories and their first product image
  const categoriesData = [...new Set(products.map(p => p.category).filter(Boolean))].map(catName => {
    const product = products.find(p => p.category === catName);
    return {
      name: catName,
      link: `/products?category=${encodeURIComponent(catName)}`,
      img: product && product.image ? product.image : "/assets/1.png"
    };
  });

  useEffect(() => {
    // Fetch products for Mega Menu
    fetch(`${API_BASE}/products.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProducts(data);
      });
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setMegaMenuOpen(false);
      }
    };

    const fetchCartCount = () => {
      const uStr = localStorage.getItem("authUser");
      if (uStr) {
        try {
          const u = JSON.parse(uStr);
          if (u && u.id) {
            fetch(`${API_BASE}/cart.php?user_id=${u.id}`)
              .then(res => res.json())
              .then(data => {
                if (Array.isArray(data)) {
                  const total = data.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
                  setCartCount(total);
                }
              })
              .catch(err => console.error(err));
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Guest cart
      try {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        if (Array.isArray(guestCart)) {
          const total = guestCart.reduce((sum, item) => {
            const qty = typeof item === 'object' ? (parseInt(item.quantity, 10) || 1) : 1;
            return sum + qty;
          }, 0);
          setCartCount(total);
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    };

    const handleAuthUpdate = () => {
      const uStr = localStorage.getItem("authUser");
      setUser(uStr ? JSON.parse(uStr) : null);
      fetchCartCount();
    };

    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("authUpdated", handleAuthUpdate);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("authUpdated", handleAuthUpdate);
    };
  }, []);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/inquiries.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: `Phone: ${formData.phone} | Msg: ${formData.message}`
      })
    }).then(res => res.json()).then(data => {
      alert("Thanks! Your enquiry has been sent successfully.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowEnquiryModal(false);
    }).catch(err => alert("Error sending enquiry."));
  };

  return (
    <>
      <nav className="navbar-light" ref={navRef}>
        <div className="nav-container">
          <div className="logo">
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/Icon.png"
                alt="MotoMax EV Logo"
                className="navbar-logo-img"
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
              />
              <h2 style={{ display: "none", color: "var(--primary)", margin: 0, fontWeight: 900 }}>MotoMax EV</h2>
            </Link>
          </div>

          {/* Backdrop overlay for mobile */}
          {isOpen && (
            <div
              className="hide-on-desktop"
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                zIndex: 9999
              }}
            />
          )}

          <ul className={`nav-links-light ${isOpen ? "active" : ""}`}>
            <li className="hide-on-desktop mobile-menu-header" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <img src="/Icon.png" alt="MotoMax EV" style={{ height: "36px", objectFit: "contain" }} onError={(e) => { e.target.style.display = 'none' }} />
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close Menu"
                style={{ 
                  background: "#ffffff", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "1.2rem", 
                  cursor: "pointer", 
                  color: "#475569", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                }}
              >
                ✕
              </button>
            </li>
            <li className="mobile-nav-item">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/about-us" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
            </li>
            <li className={`dropdown-mega mobile-nav-item ${megaMenuOpen ? "mobile-active" : ""}`}>
              <Link
                to="#"
                className="dropbtn-light"
                onClick={(e) => {
                  if (window.innerWidth <= 900) {
                    e.preventDefault();
                    setMegaMenuOpen(!megaMenuOpen);
                  }
                }}
                style={{ justifyContent: "space-between" }}
              >
                <span>Products</span>
                <span style={{ fontSize: "0.85rem", transform: megaMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▼</span>
              </Link>
              {/* Desktop Mega Menu */}
              <div className="dropdown-content-mega desktop-mega-menu">
                <div className="mega-menu-container">
                  {/* Top Icons */}
                  <div className="mega-menu-top" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    <Link to="/products" className="mega-menu-item" onClick={() => setIsOpen(false)}>
                      <div style={{ fontSize: "2rem" }}>🌐</div>
                      <span>All Products</span>
                    </Link>
                    {(categoriesData.length > 0 ? categoriesData : [
                      { name: "2-Wheeler", link: "/products?category=2-Wheeler", img: "/assets/1.png" },
                      { name: "3-Wheeler", link: "/products?category=3-Wheeler", img: "/assets/1.png" },
                      { name: "Golf Cart", link: "/products?category=Golf Cart", img: "/assets/1.png" },
                      { name: "E-Scooter", link: "/products?category=E-Scooter", img: "/assets/1.png" },
                      { name: "Lithium Inverter", link: "/products?category=Lithium Inverter", img: "/assets/2.png" },
                      { name: "Solar Storage", link: "/products?category=Solar Storage", img: "/assets/3.png" },
                      { name: "Solid State", link: "/products?category=Solid State", img: "/assets/1.png" },
                    ]).map((cat, idx) => (
                      <Link
                        key={`static-${idx}`}
                        to={cat.link}
                        className="mega-menu-item"
                        onClick={() => setIsOpen(false)}
                      >
                        {cat.img ? <img src={cat.img} alt={cat.name} onError={(e) => { e.target.style.display = 'none' }} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} /> : null}
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Text-Based Products Menu */}
              <div className="dropdown-content-mega mobile-products-menu">
                <Link to="/products" onClick={() => setIsOpen(false)}>
                  All Products
                </Link>
                {(categoriesData.length > 0 ? categoriesData : [
                  { name: "2-Wheeler", link: "/products?category=2-Wheeler" },
                  { name: "3-Wheeler", link: "/products?category=3-Wheeler" },
                  { name: "Golf Cart", link: "/products?category=Golf Cart" },
                  { name: "E-Scooter", link: "/products?category=E-Scooter" },
                  { name: "Lithium Inverter", link: "/products?category=Lithium Inverter" },
                  { name: "Solar Storage", link: "/products?category=Solar Storage" },
                  { name: "Solid State", link: "/products?category=Solid State" }
                ]).map((cat, idx) => (
                  <Link
                    key={`static-mob-${idx}`}
                    to={cat.link}
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </li>

            <li className="mobile-nav-item">
              <Link to="/dealership" onClick={() => setIsOpen(false)}>
                Dealership
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li className="hide-on-desktop mobile-drawer-actions" style={{ width: '100%', padding: '24px 20px 35px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => { setIsOpen(false); setShowEnquiryModal(true); }}
                style={{
                  background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)",
                  color: "#fff",
                  height: "48px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.05rem",
                  width: "100%",
                  maxWidth: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 6px 18px rgba(254, 166, 3, 0.45)",
                  fontFamily: "inherit"
                }}
              >
                <span>⚡</span>
                <span>Enquire Now</span>
              </button>
            </li>
          </ul>

          {/* Right side actions - Desktop */}
          <ul className="nav-actions hide-on-mobile">
            <li style={{ display: "flex", alignItems: "center", flexShrink: 0, margin: 0, padding: 0 }}>
              <button
                onClick={() => { setIsOpen(false); setShowEnquiryModal(true); }}
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  height: "42px",
                  padding: "0 22px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.92rem",
                  boxShadow: "0 4px 10px rgba(254, 166, 3, 0.3)",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  lineHeight: 1,
                  boxSizing: "border-box",
                  verticalAlign: "middle"
                }}
              >
                Enquire Now
              </button>
            </li>
            <li style={{ display: "flex", alignItems: "center", flexShrink: 0, margin: 0, padding: 0 }}>
              <Link
                to="/dashboard?tab=cart"
                onClick={() => setIsOpen(false)}
                aria-label="Shopping Cart"
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "#1e293b",
                  transition: "all 0.25s ease",
                  flexShrink: 0,
                  boxSizing: "border-box"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(254, 166, 3, 0.25)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "#ef4444",
                      color: "#fff",
                      borderRadius: "10px",
                      minWidth: "18px",
                      height: "18px",
                      padding: "0 5px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(239, 68, 68, 0.4)",
                      border: "2px solid #fff"
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li style={{ display: "flex", alignItems: "center", flexShrink: 0, margin: 0, padding: 0 }}>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  height: "42px",
                  padding: "0 18px",
                  borderRadius: "20px",
                  background: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  textDecoration: "none",
                  color: "#0f172a",
                  fontWeight: "700",
                  fontSize: "0.92rem",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  lineHeight: 1,
                  boxSizing: "border-box"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(254, 166, 3, 0.12)";
                  e.currentTarget.style.borderColor = "#FEA603";
                  e.currentTarget.style.color = "#d97706";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#0f172a";
                }}
              >
                <span>👤</span>
                <span>{user ? `Hi, ${user.name.split(' ')[0]}` : "Login"}</span>
              </Link>
            </li>
          </ul>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="hide-on-desktop mobile-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* 1. Add to Cart */}
            <Link
              to="/dashboard?tab=cart"
              aria-label="Shopping Cart"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#1e293b",
                textDecoration: "none",
                flexShrink: 0
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-3px",
                    right: "-3px",
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "10px",
                    minWidth: "16px",
                    height: "16px",
                    padding: "0 4px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff"
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 2. Login Button */}
            <Link
              to="/dashboard"
              aria-label="User Login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                height: "36px",
                padding: "0 12px",
                borderRadius: "20px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                color: "#0f172a",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
            >
              <span>👤</span>
              <span>{user ? user.name.split(' ')[0] : "Login"}</span>
            </Link>

            {/* 3. Toggle Bar (Hamburger Menu) */}
            <button
              className="menu-icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: isOpen ? "#0f172a" : "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                width: "38px",
                height: "38px",
                color: isOpen ? "#ffffff" : "#0f172a",
                fontSize: "1.4rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                lineHeight: 1,
                flexShrink: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
              }}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 999999, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "140px", paddingBottom: "40px", overflowY: "auto" }}>
          <div style={{ background: "#fff", padding: "40px", borderRadius: "20px", width: "100%", maxWidth: "500px", position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <button onClick={() => setShowEnquiryModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#64748b" }}>✕</button>

            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: "5px" }}>Send an Enquiry</h2>
            <p style={{ color: "#64748b", marginBottom: "25px", fontSize: "0.95rem" }}>Fill out the form below and we'll get back to you shortly.</p>

            <form onSubmit={handleEnquirySubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "5px" }}>Your Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "12px 15px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "1rem", outline: "none" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "5px" }}>Email Address *</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "12px 15px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "1rem", outline: "none" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "5px" }}>Phone Number *</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ width: "100%", padding: "12px 15px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "1rem", outline: "none" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#475569", marginBottom: "5px" }}>Message / Requirements *</label>
                <textarea rows="4" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: "100%", padding: "12px 15px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#f8fafc", fontSize: "1rem", outline: "none", resize: "vertical" }} required></textarea>
              </div>

              <button type="submit" style={{ background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)", color: "#fff", padding: "14px", borderRadius: "10px", border: "none", fontSize: "1.05rem", fontWeight: "bold", cursor: "pointer", marginTop: "10px", boxShadow: "0 4px 15px rgba(254,166,3,0.3)" }}>
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;