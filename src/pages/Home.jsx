import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const sliderItems = [
    {
      type: "video",
      src: "/assets/home-video.mp4",
    },
    { type: "image", src: "/assets/slider-1.jpg", title: "INDIA'S LEADING ENERGY TECHNOLOGY COMPANY", subtitle: "Pioneering the EV Revolution Across the Globe" },
    { type: "image", src: "/assets/slider-2.jpg", title: "ADVANCED LITHIUM BATTERY PACKS", subtitle: "Powering the Future of Mobility" },
    { type: "image", src: "/assets/slider-3.jpg", title: "SMART ENERGY STORAGE SOLUTIONS", subtitle: "Reliable Backup for Homes & Industries" },
    { type: "image", src: "/assets/slider-4.jpg", title: "HIGH PERFORMANCE EV CHARGERS", subtitle: "Fast, Safe, and Efficient Charging" },
    { type: "image", src: "/assets/slider-5.jpg", title: "INNOVATING GREEN TECHNOLOGY", subtitle: "Building a Sustainable Tomorrow" },
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

      {/* Products Section */}
      <section id="products-section" className="section-padding text-center">
        <h2 className="section-title text-7xl" >Products</h2>

        <div
          style={{
            position: "relative",
            maxWidth: "1200px",
            margin: "10px auto 0",
          }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollProducts("left")}
            style={{
              position: "absolute",
              left: "-20px",
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "var(--bg-main)",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            &#8249;
          </button>

          <button
            onClick={() => scrollProducts("right")}
            style={{
              position: "absolute",
              right: "-20px",
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "var(--bg-main)",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              fontSize: "1.5rem",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            &#8250;
          </button>

          {/* Slider Container */}
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div
            ref={productSliderRef}
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: "30px",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "10px 5px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <Link to="/products/electric-scooter-battery" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/nav-automotive.jpg"
                  alt="Automotive Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>AUTOMOTIVE LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Engineered for electric mobility, including scooters and bikes.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/lithium-inverter-battery-home" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/inverter-battery.jpg"
                  alt="Inverter Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>INVERTER LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Reliable power backup solutions for homes and small offices.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/solar-street-light-storage" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/solar-battery-cluster.jpg"
                  alt="Solar Application"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>
                LITHIUM BATTERY SOLAR APPLICATION
              </h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Smart energy storage for solar installations and street lights.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/solid-state" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/drone-single-battery.jpg"
                  alt="Drone Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>DRONE LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Lightweight, high-capacity batteries engineered for advanced
                drones.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/charger" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/nav-automotive.jpg"
                  alt="EV Charger"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>EV CHARGER</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Fast and reliable chargers for all types of electric vehicles.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/inverter" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/inverter-hero-house.jpg"
                  alt="Inverter"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>INVERTER</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Sleek, durable device with flexible connectivity and easy
                installation.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            {/* Duplicated for endless slider effect */}
            <Link to="/products/electric-scooter-battery" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/nav-automotive.jpg"
                  alt="Automotive Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>AUTOMOTIVE LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Engineered for electric mobility, including scooters and bikes.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/lithium-inverter-battery-home" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/inverter-battery.jpg"
                  alt="Inverter Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>INVERTER LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Reliable power backup solutions for homes and small offices.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/solar-street-light-storage" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/solar-battery-cluster.jpg"
                  alt="Solar Application"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>
                LITHIUM BATTERY SOLAR APPLICATION
              </h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Smart energy storage for solar installations and street lights.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/solid-state" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/drone-single-battery.jpg"
                  alt="Drone Lithium Battery"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>DRONE LITHIUM BATTERY</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Lightweight, high-capacity batteries engineered for advanced
                drones.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/charger" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/nav-automotive.jpg"
                  alt="EV Charger"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>EV CHARGER</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Fast and reliable chargers for all types of electric vehicles.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>

            <Link to="/products/inverter" className="product-card-light product-slide-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div className="product-card-img-wrapper">
                <img
                  src="/assets/inverter-hero-house.jpg"
                  alt="Inverter"
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <h3 style={{ fontSize: "0.9rem" }}>INVERTER</h3>
              <p style={{ flexGrow: 1, fontSize: "0.8rem" }}>
                Sleek, durable device with flexible connectivity and easy
                installation.
              </p>
              <span
                className="view-more-btn"
                style={{ padding: "8px 15px", fontSize: "0.8rem", display: "inline-block", marginTop: "auto", textAlign: "center" }}
              >
                View More
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="section-padding">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            alignItems: "center",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <h4
              style={{
                color: "#e0e0e0",
                fontSize: "3rem",
                fontWeight: 900,
                textTransform: "uppercase",
                marginBottom: "-20px",
                zIndex: -1,
                position: "relative",
              }}
            >
              Industries We Serve
            </h4>
            <h2
              className="section-title"
              style={{ fontSize: "3rem", marginBottom: "20px" }}
            >
              Residential
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              Smart energy storage and backup battery solutions for homes and
              small industries - ensuring uninterrupted power, efficiency, and a
              greener future.
            </p>
          </div>

          <div style={{ flex: "1 1 500px" }}>
            <div
              style={{
                background: "#aae5f5",
                borderRadius: "30px",
                padding: "40px",
                position: "relative",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600"
                alt="Residential Solar"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.2))",
                }}
              />
            </div>
          </div>
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
          <div className="blog-card">
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
          </div>

          <div className="blog-card">
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
          </div>

          <div className="blog-card">
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
          </div>
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
              <div className="news-card-dynamic">
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
              </div>

              {/* News Item 2 */}
              <div className="news-card-dynamic">
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
              </div>

              {/* News Item 3 */}
              <div className="news-card-dynamic">
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
              </div>

              {/* News Item 4 (for scrollability) */}
              <div className="news-card-dynamic">
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
              </div>
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
