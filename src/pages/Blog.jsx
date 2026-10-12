import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs.php`)
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="responsive-page"
      style={{
        padding: "60px 20px",
        maxWidth: "1300px",
        margin: "0 auto",
        background: "var(--bg-main)",
        minHeight: "100vh"
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .responsive-page { padding: 30px 15px !important; }
            h1 { font-size: 2.2rem !important; margin-bottom: 30px !important; }
          }
          .blog-card {
            background: #fff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
          }
          .blog-card:hover {
            transform: translateY(-10px);
          }
          .blog-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
          .blog-content {
            padding: 20px;
          }
          .blog-content h3 {
            font-size: 1.25rem;
            color: #1e293b;
            margin-bottom: 10px;
          }
          .blog-content p {
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.5;
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
        Live News & Blogs
      </h1>

      {loading ? (
        <h2 style={{textAlign: "center"}}>Loading latest blogs...</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`} className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div>
                <img src={post.image_url || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"} alt={post.title} />
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <div style={{color: "#FEA603", fontWeight: "bold", marginBottom: "10px", fontSize: "0.85rem"}}>{post.category}</div>
                <p>{post.content.substring(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
