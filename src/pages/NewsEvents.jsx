const NewsEvents = () => {
  return (
    <div
      className="responsive-page"
      style={{
        padding: "60px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#fff",
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            h1 { font-size: 2.2rem !important; margin-bottom: 30px !important; }
            div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
            div[style*="height: 400px"] { height: 250px !important; }
            h2[style*="1.8rem"] { font-size: 1.4rem !important; }
          }
        `}
      </style>
      <h1
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          fontWeight: 900,
          color: "#1f2937",
          marginBottom: "50px",
        }}
      >
        News & Events
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "40px",
        }}
      >
        {/* News Card 1 */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "400px",
              overflow: "hidden",
              position: "relative",
              background: "#f3f4f6",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800"
              alt="The Battery Magazine"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "30px" }}>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 600,
                color: "#111",
                lineHeight: "1.4",
                marginBottom: "15px",
              }}
            >
              MotoMax EV Featured in The Battery Magazine September Issue 2026
            </h2>
            <p
              style={{
                color: "#4b5563",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              We are proud to be featured in the latest edition of The Battery
              Magazine. The comprehensive article covers our journey, rapid
              growth, and our latest lithium-ion innovations that are reshaping
              India's electric mobility and energy storage sectors.
            </p>
          </div>
        </div>

        {/* News Card 2 */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "400px",
              overflow: "hidden",
              position: "relative",
              background: "#f3f4f6",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800"
              alt="EV Tech News"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "30px" }}>
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: 600,
                color: "#111",
                lineHeight: "1.4",
                marginBottom: "15px",
              }}
            >
              Featured on EV Tech News: Future-Proofing India's Clean Mobility
              EV Tech
            </h2>
            <p
              style={{
                color: "#4b5563",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              EV Tech News recently featured MotoMax EV's strategic focus on
              in-house R&D and technological adaptability. The article explores
              how our localized design infrastructure and advanced testing
              capabilities allow us to rapidly adapt to emerging EV
              technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;
