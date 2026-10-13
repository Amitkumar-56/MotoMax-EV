import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Home = () => {
  const defaultSlider = [
    {
      type: "image",
      src: "/assets/motomax-banner-batteries.jpg",
      title: "",
      subtitle: ""
    },
    {
      type: "image",
      src: "/assets/motomax-banner-assembly.jpg",
      title: "",
      subtitle: ""
    },
    {
      type: "image",
      src: "/assets/motomax-scooty-fleet.jpg",
      title: "INDIA'S LEADING ELECTRIC MOBILITY ECOSYSTEM",
      subtitle: "High Speed Scooties, Commercial Fleets & Smart EV Powertrains"
    },
    {
      type: "image",
      src: "/assets/motomax-cell-grading.jpg",
      title: "AIS-156 & BIS CERTIFIED CELL GRADING",
      subtitle: "Laser-Tested Internal Resistance & Smart Thermal Management"
    },
    {
      type: "image",
      src: "/assets/motomax-battery-warehouse.jpg",
      title: "HIGH CAPACITY ENERGY STORAGE SOLUTIONS",
      subtitle: "Trusted by Top OEMs and 500,000+ Daily Drivers Across India"
    },
    {
      type: "video",
      src: "/assets/home-video.mp4"
    }
  ];

  const [sliderItems, setSliderItems] = useState(defaultSlider);
  const [products, setProducts] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [wishlistedItems, setWishlistedItems] = useState({});
  const productSliderRef = useRef(null);

  const handleAction = (e, productId, actionType, redirect = false) => {
    e.preventDefault();
    e.stopPropagation();

    const userStr = localStorage.getItem("authUser");
    if (!userStr) {
      if (actionType === 'cart') {
        try {
          let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          const existingItem = guestCart.find(item => (typeof item === 'object' ? item.product_id === productId : item === productId));
          if (existingItem) {
            if (typeof existingItem === 'object') {
              existingItem.quantity = (existingItem.quantity || 1) + 1;
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Cart quantity updated successfully!" } }));
          } else {
            guestCart.push({ product_id: productId, quantity: 1 });
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Product added to cart successfully!" } }));
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }
      alert("Please login first to add items to your wishlist!");
      window.location.href = "/dashboard?tab=wishlist";
      return;
    }

    const user = JSON.parse(userStr);
    const endpoint = actionType === 'cart' ? 'cart.php' : 'wishlist.php';

    fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId })
    })
      .then(res => res.json())
      .then(data => {
        if (redirect) {
          window.location.href = "/dashboard?tab=cart";
        } else {
          if (actionType === 'cart') {
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: data.message || "Product added to cart successfully!" } }));
            window.dispatchEvent(new Event('cartUpdated'));
          } else {
            alert(data.message);
          }
        }
      })
      .catch(err => console.error(err));
  };

  const scrollProducts = (direction) => {
    if (productSliderRef.current && productSliderRef.current.children.length > 0) {
      const cardWidth = productSliderRef.current.children[0].clientWidth;
      const scrollAmount = cardWidth + 30;
      productSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }
    if (touchStartX - touchEndX < -50) {
      setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    // Fetch live products
    fetch(`${API_BASE}/products.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProducts(data);
      });


    // Fetch settings for slider
    fetch(`${API_BASE}/settings.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.homepage_slider) {
          try {
            setSliderItems(JSON.parse(data.data.homepage_slider));
          } catch (e) { }
        }
      });
  }, []);

  useEffect(() => {
    let heroTimeout;

    // Auto scroll logic for hero (only if not a video)
    if (sliderItems[currentSlide] && sliderItems[currentSlide].type !== "video") {
      heroTimeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
      }, 3000);
    }

    // Product Slider Auto-scroll Interval (only auto-scroll if cards overflow container)
    const productInterval = setInterval(() => {
      if (productSliderRef.current && productSliderRef.current.children.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } =
          productSliderRef.current;
        if (scrollWidth > clientWidth + 20) {
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // Snap back to start instantly without smooth scrolling
            productSliderRef.current.scrollTo({ left: 0, behavior: "auto" });
          } else {
            const cardWidth = productSliderRef.current.children[0].clientWidth;
            const scrollAmount = cardWidth + 30; // Card width + gap
            productSliderRef.current.scrollBy({
              left: scrollAmount,
              behavior: "smooth",
            });
          }
        }
      }
    }, 4000);

    return () => {
      clearTimeout(heroTimeout);
      clearInterval(productInterval);
    };
  }, [currentSlide]);

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
      {/* Unified Hero Slider */}
      <header
        className="hero-section"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider Images/Videos */}
        {sliderItems.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: "transform 0.8s cubic-bezier(0.45, 0, 0.15, 1)",
              zIndex: 0,
            }}
          >
            {item.type === "video" ? (
              <video
                autoPlay
                muted
                playsInline
                webkit-playsinline="true"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onEnded={() => setCurrentSlide((prev) => (prev + 1) % sliderItems.length)}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={item.src}
                alt={`Slide ${index}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              />
            )}

            {/* Dark overlay for better text readability - only shown when slide has text overlay */}
            {item.type !== "video" && (item.title || item.subtitle) ? (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.38)"
              }}></div>
            ) : null}
          </div>
        ))}

        {/* Dynamic Text Overlay */}
        {sliderItems[currentSlide] && sliderItems[currentSlide].type !== "video" && (sliderItems[currentSlide].title || sliderItems[currentSlide].subtitle) ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              pointerEvents: "none",
              padding: "0 20px",
              textAlign: "center"
            }}
          >
            {sliderItems[currentSlide].title && (
              <h1 className="hero-title">
                {sliderItems[currentSlide].title}
              </h1>
            )}
            {sliderItems[currentSlide].subtitle && (
              <h2 className="hero-subtitle">
                {sliderItems[currentSlide].subtitle}
              </h2>
            )}
            <button
              className="hero-btn pulse-btn"
              style={{ pointerEvents: "auto" }}
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Products &rarr;
            </button>
          </div>
        ) : null}

        {/* Navigation Arrows for Hero Slider */}
        <button
          className="hero-nav-arrow hero-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
          }}
          aria-label="Previous Slide"
        >
          &#8249;
        </button>
        <button
          className="hero-nav-arrow hero-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
          }}
          aria-label="Next Slide"
        >
          &#8250;
        </button>

        {/* Slide Indicators / Dots */}
        <div className="hero-dots-container">
          {sliderItems.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </header>

      {/* Intro Section */}
      <section className="section-padding text-center">
        <h1 className="section-title">
          Lithium Battery & Inverter Battery
          <br />
          Solutions for Home and EV
        </h1>
        <p className="section-subtitle">
          We are a leading manufacturer of lithium batteries, inverter batteries
          and energy storage systems designed for modern energy needs. Our
          advanced lithium battery solutions are used in inverter backup
          systems, electric vehicles and solar power installations. With
          reliable performance, longer battery life and smart battery management
          systems, our products deliver efficient power backup for homes and
          businesses across India.
        </p>
      </section>

      {/* Who We Are Section */}
      <section className="section-padding" style={{ paddingTop: "0" }}>
        <h2
          className="section-title text-center"
          style={{ marginBottom: "1rem" }}
        >
          Who We Are
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 500px" }}>
            <p
              style={{
                fontSize: "1.4rem",
                color: "var(--text-muted)",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              We are emerging as a game changer in empowering a sustainable
              future with the highest performance and safest batteries for
              electric vehicles, homes, and critical applications.
            </p>
            <div
              style={{
                background: "var(--secondary)",
                padding: "2rem",
                borderRadius: "30px 0 30px 30px",
                color: "var(--text-main)",
                lineHeight: "1.6",
              }}
            >
              <p>
                Our products, systems and services are meeting the needs of
                customers and society in industrial, as well as the consumer
                infrastructure markets. With the evolving needs, we are
                currently expanding our battery devices business beyond borders,
                with the goal of creating new businesses and a strong chain of
                satisfied clients in the power industry.
              </p>
            </div>
          </div>

          <div
            style={{
              flex: "1 1 420px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "460px",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                border: "4px solid #ffffff",
                background: "#0f172a",
              }}
            >
              <img
                src="/assets/motomax-cell-grading.jpg"
                alt="MotoMax EV Cell Grading & Quality Testing Lab"
                style={{
                  width: "100%",
                  height: "auto",
                  minHeight: "330px",
                  maxHeight: "420px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/assets/slider-4.jpg";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  background: "rgba(15, 23, 42, 0.90)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "14px",
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  border: "1px solid rgba(254, 166, 3, 0.35)",
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#FEA603",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  flexShrink: 0
                }}>
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#FEA603" }}>100% AIS-156 Cell Grading</div>
                  <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>State-of-the-art testing & assembly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section Redesign */}
      <section
        id="products-section"
        style={{
          padding: "80px 20px",
          background: "#ffffff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative background elements */}
        <div style={{ position: "absolute", top: "10%", left: "5%", opacity: 0.1, zIndex: 0 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="var(--primary)">
            <circle cx="5" cy="5" r="2" /><circle cx="20" cy="5" r="2" /><circle cx="35" cy="5" r="2" />
            <circle cx="5" cy="20" r="2" /><circle cx="20" cy="20" r="2" /><circle cx="35" cy="20" r="2" />
            <circle cx="5" cy="35" r="2" /><circle cx="20" cy="35" r="2" /><circle cx="35" cy="35" r="2" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "20%", right: "5%", opacity: 0.05, zIndex: 0 }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--primary)">
            <path d="M17 8C8 10 5 16 5 22C11 22 17 15 17 8ZM12 12C9 14 7 17 6 19C7 18 9 15 12 12Z" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h4 style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "1rem", letterSpacing: "2px", fontWeight: 700, marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <span style={{ width: "40px", height: "2px", background: "rgba(254,166,3,0.3)" }}></span>
            OUR PRODUCTS
            <span style={{ width: "40px", height: "2px", background: "rgba(254,166,3,0.3)" }}></span>
          </h4>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, color: "#1a1a1a", marginBottom: "15px" }}>
            Powering a Cleaner, <span style={{ color: "var(--primary)" }}>Greener</span> Tomorrow
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto 0", lineHeight: 1.6 }}>
            Explore our wide range of innovative EV and energy solutions designed for a sustainable and smarter future.
          </p>
        </div>

        <div
          className="slider-wrapper"
          style={{
            position: "relative",
            maxWidth: "1350px",
            margin: "0 auto"
          }}
        >
          {/* Left Arrow */}
          <button
            className="slider-arrow slider-arrow-left"
            onClick={() => scrollProducts("left")}
            style={{
              position: "absolute",
              left: "0",
              top: "45%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#333"; }}
          >
            &#8249;
          </button>

          {/* Right Arrow */}
          <button
            className="slider-arrow slider-arrow-right"
            onClick={() => scrollProducts("right")}
            style={{
              position: "absolute",
              right: "0",
              top: "45%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.05)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#333"; }}
          >
            &#8250;
          </button>

          {/* Slider Container */}
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .attractive-card {
                background: #fff;
                border-radius: 20px;
                padding: 25px 20px;
                min-width: 260px;
                max-width: 260px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                transition: transform 0.4s ease, box-shadow 0.4s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: inherit;
                border: 1px solid rgba(0,0,0,0.02);
                margin: 15px 5px;
                flex-shrink: 0;
              }
              .slider-wrapper {
                padding: 0 50px;
              }
              .product-slider-track {
                display: flex;
                gap: 24px;
                overflow-x: auto;
                scroll-behavior: smooth;
                padding: 10px 0;
                justify-content: center;
              }
              @media (max-width: 1250px) {
                .product-slider-track {
                  justify-content: flex-start;
                }
              }
              @media (max-width: 768px) {
                .slider-wrapper {
                  padding: 0 35px;
                }
                .attractive-card {
                  min-width: 240px;
                  max-width: 240px;
                  padding: 15px;
                }
                .slider-arrow {
                  width: 35px !important;
                  height: 35px !important;
                  font-size: 1.2rem !important;
                }
                .slider-arrow-left {
                  left: -5px !important;
                }
                .slider-arrow-right {
                  right: -5px !important;
                }
              }
              .attractive-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(254,166,3,0.1);
              }
              .card-icon-wrapper {
                width: 100%;
                height: 140px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                position: relative;
                overflow: hidden;
              }
              .card-icon-wrapper img {
                width: 100%;
                height: 100%;
                border-radius: 15px;
                object-fit: cover;
                background: #fff;
                z-index: 2;
                transition: transform 0.4s ease, box-shadow 0.4s ease;
              }
              .attractive-card:hover .card-icon-wrapper img {
                transform: scale(1.1);
              }
              .card-arrow-btn {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: rgba(254,166,3,0.1);
                color: var(--primary);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 15px;
                transition: all 0.3s ease;
              }
              .attractive-card:hover .card-arrow-btn {
                background: var(--primary);
                color: #fff;
              }
            `}
          </style>

          <div
            ref={productSliderRef}
            className="hide-scrollbar product-slider-track"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {products.map((prod, idx) => (
              <Link key={idx} to={`/products/${prod.id}`} className="attractive-card">
                <div className="card-icon-wrapper" style={{ position: 'relative' }}>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setWishlistedItems(prev => ({ ...prev, [prod.id]: true }));
                      handleAction(e, prod.id, 'wishlist');
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                      color: wishlistedItems[prod.id] ? '#ef4444' : '#ccc',
                      fontSize: '1.2rem',
                      transition: 'color 0.3s'
                    }}
                  >
                    ❤
                  </button>
                  <img src={prod.image || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"} alt={prod.name} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "4px", lineHeight: 1.3, minHeight: "22px" }}>
                  {prod.name}
                </h3>
                <h4 style={{ fontSize: "1.1rem", color: "#FEA603", marginBottom: "8px", marginTop: "0" }}>
                  ₹{prod.price}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#666", flexGrow: 1, margin: 0, minHeight: "20px" }}>
                  {prod.range}
                </p>
                  <button
                    onClick={(e) => handleAction(e, prod.id, 'cart', false)}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      background: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(254, 166, 3, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Add to Cart</span>
                  </button>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
          <span style={{ width: "30px", height: "2px", background: "rgba(254,166,3,0.3)" }}></span>
          <Link
            to="/products"
            style={{
              background: "var(--primary)",
              color: "#fff",
              padding: "15px 35px",
              borderRadius: "30px",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 10px 20px rgba(254,166,3,0.2)",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            View All Products <span>&#8594;</span>
          </Link>
        </div>
      </section>

      {/* ================= SECTION: BATTERY APPLICATIONS & INDUSTRY VERTICALS ================= */}
      <section
        className="section-padding battery-apps-section"
        style={{
          background: "#f8fafc",
          padding: "90px 5% 90px",
          borderTop: "1px solid #e2e8f0",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <div className="battery-badge-pill" style={{
            background: "rgba(254, 166, 3, 0.12)",
            color: "#d97706",
            border: "1px solid rgba(254, 166, 3, 0.35)"
          }}>
            <span>⚡ CORE MANUFACTURING • LITHIUM ENERGY STORAGE</span>
          </div>
          <h2 className="battery-section-heading" style={{ color: "#0f172a" }}>
            Engineered for High-Demand Battery Applications
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 50px", lineHeight: 1.6 }}>
            From high-capacity residential home inverter backup to commercial electric fleets and utility solar grids, MotoMax Lithium Batteries power India's transition to clean energy.
          </p>

          <div className="battery-grid-cards" style={{ textAlign: "left" }}>
            {/* App 1 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                🏠
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Home & Inverter Backup</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Compact, wall-mountable lithium inverter batteries replacing bulky lead-acid batteries. Zero acid fumes, 3x faster recharge, and 10+ years maintenance-free lifespan.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>3000+ Cycles</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Wall Mountable</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>100% Sealed</span>
              </div>
            </div>

            {/* App 2 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                🛵
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Electric 2-Wheelers & 3-Wheelers</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                High-discharge LiFePO4 & NMC portable battery packs engineered with vibration damping, thermal safety, and instant high-torque power for electric scooters and e-rickshaws.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>AIS-156 Certified</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>IP67 Waterproof</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Quick Swap</span>
              </div>
            </div>

            {/* App 3 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                ☀️
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Solar Energy Storage (ESS)</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                High-efficiency solar lithium batteries for rooftop solar installations, agricultural solar pumps, and off-grid hybrid power plants with 95% usable depth-of-discharge.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>95% Depth of Discharge</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Smart MPPT Ready</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Zero Acid Fumes</span>
              </div>
            </div>

            {/* App 4 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                🏌️
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Golf Carts & Commercial Fleets</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                High-power lithium packs customized for 48V/72V golf carts, resort transit vehicles, airport shuttles, and warehouse automated guided vehicles (AGVs).
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>High Continuous Discharge</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>CAN-Bus Telematics</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Fast Opportunity Charge</span>
              </div>
            </div>

            {/* App 5 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                🏥
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Healthcare & Critical UPS</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Zero-lag, clean power backup for sensitive medical diagnostic gear, dental clinics, emergency surgical theaters, and corporate server rooms with high voltage stability.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Zero Voltage Fluctuation</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Ultra-Low Internal Impedance</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Pure Sine Wave Output</span>
              </div>
            </div>

            {/* App 6 */}
            <div className="battery-card" style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "32px 28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 35px rgba(254, 166, 3, 0.12)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: "rgba(254, 166, 3, 0.12)", color: "#FEA603", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                📡
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>Telecom & Industrial Micro-Grids</h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                Rugged 48V rack-mount LiFePO4 battery modules ensuring 24/7 power availability for remote 4G/5G cell towers, highway toll plazas, and industrial SCADA automation.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>-20°C to 55°C Tolerance</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Parallel Scalable</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, background: "#f8fafc", color: "#0f172a", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>Remote SNMP Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: ADVANCED BATTERY TECHNOLOGY & R&D ================= */}
      <section
        className="section-padding battery-tech-section"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          padding: "90px 5% 95px",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <div className="battery-badge-pill" style={{
            background: "rgba(254, 166, 3, 0.2)",
            color: "#FEA603",
            border: "1px solid rgba(254, 166, 3, 0.4)",
          }}>
            <span>🛡️ R&D & QUALITY ENGINEERING</span>
          </div>
          <h2 className="battery-section-heading" style={{ color: "#ffffff" }}>
            Next-Gen Battery Technology Engineered for Safety
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 55px", lineHeight: 1.6 }}>
            Every MotoMax battery pack integrates military-grade cell grading, smart multi-tier protection circuits, and precision thermal dissipation.
          </p>

          <div className="battery-grid-cards" style={{ textAlign: "left" }}>
            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🧠</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>Microcontroller Active BMS</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                Active cell balancing algorithm continuously equalizes cell voltages, preventing premature capacity fade and ensuring maximum pack efficiency.
              </p>
            </div>

            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🔋</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>Grade-A EV Prismatic Cells</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                100% laser-welded Grade-A Lithium Iron Phosphate (LiFePO4) cells with strict internal resistance (IR) matching for supreme reliability.
              </p>
            </div>

            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌡️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>Extreme Thermal Dissipation (55°C)</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                Aerospace-grade thermal phase change materials and aluminum heat-sink enclosures safeguard against extreme Indian summer temperatures.
              </p>
            </div>

            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>⚡</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>Ultra-Fast 2.5-Hour Charging</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                Accepts continuous high C-rate charging current. Reaches 80% charge in just 2.5 hours without overheating or cell stress.
              </p>
            </div>

            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>♻️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>3,000+ Deep Cycles Life</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                Up to 6 times longer lifespan compared to traditional lead-acid or tubular batteries. Lasts over a decade with standard daily cycles.
              </p>
            </div>

            <div className="battery-tech-card" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "18px", padding: "28px", backdropFilter: "blur(10px)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🛡️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FEA603", margin: "0 0 8px 0" }}>5-Year Warranty Support</h3>
              <p style={{ fontSize: "0.92rem", color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>
                Comprehensive pan-India replacement warranty and dedicated engineering helpline for dealer network and end customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: COMPARISON TABLE (LEAD-ACID VS MOTOMAX LITHIUM) ================= */}
      <section
        className="section-padding battery-compare-section"
        style={{
          background: "#ffffff",
          padding: "90px 5% 95px",
          borderTop: "1px solid #e2e8f0"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(34, 197, 94, 0.12)",
            color: "#16a34a",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            padding: "6px 18px",
            borderRadius: "30px",
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            marginBottom: "14px"
          }}>
            <span>💡 SMARTER INVESTMENT</span>
          </div>
          <h2 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#0f172a", marginBottom: "15px", lineHeight: 1.2 }}>
            Why Upgrade to MotoMax Lithium Batteries?
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "750px", margin: "0 auto 45px", lineHeight: 1.6 }}>
            See how MotoMax Lithium Technology compares directly with outdated traditional lead-acid and tubular batteries.
          </p>

          <div style={{ overflowX: "auto", borderRadius: "18px", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
              <thead>
                <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                  <th style={{ padding: "18px 24px", fontWeight: 800, fontSize: "1rem" }}>Feature / Parameter</th>
                  <th style={{ padding: "18px 24px", fontWeight: 700, color: "#94a3b8" }}>Old Lead-Acid / Tubular</th>
                  <th style={{ padding: "18px 24px", fontWeight: 800, color: "#FEA603", background: "rgba(254, 166, 3, 0.15)" }}>⚡ MotoMax Lithium Battery</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Cycle Life (Lifespan)</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>400 – 600 Cycles (~2 Years)</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ 3,000+ Cycles (8 – 10 Years)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Charging Time</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>10 – 12 Hours (Slow)</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ 2.5 – 3 Hours (Ultra Fast)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Usable Capacity (DoD)</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>Only 50% Depth of Discharge</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ 95% Usable Energy</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Weight & Size</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>60+ KG (Extremely Heavy)</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ Under 18 KG (70% Lighter & Compact)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Maintenance Required</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>Water top-up & acid fumes</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ 100% Zero Maintenance & Sealed</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px 24px", fontWeight: 700, color: "#1e293b" }}>Energy Efficiency & Savings</td>
                  <td style={{ padding: "16px 24px", color: "#64748b" }}>~70% Efficiency (High electricity bill)</td>
                  <td style={{ padding: "16px 24px", fontWeight: 800, color: "#16a34a", background: "#f0fdf4" }}>✓ 96% Efficiency (Saves up to ₹15,000/yr)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= SECTION: OUR COMMITMENT & WARRANTY ASSURANCE ================= */}
      <section
        className="section-padding battery-commitment-section"
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "90px 5% 95px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <div className="battery-badge-pill" style={{
            background: "rgba(254, 166, 3, 0.2)",
            color: "#FEA603",
            border: "1px solid rgba(254, 166, 3, 0.45)"
          }}>
            <span>🤝 हमारी प्रतिबद्धता • OUR CORE COMMITMENT</span>
          </div>
          <h2 className="battery-section-heading" style={{ color: "#ffffff" }}>
            Sahi Jankari • Sahi Range • Lambe Samay Ka Vishwas
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "820px", margin: "0 auto 18px", lineHeight: 1.6 }}>
            At MotoMax EV, we believe in honest specifications, rigorous on-road testing, and transparent warranties with zero misleading claims.
          </p>
          <div style={{
            display: "inline-block",
            background: "rgba(254, 166, 3, 0.15)",
            border: "1px dashed #FEA603",
            color: "#FEA603",
            padding: "8px 24px",
            borderRadius: "40px",
            fontSize: "1.05rem",
            fontWeight: 800,
            marginBottom: "50px",
            maxWidth: "95%"
          }}>
            “हम वादे नहीं, भरोसा देते हैं — We Don't Make Promises, We Build Trust”
          </div>

          <div className="battery-grid-cards" style={{ textAlign: "left" }}>
            {/* 1. Price */}
            <div className="battery-commit-card" style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", fontWeight: 900 }}>
                ₹
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>कीमत (Price Transparency)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                सभी कीमतों में GST शामिल है। कोई अतिरिक्त या छिपा हुआ शुल्क नहीं। 100% पारदर्शी बिलिंग।
              </p>
            </div>

            {/* 2. Real Range */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🛣️
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>वास्तविक रेंज (Real Tested Range)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                Activa CS जैसे वाहनों पर स्वयं जमीनी परीक्षण के आधार पर रेंज प्रमाणित की जाती है।
              </p>
            </div>

            {/* 3. Mileage */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                ⚡
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>माइलेज (Motor-Specific Mileage)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                प्रमाणित माइलेज मानक 1200-वाट मोटर और सामान्य लोड परिस्थितियों के आधार पर निर्धारित है।
              </p>
            </div>

            {/* 4. Customer Trust */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🤝
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>ग्राहक विश्वास (Honest Trust)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                हम अपने अनुभव और वास्तविक परीक्षण के आधार पर सटीक जानकारी देते हैं, झूठे या भ्रामक दावे नहीं करते।
              </p>
            </div>

            {/* 5. 2+1 Battery Warranty */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 900 }}>
                2+1 Y
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>बैटरी वारंटी (2+1 Years)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                2 वर्ष की फुल गारंटी + 1 वर्ष का सर्विस सपोर्ट। लंबे समय तक निश्चिंत उपयोग का आश्वासन।
              </p>
            </div>

            {/* 6. Charger Warranty */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🔌
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>चार्जर वारंटी (1 Year)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                MotoMax स्मार्ट ऑटो-कट ऑफ चार्जर पर 1 वर्ष की व्यापक प्रतिस्थापन एवं सेवा वारंटी।
              </p>
            </div>

            {/* 7. Dealer Warranty Buffer */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🏬
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>डीलर वारंटी (60-Day Buffer)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                डीलरों के लिए 2 महीने (60 दिन) की अतिरिक्त अवधि के बाद वारंटी शुरू होती है ताकि स्टॉक सुरक्षित रहे।
              </p>
            </div>

            {/* 8. Our Purpose */}
            <div style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "18px",
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              transition: "transform 0.3s ease, border-color 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#FEA603"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; }}
            >
              <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#FEA603", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
                🎯
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>हमारा उद्देश्य (Customer Trust)</h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.55, margin: 0 }}>
                केवल उत्पाद बेचना नहीं, बल्कि सही जानकारी और भरोसेमंद वारंटी सपोर्ट से दीर्घकालिक संबंध बनाना है।
              </p>
            </div>
          </div>

          {/* Download Brochure & Price List Banner */}
          <div style={{
            marginTop: "45px",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(254, 166, 3, 0.3)",
            borderRadius: "20px",
            padding: "24px 30px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px"
          }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 800, fontSize: "1.15rem", color: "#FEA603" }}>📄 Official MotoMax Dealer Price List & Specifications</div>
              <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>Download complete technical data sheets, battery pricing, and dealer margin schedules.</div>
            </div>
            <a
              href="/assets/MOTOMAX DEALER PRICE LIST.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)",
                color: "#ffffff",
                padding: "12px 26px",
                borderRadius: "30px",
                fontWeight: 800,
                textDecoration: "none",
                fontSize: "0.92rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(254, 166, 3, 0.35)"
              }}
            >
              <span>📥 Download Price List (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION: CUSTOM BATTERY OEM & MANUFACTURING CAPABILITIES ================= */}
      <section
        className="section-padding battery-oem-section"
        style={{
          background: "#ffffff",
          padding: "90px 5% 95px",
          borderTop: "1px solid #e2e8f0",
          position: "relative"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <div className="battery-badge-pill" style={{
            background: "rgba(254, 166, 3, 0.12)",
            color: "#d97706",
            border: "1px solid rgba(254, 166, 3, 0.35)"
          }}>
            <span>⚙️ OEM & CUSTOM BATTERY MANUFACTURING</span>
          </div>
          <h2 className="battery-section-heading" style={{ color: "#0f172a" }}>
            Custom Voltage & Capacity Engineering
          </h2>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "800px", margin: "0 auto 50px", lineHeight: 1.6 }}>
            Do you have unique energy storage or EV requirements? We custom design, assemble, and certify bespoke lithium battery packs with custom Smart BMS and heavy-duty enclosures.
          </p>

          <div className="battery-grid-cards" style={{ textAlign: "left" }}>
            {/* 24V / 36V */}
            <div className="battery-oem-card" style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "30px 24px",
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "#FEA603"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#d97706", background: "rgba(254,166,3,0.15)", display: "inline-block", padding: "4px 12px", borderRadius: "20px", marginBottom: "12px" }}>
                24V & 36V Series
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>Inverter & Medical Backup</h3>
              <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                30Ah to 100Ah capacities. Ideal for dental chairs, medical ventilators, low-voltage solar inverters, and emergency LED lighting.
              </p>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>• Active cell balancing • Wall mountable</div>
            </div>

            {/* 48V */}
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "30px 24px",
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "#FEA603"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#d97706", background: "rgba(254,166,3,0.15)", display: "inline-block", padding: "4px 12px", borderRadius: "20px", marginBottom: "12px" }}>
                48V Flagship ESS
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>Solar & E-Rickshaw Packs</h3>
              <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                50Ah to 200Ah high-energy units. Compatible with Growatt, Microtek, Luminous, and Deye hybrid solar inverters.
              </p>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>• RS485 / CAN communication • High C-rate</div>
            </div>

            {/* 60V */}
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "30px 24px",
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "#FEA603"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#d97706", background: "rgba(254,166,3,0.15)", display: "inline-block", padding: "4px 12px", borderRadius: "20px", marginBottom: "12px" }}>
                60V EV Mobility
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>Electric 2-Wheeler Fleet</h3>
              <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                30Ah to 45Ah portable swap batteries. Engineered for rugged Indian urban roads with shock-absorbent internal matrix.
              </p>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>• IP67 sealed aluminium box • AIS-156</div>
            </div>

            {/* 72V & 96V */}
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "20px",
              padding: "30px 24px",
              transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "#FEA603"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#d97706", background: "rgba(254,166,3,0.15)", display: "inline-block", padding: "4px 12px", borderRadius: "20px", marginBottom: "12px" }}>
                72V & 96V Heavy
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0" }}>High-Speed & Industrial</h3>
              <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.55, margin: "0 0 16px 0" }}>
                40Ah to 150Ah packs for sports motorcycles, golf carts, warehouse tuggers, and heavy commercial transport.
              </p>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>• 150A continuous discharge • Cloud IoT</div>
            </div>
          </div>

          <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <Link
              to="/contact-us"
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "30px",
                fontWeight: 800,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 20px rgba(254,166,3,0.25)"
              }}
            >
              Request Custom Battery Solution <span>➔</span>
            </Link>
            <Link
              to="/dealership"
              style={{
                background: "#0f172a",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: "30px",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              Apply For Battery Dealership <span>➔</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ELECTRIC SCOOTY / E-SCOOTER FOR SALE SECTION ================= */}
      <section
        className="section-padding scooty-showcase-section"
        style={{
          background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
          padding: "90px 5% 100px",
          borderTop: "1px solid #e2e8f0",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <style>{`
          .scooty-badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(254, 166, 3, 0.12);
            color: #d97706;
            border: 1px solid rgba(254, 166, 3, 0.35);
            padding: 6px 18px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 800;
            letter-spacing: 0.8px;
            text-transform: uppercase;
            margin-bottom: 14px;
          }
          .scooty-models-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            max-width: 1250px;
            margin: 45px auto 60px;
          }
          .scooty-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.35s ease;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .scooty-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 45px rgba(254, 166, 3, 0.15);
            border-color: #FEA603;
          }
          .scooty-card-tag {
            position: absolute;
            top: 16px;
            left: 16px;
            background: #0f172a;
            color: #FEA603;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.78rem;
            font-weight: 800;
            z-index: 2;
            letter-spacing: 0.5px;
          }
          .scooty-img-box {
            position: relative;
            height: 250px;
            background: #f1f5f9;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .scooty-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          .scooty-card:hover .scooty-img-box img {
            transform: scale(1.06);
          }
          .scooty-body {
            padding: 26px;
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .scooty-title {
            font-size: 1.45rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 8px 0;
          }
          .scooty-desc {
            font-size: 0.92rem;
            color: #64748b;
            line-height: 1.5;
            margin: 0 0 18px 0;
          }
          .scooty-specs-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            background: #f8fafc;
            padding: 16px;
            border-radius: 14px;
            border: 1px solid #f1f5f9;
            margin-bottom: 20px;
          }
          .scooty-spec-item {
            display: flex;
            flex-direction: column;
          }
          .scooty-spec-label {
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
          }
          .scooty-spec-val {
            font-size: 0.95rem;
            font-weight: 800;
            color: #1e293b;
          }
          .scooty-price-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 15px;
            border-top: 1px solid #f1f5f9;
          }
          .scooty-price-label {
            font-size: 0.8rem;
            color: #64748b;
          }
          .scooty-price-num {
            font-size: 1.45rem;
            font-weight: 900;
            color: #0f172a;
          }
          .scooty-cta-btn {
            background: linear-gradient(135deg, #FEA603 0%, #ff8c00 100%);
            color: #ffffff;
            font-weight: 700;
            padding: 12px 20px;
            border-radius: 10px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 0.92rem;
            box-shadow: 0 4px 14px rgba(254, 166, 3, 0.3);
            transition: all 0.25s ease;
            margin-top: 15px;
          }
          .scooty-cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(254, 166, 3, 0.45);
            color: #ffffff;
          }
          .scooty-feature-card {
            background: #ffffff;
            padding: 26px;
            border-radius: 18px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }
          .scooty-feature-card:hover {
            border-color: #FEA603;
            transform: translateY(-4px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.06);
          }
          @media (max-width: 768px) {
            .scooty-models-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div style={{ maxWidth: "1250px", margin: "0 auto", textAlign: "center" }}>
          {/* Section Header matching 'Lithium Battery & Inverter Battery Solutions for Home and EV' */}
          <div className="scooty-badge-pill">
            <span>🛵 DUAL CORE BUSINESS • ELECTRIC SCOOTY MOBILITY DIVISION</span>
          </div>
          <h1 className="section-title">
            Smart Electric Scooty Division
            <br />
            Showcase of High-Performance EV Two-Wheelers
          </h1>
          <p className="section-subtitle" style={{ maxWidth: "860px", margin: "0 auto 40px" }}>
            Alongside our advanced lithium battery manufacturing, MotoMax EV develops next-generation high-speed electric scooters engineered for urban commuters and commercial delivery fleets. Explore our technological lineup and certified EV models.
          </p>

          {/* Two-Column Feature Showcase matching the 'Who We Are' section format */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "35px",
              alignItems: "center",
              maxWidth: "1150px",
              margin: "0 auto 50px",
              textAlign: "left",
            }}
          >
            <div style={{ flex: "1 1 500px" }}>
              <p
                style={{
                  fontSize: "1.35rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.6",
                  marginBottom: "25px",
                  fontWeight: 500,
                }}
              >
                Transforming urban mobility with indigenous, emission-free electric scooters built specifically for rugged Indian road conditions and all-weather reliability.
              </p>
              <div
                style={{
                  background: "var(--secondary)",
                  padding: "2rem",
                  borderRadius: "30px 0 30px 30px",
                  color: "var(--text-main)",
                  lineHeight: "1.65",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                }}
              >
                <p style={{ margin: "0 0 15px 0", fontSize: "1rem" }}>
                  Equipped with portable home-charging lithium battery packs, regenerative braking, anti-theft smart lock, and zero engine maintenance. Engineered for daily commuters, students, and logistics fleets seeking up to 85% reduction in running expenses.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px", paddingTop: "15px", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>
                    <span style={{ color: "#FEA603" }}>✓</span> 130+ KM Real Range
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>
                    <span style={{ color: "#FEA603" }}>✓</span> ~15 Paise / KM Cost
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>
                    <span style={{ color: "#FEA603" }}>✓</span> 3-Year Battery Warranty
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.92rem", color: "#0f172a" }}>
                    <span style={{ color: "#FEA603" }}>✓</span> Portable Home Charge
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                flex: "1 1 440px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "480px",
                  borderRadius: "26px",
                  overflow: "hidden",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.12)",
                  border: "4px solid #ffffff",
                  background: "#0f172a",
                }}
              >
                <img
                  src="/assets/motomax-scooty-fleet.jpg"
                  alt="MotoMax Electric Scooty Showroom & Fleet"
                  style={{
                    width: "100%",
                    height: "auto",
                    minHeight: "340px",
                    maxHeight: "430px",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/slider-3.jpg";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    background: "rgba(15, 23, 42, 0.90)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "14px",
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    border: "1px solid rgba(254, 166, 3, 0.35)",
                  }}
                >
                  <div style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "#FEA603",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    flexShrink: 0
                  }}>
                    🛵
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#FEA603" }}>500+ Showrooms Pan-India</div>
                    <div style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>Test rides & institutional inquiries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Quick Stats Pill Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", margin: "35px auto 20px", maxWidth: "900px" }}>
            <div style={{ background: "#ffffff", padding: "10px 20px", borderRadius: "30px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
              <span style={{ fontSize: "1.1rem" }}>⚡</span> 130+ KM Certified Range
            </div>
            <div style={{ background: "#ffffff", padding: "10px 20px", borderRadius: "30px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
              <span style={{ fontSize: "1.1rem" }}>🔋</span> 0-80% in 3.5 Hours
            </div>
            <div style={{ background: "#ffffff", padding: "10px 20px", borderRadius: "30px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
              <span style={{ fontSize: "1.1rem" }}>🛡️</span> 3 Yrs / 50,000 KM Warranty
            </div>
            <div style={{ background: "#ffffff", padding: "10px 20px", borderRadius: "30px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
              <span style={{ fontSize: "1.1rem" }}>💰</span> Running Cost: ~15 Paise / KM
            </div>
          </div>

          {/* Scooter Models Showcase Grid */}
          <div className="scooty-models-grid" style={{ textAlign: "left" }}>
            {/* Model 1 */}
            <div className="scooty-card">
              <span className="scooty-card-tag">🏙️ Smart City Commuter</span>
              <div className="scooty-img-box">
                <img
                  src="/assets/scooter-cityglide.jpg"
                  alt="MotoMax CityGlide EX Electric Scooter"
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.src = "/assets/1.png"; }}
                />
              </div>
              <div className="scooty-body">
                <h3 className="scooty-title">MotoMax CityGlide EX</h3>
                <p className="scooty-desc">
                  Sleek, lightweight, and engineered for effortless city maneuvering with portable home charging.
                </p>

                <div className="scooty-specs-grid">
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Certified Range</span>
                    <span className="scooty-spec-val">85 - 95 KM</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Top Speed</span>
                    <span className="scooty-spec-val">55 KM/H</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Battery Pack</span>
                    <span className="scooty-spec-val">60V 30Ah Lithium</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Charge Duration</span>
                    <span className="scooty-spec-val">3.5 Hours</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#f8fafc", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Ideal Commute</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>Daily Office & College</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#d97706", fontWeight: 700, background: "rgba(254,166,3,0.12)", padding: "4px 10px", borderRadius: "20px" }}>City Edition</span>
                </div>

                <Link to="/contact-us" className="scooty-cta-btn">
                  Explore Specifications & Features <span>➔</span>
                </Link>
              </div>
            </div>

            {/* Model 2 (Flagship) */}
            <div className="scooty-card" style={{ borderColor: "#FEA603", boxShadow: "0 15px 35px rgba(254,166,3,0.15)" }}>
              <span className="scooty-card-tag" style={{ background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)", color: "#fff" }}>⭐ High-Speed Sport EV</span>
              <div className="scooty-img-box">
                <img
                  src="/assets/scooter-stormpro.jpg"
                  alt="MotoMax Storm Pro Long Range Electric Scooter"
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.src = "/assets/2.png"; }}
                />
              </div>
              <div className="scooty-body">
                <h3 className="scooty-title">MotoMax Storm Pro</h3>
                <p className="scooty-desc">
                  High-speed performance scooter packed with IoT smart navigation, keyless start, and hyper range.
                </p>

                <div className="scooty-specs-grid">
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Certified Range</span>
                    <span className="scooty-spec-val" style={{ color: "#d97706" }}>135 - 145 KM</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Top Speed</span>
                    <span className="scooty-spec-val">80 KM/H</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Battery Pack</span>
                    <span className="scooty-spec-val">72V 42Ah NMC</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Fast Charge</span>
                    <span className="scooty-spec-val">2.8 Hours</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#f8fafc", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Performance Class</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>High-Speed Sport EV</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#16a34a", fontWeight: 700, background: "#dcfce7", padding: "4px 10px", borderRadius: "20px" }}>Dual Disc ABS</span>
                </div>

                <Link to="/contact-us" className="scooty-cta-btn">
                  Explore Specifications & Features <span>➔</span>
                </Link>
              </div>
            </div>

            {/* Model 3 (Cargo Fleet) */}
            <div className="scooty-card">
              <span className="scooty-card-tag">📦 Commercial & Delivery Fleet</span>
              <div className="scooty-img-box">
                <img
                  src="/assets/scooter-cargoev.jpg"
                  alt="MotoMax Cargo Delivery Heavy Duty Electric Scooter"
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  onError={(e) => { e.currentTarget.src = "/assets/3.png"; }}
                />
              </div>
              <div className="scooty-body">
                <h3 className="scooty-title">MotoMax Cargo EV</h3>
                <p className="scooty-desc">
                  Heavy-duty delivery workhorse with 200 kg payload capacity, dual-battery swap dock, and rough road suspension.
                </p>

                <div className="scooty-specs-grid">
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Certified Range</span>
                    <span className="scooty-spec-val">110 KM / pack</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Payload Capacity</span>
                    <span className="scooty-spec-val">200 KG</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Battery Pack</span>
                    <span className="scooty-spec-val">60V 35Ah LFP</span>
                  </div>
                  <div className="scooty-spec-item">
                    <span className="scooty-spec-label">Rear Carrier</span>
                    <span className="scooty-spec-val">Heavy Steel Rack</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#f8fafc", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>Commercial Duty</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>Logistics & Delivery</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#0369a1", fontWeight: 700, background: "#e0f2fe", padding: "4px 10px", borderRadius: "20px" }}>200 KG Payload</span>
                </div>

                <Link to="/contact-us" className="scooty-cta-btn">
                  Enquire Fleet Collaboration <span>➔</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div style={{ marginTop: "60px", textAlign: "left" }}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "25px", textAlign: "center" }}>
              Why MotoMax Electric Scooters Are Ahead of the Rest
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <div className="scooty-feature-card">
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🔌</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>Portable Home Charging</h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Detachable lightweight battery pack. Carry it upstairs like a laptop bag and charge directly from any standard home wall socket.
                </p>
              </div>

              <div className="scooty-feature-card">
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🌧️</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>IP67 Water & Dust Protection</h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Tested for Indian monsoon waterlogging and extreme dust conditions. Sealed electronics ensure complete peace of mind.
                </p>
              </div>

              <div className="scooty-feature-card">
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>📱</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>Smart Mobile Telematics</h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Live GPS tracking, anti-theft geo-fencing, speed governor settings, and battery State-of-Charge notifications directly on your smartphone.
                </p>
              </div>

              <div className="scooty-feature-card">
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>💵</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>Maximum Annual Savings</h4>
                <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                  Say goodbye to ₹100/L petrol. Electric charging costs just 15 paise/km, saving the average commuter over ₹35,000 every single year.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Showcase & Dealership Partnership Banner */}
          <div style={{
            marginTop: "60px",
            background: "linear-gradient(135deg, #090e17 0%, #1e293b 100%)",
            borderRadius: "24px",
            padding: "45px 35px",
            color: "#ffffff",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "25px",
            textAlign: "left"
          }}>
            <div style={{ maxWidth: "680px" }}>
              <span style={{ color: "#FEA603", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                ELECTRIC MOBILITY DIVISION
              </span>
              <h3 style={{ fontSize: "1.85rem", fontWeight: 900, margin: "8px 0 10px 0", color: "#fff" }}>
                Interested in Dealership, Fleet Collaboration or Model Inquiry?
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.98rem", margin: 0, lineHeight: 1.5 }}>
                Explore MotoMax EV's electric two-wheeler division for state franchises, regional distributorships, institutional fleet adoption, and customized battery integrations.
              </p>
            </div>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <Link to="/contact-us" style={{
                background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "30px",
                fontWeight: 800,
                textDecoration: "none",
                fontSize: "0.95rem",
                boxShadow: "0 8px 20px rgba(254,166,3,0.35)",
                display: "inline-block"
              }}>
                Enquire for Dealership ➔
              </Link>
              <a href="tel:+911148224444" style={{
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "14px 24px",
                borderRadius: "30px",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-block"
              }}>
                📞 Speak with EV Division
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
