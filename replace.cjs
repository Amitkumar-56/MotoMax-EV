const fs = require('fs');

const file = 'src/pages/Home.jsx';
const content = fs.readFileSync(file, 'utf8');

const replacement = `      {/* Products Section Redesign */}
      <section
        id="products-section"
        style={{
          padding: "80px 20px",
          background: "linear-gradient(to bottom, #fffaf6 0%, #ffffff 100%)",
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
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto 50px", lineHeight: 1.6 }}>
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
            {\`
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
                max-height: 90%;
                max-width: 90%;
                object-fit: contain;
                z-index: 2;
                transition: transform 0.4s ease;
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
            \`}
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
                img: "/assets/nav-automotive.jpg",
                title: "Automotive Lithium Battery",
                desc: "Reliable energy for every journey.",
                blob: "linear-gradient(135deg, rgba(255,235,214,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/lithium-inverter-battery-home",
                img: "/assets/inverter-battery.jpg",
                title: "Inverter Lithium Battery",
                desc: "Stable power, smarter living.",
                blob: "linear-gradient(135deg, rgba(214,235,255,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/solar-street-light-storage",
                img: "/assets/solar-battery-cluster.jpg",
                title: "Lithium Battery Solar App.",
                desc: "Clean energy for a brighter tomorrow.",
                blob: "linear-gradient(135deg, rgba(214,255,235,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/solid-state",
                img: "/assets/drone-single-battery.jpg",
                title: "Drone Lithium Battery",
                desc: "More flight time, more possibilities.",
                blob: "linear-gradient(135deg, rgba(240,214,255,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/charger",
                img: "/assets/nav-automotive.jpg",
                title: "EV Charger",
                desc: "Charge today, drive tomorrow.",
                blob: "linear-gradient(135deg, rgba(214,255,248,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/inverter",
                img: "/assets/inverter-hero-house.jpg",
                title: "Inverter",
                desc: "Efficient power for your home & business.",
                blob: "linear-gradient(135deg, rgba(255,214,214,1) 0%, rgba(255,255,255,0) 100%)"
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
                img: "/assets/nav-automotive.jpg",
                title: "Automotive Lithium Battery",
                desc: "Reliable energy for every journey.",
                blob: "linear-gradient(135deg, rgba(255,235,214,1) 0%, rgba(255,255,255,0) 100%)"
              },
              {
                to: "/products/lithium-inverter-battery-home",
                img: "/assets/inverter-battery.jpg",
                title: "Inverter Lithium Battery",
                desc: "Stable power, smarter living.",
                blob: "linear-gradient(135deg, rgba(214,235,255,1) 0%, rgba(255,255,255,0) 100%)"
              }
            ].map((prod, idx) => (
              <Link key={\`dup-\${idx}\`} to={prod.to} className="attractive-card">
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
      </section>`;

const startIndex = content.indexOf('{/* Products Section */}');
const endIndex = content.indexOf('      {/* Industries We Serve Section */}');

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = content.substring(0, startIndex) + replacement + '\n\n' + content.substring(endIndex);
  fs.writeFileSync(file, newContent);
  console.log('Successfully replaced');
} else {
  console.log('Could not find boundaries');
}
