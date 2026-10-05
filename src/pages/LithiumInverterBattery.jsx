import React, { useState } from "react";

const LithiumInverterBattery = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div
      className="responsive-page"
      style={{
        background: "var(--bg-main)",
        overflowX: "hidden",
        paddingBottom: "100px",
      }}
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

      {/* 1. Hero Section (House with batteries) */}
      <div
        style={{
          width: "100%",
          height: "70vh",
          minHeight: "500px",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <img
          src="/assets/inverter-hero-house.jpg"
          alt="Modern House Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.9,
          }}
        />

        {/* Left Battery Overlapping */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "15%",
            zIndex: 2,
          }}
        >
          <img
            src="/assets/inverter-battery.jpg"
            alt="Powercube 1.4+"
            style={{
              width: "250px",
              height: "350px",
              objectFit: "cover",
              borderRadius: "10px",
              filter: "drop-shadow(10px 20px 30px rgba(0,0,0,0.4))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--bg-main)",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{ fontWeight: 800, color: "var(--text-muted)", fontSize: "1.2rem" }}
            >
              Powercube <span style={{ color: "#ff6b35" }}>1.4+</span>
            </span>
          </div>
        </div>

        {/* Right Battery Overlapping */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "15%",
            zIndex: 2,
          }}
        >
          <img
            src="/assets/inverter-battery.jpg"
            alt="Powercube 2.7+"
            style={{
              width: "300px",
              height: "420px",
              objectFit: "cover",
              borderRadius: "10px",
              filter: "drop-shadow(-10px 20px 30px rgba(0,0,0,0.4))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--bg-main)",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{ fontWeight: 800, color: "var(--text-muted)", fontSize: "1.2rem" }}
            >
              Powercube <span style={{ color: "#ff6b35" }}>2.7+</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Green Title Block & Description */}
      <section style={{ padding: "120px 10% 60px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          <div style={{ position: "relative", maxWidth: "800px" }}>
            <div
              style={{
                background: "var(--secondary)",
                padding: "60px 80px",
                borderRadius: "20px",
                transform: "skew(-5deg)",
                boxShadow: "0 20px 40px rgba(156, 240, 196, 0.3)",
              }}
            >
              <div style={{ transform: "skew(5deg)" }}>
                <h1
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "var(--text-main)",
                    lineHeight: "1.1",
                    marginBottom: "20px",
                  }}
                >
                  Lithium Ion
                  <br />
                  Battery
                  <br />
                  for Inverter
                </h1>
                <p
                  style={{ fontSize: "1.2rem", color: "var(--text-main)", fontWeight: 600 }}
                >
                  Powercube 1.4+ | Powercube 2.7+
                </p>
              </div>
            </div>

            {/* Floating Batteries next to Green Box */}
            <div
              style={{
                position: "absolute",
                right: "-35%",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                gap: "20px",
                zIndex: 2,
              }}
            >
              <img
                src="/assets/inverter-battery.jpg"
                alt="Battery Left"
                style={{
                  width: "180px",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
              />
              <img
                src="/assets/inverter-battery.jpg"
                alt="Battery Right"
                style={{
                  width: "200px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              lineHeight: "1.8",
              maxWidth: "750px",
              marginTop: "20px",
            }}
          >
            The MotoMax EV lithium ion battery for inverter is designed to
            provide reliable and long-lasting power backup for homes. Built with
            advanced lithium technology, it offers faster charging, longer
            lifespan and higher energy efficiency compared to conventional
            batteries. If you are looking for the best inverter battery for
            home, MotoMax EV provides stable performance, compact design and an
            advanced battery management system to ensure uninterrupted power
            during outages.
          </p>
        </div>
      </section>

      {/* 3. Best Inverter Battery for Home */}
      <section style={{ padding: "40px 10%", background: "var(--bg-main)" }}>
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "30px",
          }}
        >
          Best Inverter Battery for Home
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
          Choosing the best inverter battery for home depends on factors such as
          backup time, charging speed and battery life. Lithium batteries are
          becoming the preferred option because they provide higher energy
          density, faster charging and longer durability compared to
          conventional batteries. The MotoMax EV lithium inverter battery is
          designed to deliver reliable power backup and efficient energy storage
          for modern households.
        </p>
      </section>

      {/* 4. Product Specifications */}
      <section
        style={{
          padding: "80px 5%",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Product Specifications
        </h2>

        {/* Faded Background Text */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "0",
            width: "100%",
            textAlign: "center",
            zIndex: 0,
            opacity: 0.03,
            pointerEvents: "none",
          }}
        >
          <span
            style={{ fontSize: "12rem", fontWeight: 900, whiteSpace: "nowrap" }}
          >
            Specifications
          </span>
        </div>

        <div
          style={{
            background: "var(--secondary)",
            display: "inline-block",
            padding: "15px 50px",
            borderRadius: "15px",
            fontWeight: 800,
            fontSize: "1.8rem",
            color: "var(--text-main)",
            marginBottom: "80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Technical Specifications
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
            position: "relative",
            zIndex: 1,
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* Left Specs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              textAlign: "left",
              width: "30%",
            }}
          >
            <div style={{ position: "relative" }}>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Type
                <br />
                <span style={{ color: "#d38b6a" }}>TK12100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>12.8V/105Ah</p>
              <div
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "20px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-63px",
                  top: "17px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
            </div>
            <div style={{ position: "relative" }}>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Rated Voltage
                <br />
                <span style={{ color: "#d38b6a" }}>TK12100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>12.8V</p>
              <div
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "20px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-63px",
                  top: "17px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
            </div>
            <div style={{ position: "relative" }}>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Rated Capacity
                <br />
                [0.5CA]
                <br />
                <span style={{ color: "#d38b6a" }}>TK12100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>105Ah</p>
              <div
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: "30px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-63px",
                  top: "27px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
            </div>
          </div>

          {/* Center Battery */}
          <div style={{ width: "40%" }}>
            <img
              src="/assets/inverter-battery.jpg"
              alt="Inverter Battery Specs"
              style={{ width: "100%", maxWidth: "300px", objectFit: "cover" }}
            />
          </div>

          {/* Right Specs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              textAlign: "left",
              width: "30%",
            }}
          >
            <div style={{ position: "relative", paddingLeft: "60px" }}>
              <div
                style={{
                  position: "relative",
                  top: "20px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  top: "17px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Type
                <br />
                <span style={{ color: "#d38b6a" }}>TK25100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>25.6V/105Ah</p>
            </div>
            <div style={{ position: "relative", paddingLeft: "60px" }}>
              <div
                style={{
                  position: "relative",
                  top: "20px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  top: "17px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Rated Voltage
                <br />
                <span style={{ color: "#d38b6a" }}>TK25100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>25.6V</p>
            </div>
            <div style={{ position: "relative", paddingLeft: "60px" }}>
              <div
                style={{
                  position: "relative",
                  top: "30px",
                  width: "60px",
                  borderBottom: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  top: "27px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
              <h4
                style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.9rem" }}
              >
                Rated Capacity
                <br />
                [0.5CA]
                <br />
                <span style={{ color: "#d38b6a" }}>TK25100</span>
              </h4>
              <p style={{ color: "var(--text-muted)" }}>105Ah</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Advanced Features */}
      <section
        style={{
          padding: "80px 10%",
          background: "var(--bg-main)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Faded Background Text */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "0",
            width: "100%",
            textAlign: "center",
            zIndex: 0,
            opacity: 0.03,
            pointerEvents: "none",
          }}
        >
          <span
            style={{ fontSize: "10rem", fontWeight: 900, whiteSpace: "nowrap" }}
          >
            Safety Features
          </span>
        </div>

        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Advanced Features of MotoMax EV Lithium Ion
          <br />
          Battery for Inverter
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#666",
            lineHeight: "1.8",
            maxWidth: "900px",
            margin: "0 auto 60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          The MotoMax EV lithium ion battery for inverter is designed to deliver
          reliable power backup, higher efficiency and long-lasting performance
          for modern homes. With advanced lithium technology, smart monitoring
          and intelligent protection systems, this lithium inverter battery
          ensures stable power during outages. Its lightweight design, fast
          charging capability and longer lifespan make it an ideal inverter
          battery for home compared to traditional batteries.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "#f8f9fc",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
              transition: "transform 0.3s",
              ":hover": { transform: "translateY(-10px)" },
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <path d="M12 2L2 12h3v8h14v-8h3L12 2z"></path>
                <path d="M16 10v6"></path>
                <path d="M8 10v6"></path>
                <path d="M12 10v6"></path>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-main)",
                marginBottom: "15px",
              }}
            >
              Smart Control System
            </h3>
            <p
              style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6" }}
            >
              The MotoMax EV lithium battery features a smart control system
              that monitors charging status, battery health and performance,
              ensuring efficient power management and reliable backup.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "#f8f9fc",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
              marginTop: "-30px",
              transition: "transform 0.3s",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-main)",
                marginBottom: "15px",
              }}
            >
              High Safety
            </h3>
            <p
              style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6" }}
            >
              Built with advanced protection technology, the battery prevents
              overcharging, overheating and short circuits, ensuring safe and
              stable performance for home power backup.
            </p>
          </div>

          {/* Card 3 - Peach Background */}
          <div
            style={{
              background: "#fce3d2",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
              marginTop: "30px",
              transition: "transform 0.3s",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
                <line x1="22" y1="11" x2="22" y2="13"></line>
                <line x1="6" y1="7" x2="6" y2="17"></line>
                <line x1="10" y1="7" x2="10" y2="17"></line>
                <line x1="14" y1="7" x2="14" y2="17"></line>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-main)",
                marginBottom: "15px",
              }}
            >
              Long life battery
            </h3>
            <p
              style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6" }}
            >
              High-quality lithium cells provide thousands of charge cycles,
              delivering longer lifespan and consistent performance compared to
              conventional inverter batteries.
            </p>
          </div>

          {/* Card 4 */}
          <div
            style={{
              background: "#f8f9fc",
              padding: "40px 30px",
              borderRadius: "10px",
              textAlign: "left",
              transition: "transform 0.3s",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M7 7h4v4H7z"></path>
                <path d="M13 7h4v4h-4z"></path>
                <path d="M7 13h4v4H7z"></path>
                <path d="M13 13h4v4h-4z"></path>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-main)",
                marginBottom: "15px",
              }}
            >
              Advanced BMS Protection
            </h3>
            <p
              style={{ fontSize: "0.95rem", color: "#666", lineHeight: "1.6" }}
            >
              The intelligent Battery Management System monitors voltage,
              temperature and charging levels to protect the battery and ensure
              safe operation with improved durability.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Mechanical Characteristics */}
      <section
        style={{ padding: "80px 5%", textAlign: "center", background: "var(--bg-main)" }}
      >
        <div
          style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "30px",
              bottom: "0",
              width: "1px",
              background: "var(--border-light)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          ></div>

          <div
            style={{ position: "relative", zIndex: 1, marginBottom: "60px" }}
          >
            <div
              style={{
                background: "#b3d4ff",
                display: "inline-block",
                padding: "15px 40px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "var(--text-main)",
                letterSpacing: "1px",
              }}
            >
              Mechanical Characteristics
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "30px",
                marginTop: "60px",
              }}
            >
              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  position: "relative",
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
                    Battery Dimension [mm] (L x W x H)
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    262*354*133 ± 2mm
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderTopRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Cell Compound Mode
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>4S/1P</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Weight
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>11.5kg</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Cell Voltage [V]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>3.2V</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "-10px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderBottomRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  paddingLeft: "5%",
                  position: "relative",
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
                    Battery Dimension [mm] (L x W x H)
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    362*132*354 ± 2mm
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderTopLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Cell Compound Mode
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>8S/1P</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Weight
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>20.4kg</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Cell Voltage [V]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>3.2V</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "-10px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderBottomLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Electrical Characteristics */}
      <section
        style={{ padding: "40px 5%", textAlign: "center", background: "var(--bg-main)" }}
      >
        <div
          style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "30px",
              bottom: "0",
              width: "1px",
              background: "var(--border-light)",
              transform: "translateX(-50%)",
              zIndex: 0,
            }}
          ></div>

          <div
            style={{ position: "relative", zIndex: 1, marginBottom: "60px" }}
          >
            <div
              style={{
                background: "#fce3d2",
                display: "inline-block",
                padding: "15px 40px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "var(--text-main)",
                letterSpacing: "1px",
              }}
            >
              Electrical Characteristics
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "30px",
                marginTop: "60px",
              }}
            >
              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  position: "relative",
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
                    Voltage Range [V]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    11.2V~14.6V ± 0.2V
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderTopRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Charging Voltage [V]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    14.6V ± 0.2V
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Charging Mode
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>CC/CV</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Ah Efficiency
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>&gt;95%</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "-10px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderBottomRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-11%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>

              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                  paddingLeft: "5%",
                  position: "relative",
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
                    Voltage Range [V]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    21.6V~29.2V ± 0.2V
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderTopLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Max. Charge Current [A]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>0.5C</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Max. Discharge Current [A]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>1C</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Life@ 35°C, Class I&amp;II Area
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>12years</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "20px",
                      width: "20%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
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
                    Cycle Life [80% DOD, 25°C, @0.5C Charge and 0.5C Discharge]
                    <br />
                    <span style={{ color: "#d38b6a" }}>TK12100, TK25100</span>
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>
                    &gt;4000Cycles
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "-25px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderBottomLeftRadius: "10px",
                      height: "45px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-16%",
                      top: "17px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section
        style={{
          padding: "80px 5%",
          background: "var(--bg-main)",
          paddingBottom: "120px",
        }}
      >
        <div
          style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 400,
              color: "var(--text-main)",
              marginBottom: "10px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#666", fontSize: "1rem", marginBottom: "50px" }}>
            Everything you need to know about MotoMax EV Lithium Ion Battery for
            Inverter
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => toggleFaq(1)}
                style={{
                  padding: "20px 25px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: openFaq === 1 ? "#f9f9f9" : "var(--bg-main)",
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.05rem",
                    fontWeight: openFaq === 1 ? "600" : "400",
                  }}
                >
                  What is a lithium ion battery for inverter?
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  style={{
                    transform:
                      openFaq === 1 ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq === 1 && (
                <div
                  style={{
                    padding: "0 25px 20px",
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    background: "#f9f9f9",
                  }}
                >
                  A lithium-ion battery for an inverter stores electrical energy
                  chemically and delivers it during a power outage. Compared to
                  older lead-acid designs, lithium-ion packs offer much higher
                  efficiency, faster charging times, longer life, and zero
                  maintenance.
                </div>
              )}
            </div>

            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => toggleFaq(2)}
                style={{
                  padding: "20px 25px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: openFaq === 2 ? "#f9f9f9" : "var(--bg-main)",
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.05rem",
                    fontWeight: openFaq === 2 ? "600" : "400",
                  }}
                >
                  What is the inverter battery price in India?
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  style={{
                    transform:
                      openFaq === 2 ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq === 2 && (
                <div
                  style={{
                    padding: "0 25px 20px",
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    background: "#f9f9f9",
                  }}
                >
                  The price in India varies significantly based on battery
                  capacity, chemistry, and brand. While lithium batteries
                  generally have a higher upfront cost than lead-acid batteries,
                  their extremely long cycle life (often &gt;4000 cycles) makes
                  them much more cost-effective in the long run.
                </div>
              )}
            </div>

            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => toggleFaq(3)}
                style={{
                  padding: "20px 25px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: openFaq === 3 ? "#f9f9f9" : "var(--bg-main)",
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.05rem",
                    fontWeight: openFaq === 3 ? "600" : "400",
                  }}
                >
                  Which is the best inverter battery for home?
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  style={{
                    transform:
                      openFaq === 3 ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq === 3 && (
                <div
                  style={{
                    padding: "0 25px 20px",
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    background: "#f9f9f9",
                  }}
                >
                  The best inverter battery is one that fits your home's power
                  demands, space constraints, and budget. MotoMax EV lithium
                  batteries (like our TK25100) are considered top-tier for
                  modern homes because of their compact form factor, integrated
                  BMS, and safety features.
                </div>
              )}
            </div>

            <div
              style={{
                border: "1px solid #eaeaea",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => toggleFaq(4)}
                style={{
                  padding: "20px 25px",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: openFaq === 4 ? "#f9f9f9" : "var(--bg-main)",
                  transition: "all 0.2s",
                }}
              >
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.05rem",
                    fontWeight: openFaq === 4 ? "600" : "400",
                  }}
                >
                  How long does a lithium inverter battery last?
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#666"
                  strokeWidth="2"
                  style={{
                    transform:
                      openFaq === 4 ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {openFaq === 4 && (
                <div
                  style={{
                    padding: "0 25px 20px",
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    background: "#f9f9f9",
                  }}
                >
                  Our MotoMax EV lithium batteries have an expected life of over
                  12 years in standard conditions, delivering over 4000
                  charge/discharge cycles. This drastically outlasts traditional
                  batteries that often need replacement every 3-5 years.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LithiumInverterBattery;
