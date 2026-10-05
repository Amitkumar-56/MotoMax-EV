import React, { useState } from "react";

const EVCharger = () => {
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

      {/* 1. Hero Section */}
      <div
        style={{
          width: "100%",
          height: "80vh",
          minHeight: "auto",
          flexWrap: "wrap",
          gap: "40px",
          padding: "40px 0",
          position: "relative",
          overflow: "hidden",
          background: "#e0e0e0",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2000"
          alt="EV Charger Background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
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
            AC Fast Charger (7.2kW)
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
            DC Ultra-Fast (30kW)
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
            Portable Charger (3.3kW)
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
                Electric
                <br />
                Vehicle
                <br />
                Charger
              </h2>
              <p style={{ fontSize: "1.2rem", color: "var(--text-main)", fontWeight: 500 }}>
                High-Speed & Reliable
              </p>
            </div>
          </div>
          {/* Overlapping Image on Right */}
          <img
            src="/assets/nav-automotive.jpg"
            alt="Product Battery"
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "15px",
              position: "absolute",
              right: "10%",
              top: "50px",
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
          The MotoMax EV charger is engineered for speed, safety, and
          durability. Supporting both standard and fast-charging protocols, it
          seamlessly integrates with modern electric vehicles and two-wheelers.
          Built with smart connectivity and advanced safety features, it
          provides a hassle-free charging experience for home, office, and
          public charging stations.
        </p>
      </section>

      {/* 3. Advanced Safety Features */}
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
          Advanced Safety Features of MotoMax EV
          <br />
          Chargers
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
          Our EV chargers come equipped with multiple layers of electrical
          protection, ensuring completely safe charging cycles for your
          vehicle's battery.
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
              Over-voltage
              <br />
              Protection
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Automatically shuts down power delivery if grid voltage exceeds
              safe operating limits to protect the vehicle.
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
              Short Circuit
              <br />
              Protection
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Built-in safety relays instantly break the circuit in the event of
              an electrical short, preventing damage and fire hazards.
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
              Temperature
              <br />
              Control
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Active thermal monitoring throttles charging speeds if
              temperatures rise too high, keeping the charger and battery safe.
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
              Weather
              <br />
              Resistant (IP65)
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              Designed for outdoor use, the charger housing is fully protected
              against dust, rain, and extreme weather conditions.
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
              Charger Specifications
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
              minHeight: "auto",
              flexWrap: "wrap",
              gap: "40px",
              padding: "40px 0",
            }}
          >
            {/* Center Image */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <img
                src="/assets/nav-automotive.jpg"
                alt="Specs Charger"
                style={{
                  width: "280px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                }}
              />
            </div>

            {/* Left Specs */}
            <div
              style={{
                position: "relative",
                top: "15%",
                bottom: "15%",
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
                  Input Voltage
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>230V AC ± 10%</p>
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
                  Output Power
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>7.2kW (32A)</p>
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
                top: "15%",
                bottom: "15%",
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
                  Connector Type
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>Type 2 / CCS2</p>
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
                  Connectivity
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>
                  Wi-Fi, Bluetooth, RFID
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EVCharger;
