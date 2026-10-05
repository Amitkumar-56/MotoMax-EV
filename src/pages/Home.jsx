import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderItems = [
    {
      type: "video",
      src: "/assets/home-video.mp4",
    },
    { type: "image", src: "/assets/1.png", title: "INDIA'S LEADING ENERGY TECHNOLOGY COMPANY", subtitle: "Pioneering the EV Revolution Across the Globe" },
    { type: "image", src: "/assets/2.png", title: "ADVANCED LITHIUM BATTERY PACKS", subtitle: "Powering the Future of Mobility" },
    { type: "image", src: "/assets/3.png", title: "SMART ENERGY STORAGE SOLUTIONS", subtitle: "Reliable Backup for Homes & Industries" },
    { type: "image", src: "/assets/4.png", title: "HIGH PERFORMANCE EV CHARGERS", subtitle: "Fast, Safe, and Efficient Charging" },
    { type: "image", src: "/assets/5.png", title: "INNOVATING GREEN TECHNOLOGY", subtitle: "Building a Sustainable Tomorrow" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const productSliderRef = useRef(null);

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
    let heroTimeout;
    
    // Auto scroll logic for hero (only if not a video)
    if (sliderItems[currentSlide].type !== "video") {
      heroTimeout = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
      }, 3000);
    }

    // Product Slider Auto-scroll Interval
    const productInterval = setInterval(() => {
      if (productSliderRef.current && productSliderRef.current.children.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } =
          productSliderRef.current;
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
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}

            {/* Dark overlay for better text readability */}
            {item.type !== "video" && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.4)"
              }}></div>
            )}
          </div>
        ))}

        {/* Dynamic Text Overlay */}
        {sliderItems[currentSlide].type !== "video" && (
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
            <h1 className="hero-title">
              {sliderItems[currentSlide].title}
            </h1>
            <h2 className="hero-subtitle">
              {sliderItems[currentSlide].subtitle}
            </h2>
            <button
              className="hero-btn pulse-btn"
              style={{ pointerEvents: "auto" }}
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore More &rarr;
            </button>
          </div>
        )}

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
              flex: "1 1 400px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fcefe3",
                borderRadius: "30px",
                padding: "0 20px",
                display: "inline-block",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                alt="CEO"
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  display: "block",
                  borderRadius: "30px",
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))",
                }}
              />
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
            <circle cx="5" cy="5" r="2"/><circle cx="20" cy="5" r="2"/><circle cx="35" cy="5" r="2"/>
            <circle cx="5" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><circle cx="35" cy="20" r="2"/>
            <circle cx="5" cy="35" r="2"/><circle cx="20" cy="35" r="2"/><circle cx="35" cy="35" r="2"/>
          </svg>
        </div>
        <div style={{ position: "absolute", top: "20%", right: "5%", opacity: 0.05, zIndex: 0 }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--primary)">
            <path d="M17 8C8 10 5 16 5 22C11 22 17 15 17 8ZM12 12C9 14 7 17 6 19C7 18 9 15 12 12Z"/>
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h4 style={{ color: "var(--primary)", textTransform: "uppercase", fontSize: "1rem", letterSpacing: "2px", fontWeight: 700, marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <span style={{ width: "40px", height: "2px", background: "rgba(255,102,0,0.3)" }}></span>
            OUR PRODUCTS
            <span style={{ width: "40px", height: "2px", background: "rgba(255,102,0,0.3)" }}></span>
          </h4>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, color: "#1a1a1a", marginBottom: "15px" }}>
            Powering a Cleaner, <span style={{ color: "var(--primary)" }}>Greener</span> Tomorrow
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto 0", lineHeight: 1.6 }}>
            Explore our wide range of innovative EV and energy solutions designed for a sustainable and smarter future.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            maxWidth: "1350px",
            margin: "0 auto",
            padding: "0 50px"
          }}
        >
          {/* Left Arrow */}
          <button
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
              }
              .attractive-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 40px rgba(255,102,0,0.1);
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
                border-radius: 8px;
                object-fit: contain;
                background: #fff;
                border: 1px solid rgba(0,0,0,0.08);
                padding: 15px;
                z-index: 2;
                transition: transform 0.4s ease, box-shadow 0.4s ease;
                box-shadow: 0 4px 10px rgba(0,0,0,0.04);
              }
              .attractive-card:hover .card-icon-wrapper img {
                transform: scale(1.1);
              }
              .card-arrow-btn {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: rgba(255,102,0,0.1);
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
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "10px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {[
              {
                to: "/products/electric-scooter-battery",
                img: "/assets/1.png",
                title: "Automotive Lithium Battery",
                desc: "Reliable energy for every journey.",
                blob: "#ffffff"
              },
              {
                to: "/products/lithium-inverter-battery-home",
                img: "/assets/2.png",
                title: "Inverter Lithium Battery",
                desc: "Stable power, smarter living.",
                blob: "#ffffff"
              },
              {
                to: "/products/solar-street-light-storage",
                img: "/assets/3.png",
                title: "Lithium Battery Solar App.",
                desc: "Clean energy for a brighter tomorrow.",
                blob: "#ffffff"
              },
              {
                to: "/products/solid-state",
                img: "/assets/4.png",
                title: "Drone Lithium Battery",
                desc: "More flight time, more possibilities.",
                blob: "#ffffff"
              },
              {
                to: "/products/charger",
                img: "/assets/5.png",
                title: "EV Charger",
                desc: "Charge today, drive tomorrow.",
                blob: "#ffffff"
              },
              {
                to: "/products/inverter",
                img: "/assets/6.png",
                title: "Inverter",
                desc: "Efficient power for your home & business.",
                blob: "#ffffff"
              }
            ].map((prod, idx) => (
              <Link key={idx} to={prod.to} className="attractive-card">
                <div className="card-icon-wrapper" style={{ background: prod.blob }}>
                  <img src={prod.img} alt={prod.title} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px", lineHeight: 1.3, minHeight: "44px" }}>
                  {prod.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#666", flexGrow: 1, margin: 0, minHeight: "40px" }}>
                  {prod.desc}
                </p>
                <div className="card-arrow-btn">
                  &#8594;
                </div>
              </Link>
            ))}
            
            {/* Duplicates for endless scroll illusion */}
            {[
              {
                to: "/products/electric-scooter-battery",
                img: "/assets/1.png",
                title: "Automotive Lithium Battery",
                desc: "Reliable energy for every journey.",
                blob: "#ffffff"
              },
              {
                to: "/products/lithium-inverter-battery-home",
                img: "/assets/2.png",
                title: "Inverter Lithium Battery",
                desc: "Stable power, smarter living.",
                blob: "#ffffff"
              }
            ].map((prod, idx) => (
              <Link key={`dup-${idx}`} to={prod.to} className="attractive-card">
                <div className="card-icon-wrapper" style={{ background: prod.blob }}>
                  <img src={prod.img} alt={prod.title} />
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px", lineHeight: 1.3, minHeight: "44px" }}>
                  {prod.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#666", flexGrow: 1, margin: 0, minHeight: "40px" }}>
                  {prod.desc}
                </p>
                <div className="card-arrow-btn">
                  &#8594;
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
          <span style={{ width: "30px", height: "2px", background: "rgba(255,102,0,0.3)" }}></span>
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
              boxShadow: "0 10px 20px rgba(255,102,0,0.2)",
              transition: "transform 0.3s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            View All Products <span>&#8594;</span>
          </Link>
          <span style={{ width: "30px", height: "2px", background: "rgba(255,102,0,0.3)" }}></span>
        </div>
      </section>



      {/* Latest From Blog Section */}
      <section className="section-padding text-center">
        <h2 className="section-title">Latest From Blog</h2>
        <div
          style={{
            maxWidth: "1200px",
            margin: "40px auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          <Link to="/post/why-lithium-batteries-lose-capacity" className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400"
              alt="Blog 1"
            />
            <div className="blog-content">
              <h3>
                Why Lithium Batteries for home Lose Capacity Over Time: Causes &
                Prevention
              </h3>
              <p>
                Lithium batteries have become an increasingly popular choice for
                residential energy storage because they offer high energy
                density, long service...
              </p>
              <div className="arrow-btn">➔</div>
            </div>
          </Link>

          <Link to="/post/hybrid-solar-inverter" className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400"
              alt="Blog 2"
            />
            <div className="blog-content">
              <h3>
                Hybrid Solar Inverter and Lithium Battery: How They Work
                Together
              </h3>
              <p>
                Solar energy is no longer just about generating electricity
                during the day. As electricity demand rises and power
                reliability becomes...
              </p>
              <div className="arrow-btn">➔</div>
            </div>
          </Link>

          <Link to="/post/increase-electric-scooter-resale" className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <img
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400"
              alt="Blog 3"
            />
            <div className="blog-content">
              <h3>
                Can a Battery Increase Your Electric Scooter Resale Value?
              </h3>
              <p>
                Buying an electric scooter is no longer just about saving money
                on fuel. Today, it is also about making a smart investment in
                green mobility...
              </p>
              <div className="arrow-btn">➔</div>
            </div>
          </Link>
        </div>
      </section>

      {/* News & Events Dynamic Section */}
      <section
        className="section-padding"
        style={{
          background: "var(--bg-main)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            className="section-title"
            style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: "var(--text-main)",
              marginBottom: "10px",
            }}
          >
            News & Events
          </h2>
          <p
            style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "50px" }}
          >
            Stay updated with the latest happenings at MotoMax EV
          </p>

          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                gap: "30px",
                overflowX: "auto",
                scrollBehavior: "smooth",
                padding: "20px 10px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
              className="news-slider-container"
            >
              <style>
                {`
                  .news-slider-container::-webkit-scrollbar { display: none; }
                  .news-card-dynamic {
                    flex: 0 0 400px;
                    height: 450px;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                    cursor: pointer;
                    text-align: left;
                  }
                  .news-card-dynamic:hover {
                    transform: translateY(-10px);
                  }
                  .news-card-dynamic img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                  }
                  .news-card-dynamic:hover img {
                    transform: scale(1.1);
                  }
                  .news-card-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%);
                    padding: 40px 25px 25px;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                  }
                  .news-date-badge {
                    background: var(--primary);
                    color: #fff;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    align-self: flex-start;
                    margin-bottom: 15px;
                  }
                  @media (max-width: 768px) {
                    .news-card-dynamic { flex: 0 0 300px; height: 380px; }
                  }
                  @media (max-width: 480px) {
                    .news-card-dynamic { flex: 0 0 260px; height: 350px; }
                  }
                `}
              </style>

              {/* News Item 1 */}
              <Link to="/post/featured-in-battery-magazine" className="news-card-dynamic" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600"
                  alt="News 1"
                />
                <div className="news-card-overlay">
                  <div className="news-date-badge">15 Sep 2026</div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Featured in The Battery Magazine
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#ddd",
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    We're proud to be featured in the September 2026 issue,
                    highlighting our journey and contributions to the EV
                    ecosystem.
                  </p>
                </div>
              </Link>

              {/* News Item 2 */}
              <Link to="/post/future-proofing-india" className="news-card-dynamic" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600"
                  alt="News 2"
                />
                <div className="news-card-overlay">
                  <div className="news-date-badge">28 Aug 2026</div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Future-Proofing India's Clean Mobility
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#ddd",
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Featured on EV Tech News exploring our strategic focus on
                    in-house R&D and tech adaptability.
                  </p>
                </div>
              </Link>

              {/* News Item 3 */}
              <Link to="/post/pioneering-next-frontier" className="news-card-dynamic" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
                  alt="News 3"
                />
                <div className="news-card-overlay">
                  <div className="news-date-badge">10 Jul 2026</div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Pioneering the Next Frontier
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#ddd",
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Motorindia covers our transformation of the landscape from
                    e-rickshaws to modern EV infrastructure.
                  </p>
                </div>
              </Link>

              {/* News Item 4 (for scrollability) */}
              <Link to="/post/solid-state-launch" className="news-card-dynamic" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600"
                  alt="News 4"
                />
                <div className="news-card-overlay">
                  <div className="news-date-badge">05 Jun 2026</div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Launch of Next-Gen Solid State Batteries
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#ddd",
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Announcing our newest lightweight drone and solar batteries
                    to the global market.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div style={{ marginTop: "40px", marginBottom: "30px" }}>
            <Link
              to="/news-events"
              className="btn-primary"
              style={{
                padding: "15px 40px",
                fontSize: "1.1rem",
                borderRadius: "30px",
                display: "inline-block"
              }}
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
