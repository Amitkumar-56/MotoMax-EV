import React, { useState } from "react";

const Inverter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div
      className="responsive-page"
      style={{ background: "var(--bg-main)", overflowX: "hidden" }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            h2[style*="4rem"] { font-size: 2.2rem !important; }
            div[style*="max-width: 60%"], div[style*="maxWidth: 60%"] { max-width: 100% !important; }
            div[style*="padding: 60px 80px"] { padding: 30px !important; display: flex !important; flex-direction: column !important; }
            img[style*="right: 10%"] { position: relative !important; right: 0 !important; top: 0 !important; margin: 20px auto 0 !important; width: 150px !important; height: auto !important; }
            div[style*="right: -35%"] { position: relative !important; right: auto !important; top: auto !important; transform: none !important; justify-content: center !important; margin-top: 40px !important; }
            div[style*="width: 30%"], div[style*="width: 40%"] { width: 100% !important; text-align: center !important; }
            div[style*="gap: 50px"] { flex-direction: column !important; gap: 20px !important; }
            div[style*="borderBottom"], div[style*="height: 6px"] { display: none !important; }
            ul[style*="45%"] { flex: 1 1 100% !important; text-align: left !important; padding-right: 0 !important; }
            div[style*="paddingLeft: 50px"] { padding-left: 0 !important; }
            div[style*="borderTop"] { display: none !important; }
            button[style*="padding: 10px 20px"] { width: 100% !important; }
            div[style*="gridTemplateColumns: repeat(4"] { grid-template-columns: 1fr 1fr !important; }
            div[style*="flex: 1 1 380px"], div[style*="flex: 1 1 300px"] { flex: 1 1 100% !important; padding-left: 0 !important; }
            div[style*="bottom: -50px"] { position: relative !important; bottom: 0 !important; justify-content: center !important; left: 0 !important; margin-top: -100px !important; }
            img[style*="height: 450px"], img[style*="height: 480px"] { height: 250px !important; width: auto !important; }
            img[style*="height: 380px"] { height: 200px !important; width: auto !important; margin-left: 10px !important; }
            h4[style*="11vw"] { font-size: 15vw !important; }
            div[style*="padding: 20px 25px"] { justify-content: space-between !important; flex-wrap: nowrap !important; }
          }
        `}
      </style>

            {/* Premium Hero Section */}
      <div className="premium-product-hero">
        <div className="hero-particles"></div>
        <div className="premium-hero-container">
          <div className="premium-hero-text">
            <span className="premium-badge">Next-Gen Tech</span>
            <h1 className="premium-hero-title">Smart Inverter</h1>
            <p className="premium-hero-subtitle">Experience unmatched performance, reliability, and innovation with MotoMax EV's state-of-the-art smart inverter. Designed for maximum efficiency and power delivery.</p>
          </div>
          <div className="premium-hero-img-wrapper">
            <img src="/assets/6.png" alt="Smart Inverter" className="premium-hero-img" />
          </div>
        </div>
      </div>
      
      {/* 2. Product Selector & Title Box */}
      <section style={{ padding: "80px 5%", textAlign: "center" }}>
        {/* Tab Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "80px",
          }}
        >
          <button
            style={{
              background: "#ff6600",
              color: "var(--bg-main)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Smart Home Inverter 2kVA
          </button>
          <button
            style={{
              background: "#6c757d",
              color: "var(--bg-main)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Heavy Duty 5kVA
          </button>
          <button
            style={{
              background: "#6c757d",
              color: "var(--bg-main)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Solar Hybrid Inverter 3kVA
          </button>
        </div>

        {/* Mint Green Box */}
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "var(--secondary)",
              borderRadius: "40px",
              padding: "60px 80px",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              minHeight: "350px",
            }}
          >
            <div style={{ maxWidth: "60%" }}>
              <h2
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "#1a1a1a",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}
              >
                Pure Sine
                <br />
                Wave
                <br />
                Inverter
              </h2>
              <p style={{ fontSize: "1.2rem", color: "var(--text-main)", fontWeight: 500 }}>
                Uninterrupted Power Supply
              </p>
            </div>
          </div>
          {/* Overlapping Image on Right */}
          <img
            src="/assets/2.png"
            alt="Inverter Unit"
            style={{
              width: "220px",
              height: "350px",
              objectFit: "contain",
              borderRadius: "15px",
              position: "absolute",
              right: "10%",
              top: "0",
              zIndex: 2,
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.4))",
            }}
          />
        </div>

        {/* Description Paragraph */}
        <p
          style={{
            maxWidth: "800px",
            margin: "60px auto 0",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
            textAlign: "left",
          }}
        >
          MotoMax EV Inverters provide seamless, quiet, and reliable power
          backup for your home and office. Engineered with advanced pure sine
          wave technology, they ensure the safety of your sensitive electronic
          appliances. Coupled with smart battery management compatibility, these
          inverters are designed to work perfectly with modern lithium-ion
          batteries.
        </p>
      </section>

      {/* 3. Advanced Features */}
      <section
        style={{
          padding: "80px 5%",
          textAlign: "center",
          background: "#fdfdfd",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "20px",
            lineHeight: 1.3,
          }}
        >
          Advanced Features of MotoMax EV
          <br />
          Inverters
        </h2>
        <p
          style={{
            maxWidth: "1000px",
            margin: "0 auto 60px",
            color: "#666",
            lineHeight: 1.7,
            fontSize: "1rem",
          }}
        >
          Engineered for reliability, our inverters offer industry-leading
          performance and features to keep your life powered up.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "#f4f5f7",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Pure Sine
              <br />
              Wave
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Provides grid-quality power that is safe for sensitive electronics
              like laptops, TVs, and smart appliances.
            </p>
          </div>

          <div
            style={{
              background: "#f4f5f7",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Fast Charging
              <br />
              Technology
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Intelligent charging algorithms charge the connected batteries
              faster while preserving their lifespan.
            </p>
          </div>

          <div
            style={{
              background: "#f4f5f7",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Smart UPS
              <br />
              Mode
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Switchover times of less than 10ms ensure that computers and
              servers don't reboot during power cuts.
            </p>
          </div>

          <div
            style={{
              background: "#f4f5f7",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              LCD
              <br />
              Display
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              User-friendly interactive LCD shows battery status, load
              percentage, and charging information at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Specifications */}
      <section
        style={{
          padding: "80px 5%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Giant Background Text */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            zIndex: 0,
          }}
        >
          <h4
            style={{
              color: "transparent",
              fontSize: "11vw",
              fontWeight: 900,
              whiteSpace: "nowrap",
              margin: 0,
              lineHeight: 0.8,
            }}
          >
            Specifications
          </h4>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "60px",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Inverter Specifications
            </h2>
          </div>

          <div
            style={{
              display: "inline-block",
              background: "var(--secondary)",
              padding: "15px 50px",
              borderRadius: "40px",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "100px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
          >
            Technical Details
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "500px",
            }}
          >
            {/* Center Image */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <img
                src="/assets/2.png"
                alt="Specs Inverter"
                style={{
                  width: "220px",
                  height: "350px",
                  objectFit: "contain",
                  borderRadius: "15px",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                }}
              />
            </div>

            {/* Left Specs */}
            <div
              style={{
                position: "relative",
                top: "25%",
                bottom: "25%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                textAlign: "left",
                flex: "1 1 380px",
                maxWidth: "100%",
                zIndex: 3,
              }}
            >
              <div style={{ position: "relative" }}>
                <h4
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  Capacity
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>
                  2000 VA / 1600 W
                </p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </div>

              <div style={{ position: "relative" }}>
                <h4
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  Nominal Battery Voltage
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>24V DC</p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </div>
            </div>

            {/* Right Specs */}
            <div
              style={{
                position: "relative",
                top: "25%",
                bottom: "25%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                textAlign: "left",
                flex: "1 1 380px",
                maxWidth: "100%",
                zIndex: 3,
                paddingLeft: "50px",
              }}
            >
              <div style={{ position: "relative" }}>
                <h4
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  Output Waveform
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>
                  Pure Sine Wave
                </p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </div>

              <div style={{ position: "relative" }}>
                <h4
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginBottom: "3px",
                  }}
                >
                  Transfer Time
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>≤ 10 ms</p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inverter;
