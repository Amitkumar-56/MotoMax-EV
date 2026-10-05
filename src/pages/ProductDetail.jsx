import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  // Format the ID into a readable title (e.g., "solar-bot-1" -> "Solar Bot 1")
  const formatTitle = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = formatTitle(id);

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            color: "var(--text-main)",
            marginBottom: "20px",
            textTransform: "uppercase"
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "var(--text-muted)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.6",
          }}
        >
          Experience next-generation performance and reliability with our premium {title}. Engineered to perfection for MotoMax EV's leading standards.
        </p>
      </section>

      {/* Content Section */}
      <section
        style={{
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left Side: Image */}
        <div style={{ flex: "1 1 500px" }}>
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800"
              alt={title}
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div style={{ flex: "1 1 500px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "20px",
            }}
          >
            Why Choose {title}?
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 30px 0",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {[
              "High Energy Density for longer durations.",
              "Smart Battery Management System (BMS) included.",
              "Fast charging capabilities with zero heating issues.",
              "Eco-friendly and sustainable architecture.",
            ].map((feature, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                }}
              >
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </div>
                {feature}
              </li>
            ))}
          </ul>
          
          <Link
            to="/contact-us"
            className="pulse-btn"
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "#fff",
              padding: "15px 35px",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textDecoration: "none"
            }}
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
