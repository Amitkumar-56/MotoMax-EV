import React from 'react';

const Payments = () => {
  return (
    <div className="dash-card">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>
        <h3 style={{fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", margin: 0}}>Payment Options</h3>
        <button className="dash-btn" style={{padding: "8px 16px", fontSize: "0.9rem"}}>+ Add New Card</button>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "30px"}}>
        {/* Mock Card 1 */}
        <div style={{background: "linear-gradient(135deg, #1e293b, #0f172a)", color: "#fff", padding: "25px", borderRadius: "16px", position: "relative", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.15)"}}>
          <div style={{position: "absolute", right: "-20px", top: "-20px", width: "100px", height: "100px", background: "rgba(255,255,255,0.1)", borderRadius: "50%"}}></div>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}>
            <span style={{fontSize: "1.2rem", fontWeight: 800}}>Mastercard</span>
            <span style={{fontSize: "1.5rem"}}>💳</span>
          </div>
          <div style={{fontSize: "1.3rem", letterSpacing: "3px", marginBottom: "20px"}}>**** **** **** 3625</div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.85rem", opacity: 0.8}}>
            <span>Card Holder<br/><strong style={{fontSize: "1rem"}}>Diego Faria</strong></span>
            <span>Expires<br/><strong style={{fontSize: "1rem"}}>02/2026</strong></span>
          </div>
        </div>

        {/* Mock Card 2 */}
        <div style={{background: "linear-gradient(135deg, #FEA603, #cc5200)", color: "#fff", padding: "25px", borderRadius: "16px", position: "relative", overflow: "hidden", boxShadow: "0 10px 25px rgba(254,166,3,0.2)"}}>
          <div style={{position: "absolute", right: "-20px", top: "-20px", width: "100px", height: "100px", background: "rgba(255,255,255,0.1)", borderRadius: "50%"}}></div>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "30px"}}>
            <span style={{fontSize: "1.2rem", fontWeight: 800}}>VISA</span>
            <span style={{fontSize: "1.5rem"}}>💳</span>
          </div>
          <div style={{fontSize: "1.3rem", letterSpacing: "3px", marginBottom: "20px"}}>**** **** **** 8421</div>
          <div style={{display: "flex", justifyContent: "space-between", fontSize: "0.85rem", opacity: 0.8}}>
            <span>Card Holder<br/><strong style={{fontSize: "1rem"}}>Diego Faria</strong></span>
            <span>Expires<br/><strong style={{fontSize: "1rem"}}>09/2027</strong></span>
          </div>
        </div>
      </div>
      
      <div>
        <p style={{color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6}}>
          We proudly accept Apple Pay, PayPal, Credit/Debit cards, and Cash on Delivery for all your MotoMax EV purchases. All transactions are securely encrypted.
        </p>
      </div>
    </div>
  );
};

export default Payments;
