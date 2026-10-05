import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
  const { slug } = useParams();

  // Format the slug into a readable title (e.g., "why-lithium-batteries" -> "Why Lithium Batteries")
  const formatTitle = (str) => {
    if (!str) return "Post Title";
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = formatTitle(slug);

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "#fff",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Article
          </span>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "var(--text-main)",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.1rem",
            }}
          >
            Published on MotoMax EV Insights
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        style={{
          padding: "40px 20px 80px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200"
          alt={title}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain",
            borderRadius: "20px",
            marginBottom: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        />

        <div
          style={{
            fontSize: "1.15rem",
            color: "var(--text-muted)",
            lineHeight: "1.8",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <p>
            Welcome to the detailed view of our latest article. This post covers the essential details regarding <strong>{title}</strong>. As the electric vehicle and energy storage markets continue to evolve, staying updated with the latest technological advancements is crucial for both businesses and consumers.
          </p>
          <p>
            Lithium-ion batteries have revolutionized the way we store and consume energy. From powering 2-wheelers and 3-wheelers to supporting massive industrial grids and solar setups, the demand for efficient, safe, and long-lasting energy storage is higher than ever.
          </p>
          <h3 style={{ color: "var(--text-main)", fontSize: "1.8rem", marginTop: "20px" }}>Key Takeaways</h3>
          <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <li>Advanced thermal management ensures safety and longevity.</li>
            <li>High energy density means more power in less space.</li>
            <li>Eco-friendly design supports a greener future.</li>
          </ul>
          <p>
            At MotoMax EV, we are committed to pushing the boundaries of what is possible. Stay tuned for more updates and insights from our team of experts.
          </p>
        </div>

        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <Link
            to="/blog"
            className="pulse-btn"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid var(--primary)",
              color: "var(--primary)",
              padding: "12px 30px",
              borderRadius: "30px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            ← Back to Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
