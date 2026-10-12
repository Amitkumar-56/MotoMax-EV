import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const isAdmin = location.pathname.startsWith('/admin') || localStorage.getItem('adminLoggedIn') === 'true';

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
        const u = JSON.parse(uStr);
        fetch(`${API_BASE}/cart.php?user_id=${u.id}`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data)) setCartCount(data.length);
          })
          .catch(err => console.error(err));
      } else {
        try {
          const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          setCartCount(Array.isArray(guestCart) ? guestCart.length : 0);
        } catch {
          setCartCount(0);
        }
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
        <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1250px', margin: '0 auto' }}>
          <div className="logo" style={{ flex: 1 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/Icon.png"
                alt="MotoMax EV Logo"
                style={{ height: "45px", width: "auto", objectFit: "contain", borderRadius: "5px" }}
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
              />
              <h2 style={{ display: "none", color: "var(--primary)", margin: 0, fontWeight: 900 }}>MotoMax EV</h2>
            </Link>
          </div>

          <ul className={`nav-links-light ${isOpen ? "active" : ""}`} style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
            <li className="hide-on-desktop mobile-menu-header" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '10px' }}>
              <img src="/Icon.png" alt="MotoMax EV" style={{ height: "40px", objectFit: "contain" }} onError={(e) => { e.target.style.display = 'none' }} />
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#333", padding: "5px" }}>✖</button>
            </li>
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
                <Link to="/products" onClick={() => setIsOpen(false)}>All Products ▾</Link>
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
                    {cat.name} ▾
                  </Link>
                ))}
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
              <Link to="/gallery" onClick={() => setIsOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li className="hide-on-desktop">
              <button
                onClick={() => { setIsOpen(false); setShowEnquiryModal(true); }}
                style={{
                  background: "var(--primary)",
                  color: "#fff",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  width: "90%",
                  margin: "10px auto",
                  display: "block"
                }}
              >
                Enquire Now
              </button>
            </li>
            <li className="hide-on-desktop">
              <Link to="/dashboard?tab=cart" onClick={() => setIsOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span style={{ background: "#ef4444", color: "#fff", borderRadius: "10px", padding: "1px 7px", fontSize: "0.75rem", fontWeight: "bold", marginLeft: "4px" }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <li className="hide-on-desktop">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                {user ? `👤 Hi, ${user.name.split(' ')[0]}` : "👤 Login"}
              </Link>
            </li>
          </ul>

          {/* Right side actions - Desktop */}
          <ul className="nav-actions hide-on-mobile" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px', listStyle: 'none', margin: 0, padding: 0 }}>



            {!isAdmin && (
              <>
                <li style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => { setIsOpen(false); setShowEnquiryModal(true); }}
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      padding: "10px 24px",
                      borderRadius: "30px",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      boxShadow: "0 4px 10px rgba(254, 166, 3, 0.3)",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    Enquire Now
                  </button>
                </li>
                <li>
                  <Link
                    to="/dashboard?tab=cart"
                    onClick={() => setIsOpen(false)}
                    aria-label="Shopping Cart"
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      textDecoration: "none",
                      color: "#1e293b",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(254, 166, 3, 0.2)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                          fontSize: "0.7rem",
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
                <li>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} style={{ textDecoration: "none", color: "#333", fontWeight: "600" }}>
                    {user ? `Hi, ${user.name.split(' ')[0]}` : "Login"}
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Toggle Icon */}
          <div className="menu-icon hide-on-desktop" onClick={() => setIsOpen(!isOpen)} style={{ color: "#000", fontSize: "1.8rem", cursor: "pointer", marginLeft: "-20px" }}>
            {isOpen ? "✖" : "☰"}
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