import React from 'react';

const Inquiries = ({ inquiries }) => {
  return (
    <div className="dash-card">
      <h3 style={{fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>Help & Support Tickets</h3>
      {inquiries.length > 0 ? (
        <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
          {inquiries.map(q => (
            <div key={q.id} style={{padding: "20px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
              <div style={{maxWidth: "75%"}}>
                <div style={{fontSize: "0.85rem", color: "#888", marginBottom: "8px"}}>{new Date(q.created_at).toLocaleString()}</div>
                <div style={{fontSize: "1rem", color: "#333", lineHeight: 1.5, whiteSpace: "pre-wrap"}}>{q.message}</div>
              </div>
              <div>
                <span style={{padding: "6px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", background: q.status === 'resolved' ? '#dcfce7' : '#fee2e2', color: q.status === 'resolved' ? '#166534' : '#991b1b'}}>{q.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🎧</div>
          <h3>How can we help you?</h3>
          <p>You haven't submitted any support requests. If you need assistance, please contact us.</p>
          <a href="/contact-us" className="dash-btn">Contact Support</a>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
