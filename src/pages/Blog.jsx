const Blog = () => {
  const blogPosts = [
    {
      title:
        "Why Lithium Batteries for home Lose Capacity Over Time: Causes & Prevention",
      excerpt:
        "Lithium batteries have become an increasingly popular choice for residential energy storage because they offer high energy density, long service...",
      img: "/assets/inverter-hero-house.jpg",
    },
    {
      title:
        "Hybrid Solar Inverter and Lithium Battery: How They Work Together",
      excerpt:
        "Solar energy is no longer just about generating electricity during the day. As electricity demand rises and power reliability becomes...",
      img: "/assets/solar-hero-bg.jpg",
    },
    {
      title: "Can a Battery Increase Your Electric Scooter Resale Value?",
      excerpt:
        "Buying an electric scooter is no longer just about saving money on fuel. Today, it is also about making a...",
      img: "/assets/scooter-hero.jpg",
    },
    {
      title: "Mistakes to Avoid When Buying an Inverter Battery for Home",
      excerpt:
        "Power cuts are still a common problem in many parts of India. Whether it's during peak summer, heavy rainfall, or...",
      img: "/assets/inverter-battery.jpg",
    },
    {
      title:
        "Battery Management System (BMS): The Technology Behind Safe, Efficient, and Long-Lasting Lithium...",
      excerpt:
        "The heart of every high-performance lithium battery lies not just in the cells, but in the intelligent system that governs...",
      img: "/assets/drone-battery-cluster.jpg",
    },
    {
      title:
        "Essential Battery Maintenance Tips to Extend the Life of Lithium-Ion Batteries",
      excerpt:
        "Lithium-ion batteries are durable, but proper maintenance can dramatically extend their lifespan and ensure safety...",
      img: "/assets/solar-black-battery.jpg",
    },
  ];

  const categories = [
    "E-Rickshaw",
    "Electric Scooter",
    "Energy Storage System",
    "EV Chargers",
    "Inverter",
    "Lithium Battery",
  ];

  return (
    <div
      className="responsive-page"
      style={{
        padding: "60px 20px",
        maxWidth: "1300px",
        margin: "0 auto",
        background: "#fff",
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            h1 { font-size: 2.2rem !important; margin-bottom: 30px !important; }
            div[style*="flex: 0 0 350px"] { flex: 1 1 100% !important; width: 100% !important; }
            div[style*="flex: 1 1 700px"] { flex: 1 1 100% !important; width: 100% !important; }
          }
        `}
      </style>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: 900,
          color: "#1f2937",
          marginBottom: "50px",
        }}
      >
        Blog
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* Main Blog Grid */}
        <div
          style={{
            flex: "1 1 700px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {blogPosts.map((post, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #f3f4f6",
                borderRadius: "15px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Image with MotoMax EV Watermark */}
              <div style={{ position: "relative", height: "220px" }}>
                <img
                  src={post.img}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Simulated Watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(255, 255, 255, 0.9)",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    color: "#ff6600",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    letterSpacing: "1px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  MOTOMAX EV
                </div>
              </div>

              <div
                style={{
                  padding: "25px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: "1.4",
                    marginBottom: "15px",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    flexGrow: 1,
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      background: "#1f2937",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    ➔
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div
          style={{
            flex: "0 0 350px",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {/* Recent Posts Widget */}
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              border: "1px solid #f9fafb",
            }}
          >
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111",
                textTransform: "uppercase",
                marginBottom: "20px",
                position: "relative",
                paddingBottom: "10px",
              }}
            >
              RECENT POSTS
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "#ff6600",
                }}
              ></div>
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {blogPosts.slice(0, 5).map((post, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    style={{
                      width: "70px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <h5
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#374151",
                        lineHeight: "1.3",
                        marginBottom: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {post.title.length > 50
                        ? post.title.substring(0, 50) + "..."
                        : post.title}
                    </h5>
                    <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      Oct 1, 2026
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Widget */}
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              border: "1px solid #f9fafb",
            }}
          >
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#111",
                textTransform: "uppercase",
                marginBottom: "20px",
                position: "relative",
                paddingBottom: "10px",
              }}
            >
              BLOG CATEGORIES
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  background: "#ff6600",
                }}
              ></div>
            </h4>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {categories.map((category, index) => (
                <li
                  key={index}
                  style={{
                    borderBottom:
                      index !== categories.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
                    padding: "12px 0",
                    fontSize: "0.95rem",
                    color: "#4b5563",
                    cursor: "pointer",
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
