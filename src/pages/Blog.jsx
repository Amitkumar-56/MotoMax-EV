import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      title:
        "Why Lithium Batteries for home Lose Capacity Over Time: Causes & Prevention",
      excerpt:
        "Lithium batteries have become an increasingly popular choice for residential energy storage because they offer high energy density, long service...",
      img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600",
    },
    {
      title:
        "Hybrid Solar Inverter and Lithium Battery: How They Work Together",
      excerpt:
        "Solar energy is no longer just about generating electricity during the day. As electricity demand rises and power reliability becomes...",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Can a Battery Increase Your Electric Scooter Resale Value?",
      excerpt:
        "Buying an electric scooter is no longer just about saving money on fuel. Today, it is also about making a smart investment in green mobility...",
      img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Mistakes to Avoid When Buying an Inverter Battery for Home",
      excerpt:
        "Power cuts are still a common problem in many parts of India. Whether it's during peak summer, heavy rainfall, or...",
      img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600",
    },
    {
      title:
        "Battery Management System (BMS): The Technology Behind Safe, Efficient, and Long-Lasting Lithium...",
      excerpt:
        "The heart of every high-performance lithium battery lies not just in the cells, but in the intelligent system that governs...",
      img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=600",
    },
    {
      title:
        "Essential Battery Maintenance Tips to Extend the Life of Lithium-Ion Batteries",
      excerpt:
        "Lithium-ion batteries are durable, but proper maintenance can dramatically extend their lifespan and ensure safety...",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div
      className="responsive-page"
      style={{
        padding: "60px 20px",
        maxWidth: "1300px",
        margin: "0 auto",
        background: "var(--bg-main)",
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .responsive-page { padding: 30px 15px !important; }
            h1 { font-size: 2.2rem !important; margin-bottom: 30px !important; }
          }
        `}
      </style>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: 900,
          color: "var(--text-main)",
          marginBottom: "50px",
        }}
      >
        Blog
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {blogPosts.map((post, index) => (
          <Link key={index} to={`/post/blog-${index + 1}`} className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ overflow: "hidden" }}>
              <img src={post.img} alt={`Blog ${index + 1}`} />
            </div>
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="arrow-btn">➔</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
