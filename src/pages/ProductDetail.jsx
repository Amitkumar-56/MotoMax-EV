import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_BASE = "http://localhost/assinment/php-backend/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/products.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{padding: "100px", textAlign: "center"}}><h2>Loading Product...</h2></div>;
  }

  if (!product || !product.name) {
    return <div style={{padding: "100px", textAlign: "center"}}><h2>Product Not Found</h2></div>;
  }

  const handleAction = (e, productId, actionType, redirect = false) => {
    e.preventDefault();
    e.stopPropagation();
    
    const userStr = localStorage.getItem("authUser");
    if (!userStr) {
      if (actionType === 'cart') {
        try {
          let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          const existingItem = guestCart.find(item => (typeof item === 'object' ? item.product_id === productId : item === productId));
          if (existingItem) {
            if (typeof existingItem === 'object') {
              existingItem.quantity = (existingItem.quantity || 1) + 1;
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Cart quantity updated successfully!" } }));
          } else {
            guestCart.push({ product_id: productId, quantity: 1 });
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Product added to cart successfully!" } }));
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }
      alert("Please login first to add items to your wishlist!");
      window.location.href = "/dashboard?tab=wishlist";
      return;
    }
    
    const user = JSON.parse(userStr);
    const endpoint = actionType === 'cart' ? 'cart.php' : 'wishlist.php';
    
    fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId })
    })
    .then(res => res.json())
    .then(data => {
      if (redirect) {
        window.location.href = "/dashboard?tab=cart";
      } else {
        if (actionType === 'cart') {
          window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: data.message || "Product added to cart successfully!" } }));
          window.dispatchEvent(new Event('cartUpdated'));
        } else {
          alert(data.message);
        }
      }
    })
    .catch(err => console.error(err));
  };

  const title = product.name;

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(254,166,3,0.1) 0%, rgba(255,255,255,0) 100%)",
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
          {product.range}
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
              src={product.image || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"}
              alt={title}
              style={{ width: "100%", height: "400px", objectFit: "contain" }}
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
              marginBottom: "10px",
            }}
          >
            Why Choose {title}?
          </h2>
          <h3 style={{fontSize: "2rem", color: "#FEA603", marginBottom: "20px"}}>₹{product.price}</h3>
          
          {product.description && (
            <div style={{color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "30px", width: "100%", whiteSpace: "pre-wrap"}}>
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          )}
          
          {product.key_points && (
            <div style={{marginBottom: "30px", padding: "20px", background: "rgba(254,166,3,0.05)", borderRadius: "15px", border: "1px solid rgba(254,166,3,0.1)"}}>
              <h4 style={{margin: "0 0 15px 0", fontSize: "1.2rem", color: "var(--text-main)"}}>Key Highlights:</h4>
              <div style={{color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8"}}>
                <ReactMarkdown>{product.key_points}</ReactMarkdown>
              </div>
            </div>
          )}
          
          {!product.description && !product.key_points && (
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
                <li key={idx} style={{display: "flex", alignItems: "center", gap: "15px", fontSize: "1.1rem", color: "var(--text-muted)"}}>
                  <div style={{width: "25px", height: "25px", borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.9rem", fontWeight: "bold"}}>
                    ✓
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          )}
          
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "20px" }}>
            <button
              onClick={(e) => handleAction(e, product.id, 'cart', false)}
              className="pulse-btn"
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "14px 34px",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "1.05rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 6px 18px rgba(254, 166, 3, 0.4)",
                transition: "transform 0.2s ease"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add to Cart</span>
            </button>

            <button
              onClick={(e) => handleAction(e, product.id, 'wishlist')}
              className="pulse-btn"
              style={{
                background: "transparent",
                color: "#ef4444",
                border: "2px solid #ef4444",
                padding: "13px 35px",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
            >
              ❤️ Wishlist
            </button>
            <Link
              to="/contact-us"
              className="pulse-btn"
              style={{
                display: "inline-block",
                background: "#f1f5f9",
                color: "var(--text-main)",
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
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
