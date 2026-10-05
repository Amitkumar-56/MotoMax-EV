import { Link } from "react-router-dom";

const Products = () => {
  const allProducts = [
    {
      to: "/products/electric-scooter-battery",
      img: "/assets/nav-automotive.jpg",
      title: "Automotive Lithium Battery",
      desc: "Reliable energy for every journey.",
    },
    {
      to: "/products/lithium-inverter-battery-home",
      img: "/assets/inverter-battery.jpg",
      title: "Inverter Lithium Battery",
      desc: "Stable power, smarter living.",
    },
    {
      to: "/products/solar-street-light-storage",
      img: "/assets/solar-battery-cluster.jpg",
      title: "Lithium Battery Solar App.",
      desc: "Clean energy for a brighter tomorrow.",
    },
    {
      to: "/products/solid-state",
      img: "/assets/drone-single-battery.jpg",
      title: "Drone Lithium Battery",
      desc: "More flight time, more possibilities.",
    },
    {
      to: "/products/charger",
      img: "/assets/nav-automotive.jpg", // fallback image or actual if different
      title: "EV Charger",
      desc: "Charge today, drive tomorrow.",
    },
    {
      to: "/products/inverter",
      img: "/assets/inverter-hero-house.jpg",
      title: "Inverter",
      desc: "Efficient power for your home & business.",
    },
    {
      to: "/products/2-wheeler",
      img: "/assets/nav-automotive.jpg",
      title: "2 Wheeler Battery",
      desc: "High performance for your daily commute.",
    },
    {
      to: "/products/3-wheeler",
      img: "/assets/nav-automotive.jpg",
      title: "3 Wheeler Battery",
      desc: "Durable energy for commercial use.",
    },
    {
      to: "/products/golf-cart",
      img: "/assets/nav-automotive.jpg",
      title: "Golf Cart Battery",
      desc: "Long-lasting power for the greens.",
    }
  ];

  return (
    <div style={{ padding: "100px 20px", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--text-main)", textAlign: "center", marginBottom: "15px" }}>
          All Products
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", textAlign: "center", marginBottom: "50px", maxWidth: "700px", margin: "0 auto 50px" }}>
          Explore our complete range of EV and energy solutions.
        </p>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "30px" 
        }}>
          {allProducts.map((prod, idx) => (
            <Link 
              key={idx} 
              to={prod.to} 
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px 20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                border: "1px solid rgba(0,0,0,0.02)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(255,102,0,0.1)";
                e.currentTarget.querySelector('.card-arrow-btn').style.background = "var(--primary)";
                e.currentTarget.querySelector('.card-arrow-btn').style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                e.currentTarget.querySelector('.card-arrow-btn').style.background = "rgba(255,102,0,0.1)";
                e.currentTarget.querySelector('.card-arrow-btn').style.color = "var(--primary)";
              }}
            >
              <div style={{
                width: "100%",
                height: "180px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                position: "relative",
                overflow: "hidden",
                background: "#f9f9f9"
              }}>
                <img 
                  src={prod.img} 
                  alt={prod.title} 
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "15px",
                    zIndex: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.04)"
                  }}
                />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px", textAlign: "center" }}>
                {prod.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#666", textAlign: "center", flexGrow: 1, margin: 0 }}>
                {prod.desc}
              </p>
              <div 
                className="card-arrow-btn"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,102,0,0.1)",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                  transition: "all 0.3s ease",
                  fontSize: "1.2rem"
                }}
              >
                &#8594;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
