const Contact = () => {
  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "5px",
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    color: "#6b7280",
    marginBottom: "5px",
  };

  const btnStyle = {
    backgroundColor: "#0047ff",
    color: "var(--bg-main)",
    border: "none",
    padding: "12px 30px",
    borderRadius: "25px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div
      className="responsive-page"
      style={{ backgroundColor: "var(--bg-main)", paddingBottom: "0" }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            h1 { font-size: 2.2rem !important; }
            h2 { font-size: 2rem !important; }
            div[style*="font-size: 4.5rem"] { font-size: 3rem !important; top: -10px !important; white-space: normal !important; word-break: break-word; width: 100%; }
            div[style*="flex: 1 1 350px"], div[style*="flex: 2 1 600px"] {
              flex: 1 1 100% !important;
            }
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      {/* Section 1: Get in Touch */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "60px",
        }}
      >
        {/* Left Side: Contact Info */}
        <div style={{ flex: "1 1 350px" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "var(--text-main)",
              lineHeight: "1.1",
              marginBottom: "40px",
            }}
          >
            Get in
            <br />
            Touch
          </h1>

          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--text-main)",
              marginBottom: "15px",
            }}
          >
            Contact Us
          </h3>

          <div
            style={{
              color: "#4b5563",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              marginBottom: "30px",
            }}
          >
            <strong style={{ color: "var(--text-main)" }}>MotoMax EV Limited</strong>
            <br />
            (Formerly known as MotoMax EV Private
            <br />
            Limited)
            <br />
            CIN: U27101DL2006PLC154820
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              color: "#4b5563",
              fontSize: "0.95rem",
            }}
          >
            <div
              style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
            >
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>📍</span>
              <div>
                <strong style={{ color: "var(--text-main)" }}>Registered Office:</strong>
                <br />
                A-53, Naraina Industrial Area
                <br />
                Phase-1, Naraina, Delhi-110028
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>📞</span>
              <span>91-11-48022444</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", color: "var(--text-main)" }}>✉️</span>
              <span>info@motomaxev.com</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: "2 1 600px" }}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>Your Name*</label>
                <input type="text" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input type="text" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <input type="text" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <input type="text" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Your Email*</label>
                <input type="email" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Phone Number*</label>
                <input type="tel" style={inputStyle} required />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Want to know about our</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginTop: "5px",
                }}
              >
                {[
                  "HR",
                  "Purchase",
                  "Sales",
                  "International Sales",
                  "Service",
                  "PR",
                ].map((item) => (
                  <label
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "0.85rem",
                      color: "#4b5563",
                      cursor: "pointer",
                    }}
                  >
                    <input type="checkbox" /> {item}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                rows="4"
                style={{ ...inputStyle, resize: "vertical" }}
              ></textarea>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" required />
                <span>
                  I agree to the{" "}
                  <a
                    href="#"
                    style={{ color: "#0047ff", textDecoration: "none" }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div style={{ marginTop: "10px" }}>
              <button type="button" style={btnStyle}>
                <span>➤</span> Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Section 2: Become a Channel Partner */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "60px",
          marginTop: "40px",
        }}
      >
        {/* Left Side: Title */}
        <div style={{ flex: "1 1 350px", position: "relative" }}>
          {/* Faded Background Text */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "-10px",
              fontSize: "4.5rem",
              fontWeight: 900,
              color: "#f3f4f6",
              lineHeight: "1",
              zIndex: 0,
              whiteSpace: "pre-wrap",
            }}
          >
            Become a<br />
            Partner
          </div>

          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "var(--text-main)",
              lineHeight: "1.2",
              position: "relative",
              zIndex: 1,
            }}
          >
            Become a<br />
            Channel Partner
          </h2>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: "2 1 600px", position: "relative", zIndex: 1 }}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label style={labelStyle}>Company Name *</label>
              <input type="text" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Contact Person *</label>
              <input type="text" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Your Email *</label>
              <input type="email" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input type="tel" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                rows="4"
                style={{ ...inputStyle, resize: "vertical" }}
              ></textarea>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" required />
                <span>
                  I agree to the{" "}
                  <a
                    href="#"
                    style={{ color: "#0047ff", textDecoration: "none" }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div style={{ marginTop: "10px" }}>
              <button type="button" style={btnStyle}>
                <span>➤</span> Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Section 3: Google Map Embed */}
      <div style={{ width: "100%", height: "400px", marginTop: "60px" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9960251783063!2d77.1390978761159!3d28.62988118420074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d032e367856b3%3A0xc3b832b85a30a109!2sNaraina%20Industrial%20Area%20Phase%201%2C%20Naraina%2C%20New%20Delhi%2C%20Delhi%20110028!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
