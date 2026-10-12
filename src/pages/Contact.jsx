import { useState } from "react";

const Contact = () => {
  return (
    <div className="responsive-page" style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh", overflow: "hidden", paddingBottom: "0" }}>
      <style>
        {`
          .premium-glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
          }
          .premium-glass-card:hover {
            transform: translateY(-5px);
          }
          .contact-hero-bg {
            position: absolute;
            top: -20%; right: -10%; width: 50vw; height: 50vw;
            background: radial-gradient(circle, rgba(254,166,3,0.15) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            z-index: 0;
            pointer-events: none;
          }
          @media (max-width: 768px) {
            h1 { font-size: 2.5rem !important; }
            .premium-glass-card { padding: 25px; }
          }
        `}
      </style>

      {/* Decorative Background Blob */}
      <div className="contact-hero-bg"></div>

      {/* Hero Title Area */}
      <div style={{ textAlign: "center", padding: "80px 20px 40px", position: "relative", zIndex: 1 }}>
        <span style={{ color: "#FEA603", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.9rem" }}>Get In Touch</span>
        <h1 style={{ fontSize: "3.5rem", fontWeight: 900, color: "var(--text-main)", marginTop: "15px", marginBottom: "20px" }}>Contact MotoMax EV</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 80px", display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", position: "relative", zIndex: 1 }}>
        
        {/* Contact Info Cards */}
        <div className="premium-glass-card" style={{ padding: "30px", flex: "1 1 300px", maxWidth: "350px", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "15px", background: "rgba(254,166,3,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}>📍</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "15px", color: "var(--text-main)" }}>Registered Office</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.7", fontSize: "1.05rem" }}>
            <strong style={{color: "var(--text-main)"}}>MotoMax EV Limited</strong><br/>
            A-53, Naraina Industrial Area<br/>
            Phase-1, Naraina, Delhi-110028<br/>
            <span style={{fontSize: "0.85rem", opacity: 0.7}}>CIN: U27101DL2006PLC154820</span>
          </p>
        </div>

        <div className="premium-glass-card" style={{ padding: "30px", flex: "1 1 300px", maxWidth: "350px", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "15px", background: "rgba(254,166,3,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}>📞</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "15px", color: "var(--text-main)" }}>Phone Number</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>91-11-48022444</p>
          <div style={{marginTop: "20px"}}>
             <strong style={{color: "var(--text-main)"}}>Mon - Fri:</strong> 9:00 AM - 6:00 PM
          </div>
        </div>

        <div className="premium-glass-card" style={{ padding: "30px", flex: "1 1 300px", maxWidth: "350px", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "15px", background: "rgba(254,166,3,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}>✉️</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "15px", color: "var(--text-main)" }}>Email Address</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "10px" }}>info@motomaxev.com</p>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>support@motomaxev.com</p>
        </div>

      </div>

      {/* Google Map */}
      <div style={{ width: "100%", height: "450px", position: "relative" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9960251783063!2d77.1390978761159!3d28.62988118420074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d032e367856b3%3A0xc3b832b85a30a109!2sNaraina%20Industrial%20Area%20Phase%201%2C%20Naraina%2C%20New%20Delhi%2C%20Delhi%20110028!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
