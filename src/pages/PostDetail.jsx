import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_BASE = "http://localhost/assinment/php-backend/api";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs.php?id=${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div style={{padding: "100px", textAlign: "center"}}><h2>Loading Article...</h2></div>;
  }

  if (!post || !post.title) {
    return <div style={{padding: "100px", textAlign: "center"}}><h2>Article Not Found</h2></div>;
  }

  const title = post.title;

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(254,166,3,0.1) 0%, rgba(255,255,255,0) 100%)",
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
            {post.category || "Article"}
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
            Published on {post.created_at ? new Date(post.created_at).toLocaleDateString() : "MotoMax EV Insights"}
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
          src={post.image_url || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"}
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
          <div style={{whiteSpace: "pre-wrap"}}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
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
