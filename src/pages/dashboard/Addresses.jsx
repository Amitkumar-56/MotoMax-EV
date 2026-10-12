import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost/assinment/php-backend/api";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const user = JSON.parse(localStorage.getItem("authUser") || "{}");

  useEffect(() => {
    if (!user.id) return;
    fetch(`${API_BASE}/addresses.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAddresses(data);
        }
      });
  }, [user.id]);

  const handleDelete = (id) => {
    // Basic delete functionality for addresses if backend supports it. If not, just warn.
    alert("Delete functionality can be implemented via API.");
  };

  return (
    <div className="dash-card">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>
        <h3 style={{fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", margin: 0}}>Address Book</h3>
      </div>

      <style>
        {`
          .addr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
          @media (max-width: 480px) {
            .addr-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>
      <div className="addr-grid">
        {addresses.length === 0 ? (
          <div style={{color: "#64748b", padding: "20px"}}>No saved addresses yet.</div>
        ) : (
          addresses.map((addr, idx) => (
            <div key={addr.id} style={{border: idx === 0 ? "2px solid rgba(254,166,3,0.5)" : "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: idx === 0 ? "rgba(254,166,3,0.03)" : "#f8fafc", position: "relative"}}>
              {idx === 0 && <div style={{position: "absolute", top: "15px", right: "15px", background: "#FEA603", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold"}}>DEFAULT</div>}
              <h4 style={{fontSize: "1.1rem", fontWeight: 700, margin: "0 0 10px 0", color: "#1e293b"}}>{addr.type || "Address"}</h4>
              <p style={{color: "#475569", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 15px 0"}}>
                {addr.address_line}<br/>
                {addr.city}, {addr.state} - {addr.zip}<br/>
              </p>
              <div style={{color: "#64748b", fontSize: "0.9rem", marginBottom: "15px"}}>📞 {addr.phone}</div>
              <div style={{display: "flex", gap: "15px"}}>
                <span onClick={() => handleDelete(addr.id)} style={{color: "#ef4444", fontWeight: "bold", fontSize: "0.9rem", cursor: "pointer"}}>Delete</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Addresses;
