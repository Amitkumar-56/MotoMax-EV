import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost/assinment/php-backend/api";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("authUser") || "{}");

  const fetchWishlist = () => {
    if (!user.id) return;
    setLoading(true);
    fetch(`${API_BASE}/wishlist.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = (wishlistId) => {
    fetch(`${API_BASE}/wishlist.php?wishlist_id=${wishlistId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => fetchWishlist());
  };

  if (loading) return <div>Loading wishlist...</div>;

  return (
    <div className="dash-card">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>
        <h3 style={{fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", margin: 0}}>My Wishlist</h3>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">❤️</div>
          <h3>Your Wishlist is empty</h3>
          <p>Save items you love here and review them anytime.</p>
          <a href="/products" className="dash-btn" style={{textDecoration: 'none'}}>Explore Products</a>
        </div>
      ) : (
        <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px"}}>
          {items.map(item => (
            <div key={item.wishlist_id} style={{border: "1px solid #e2e8f0", borderRadius: "12px", padding: "15px", display: "flex", flexDirection: "column", gap: "10px", background: "#f8fafc"}}>
              <div style={{width: "100%", height: "150px", background: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", overflow: "hidden"}}>
                <img src={item.image || "/Icon.png"} alt={item.name} style={{width: "100%", height: "100%", objectFit: "cover"}} onError={(e)=>{e.target.src='/Icon.png'}} />
              </div>
              <h4 style={{fontSize: "1.05rem", fontWeight: 700, margin: "0", color: "#1e293b"}}>{item.name}</h4>
              <div style={{color: "#FEA603", fontWeight: "bold"}}>{item.price}</div>
              <div style={{display: "flex", gap: "10px", marginTop: "auto", paddingTop: "10px"}}>
                <button onClick={() => handleRemove(item.wishlist_id)} style={{flex: 1, border: "none", background: "rgba(239,68,68,0.1)", color: "#ef4444", padding: "8px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold"}}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
