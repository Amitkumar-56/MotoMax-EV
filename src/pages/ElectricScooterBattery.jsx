import React, { useState } from "react";
import "../index.css";

const ElectricScooterBattery = () => {
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
          src="/assets/scooter-hero.jpg"
          alt="Scooter Background"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Mocking the two batteries on the left foreground */}
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "10%",
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
            zIndex: 2,
          }}
        >
          <img
            src="/assets/battery-product.jpg"
            alt="Battery 1"
            style={{
              width: "220px",
              height: "450px",
              objectFit: "cover",
              borderRadius: "15px",
              filter: "drop-shadow(10px 20px 30px rgba(0,0,0,0.6))",
            }}
          />
          <img
            src="/assets/battery-product.jpg"
            alt="Battery 2"
            style={{
              width: "180px",
              height: "380px",
              objectFit: "cover",
              borderRadius: "15px",
              filter: "drop-shadow(10px 20px 30px rgba(0,0,0,0.6))",
              marginLeft: "-40px",
            }}
          />
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
            marginBottom: "40px",
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
            51V 45Ah (V2) Medium
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
            61V 48Ah (Hebby)
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
            64V 32Ah (Lite)
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
            51V 60Ah (V2)
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
                Scooter
                <br />
                Lithium Battery
              </h2>
              <p style={{ fontSize: "1.2rem", color: "var(--text-main)", fontWeight: 500 }}>
                51V 45Ah (2.3kWh)
              </p>
            </div>
          </div>
          {/* Overlapping Battery Image on Right */}
          <img
            src="/assets/battery-product.jpg"
            alt="Product Battery"
            style={{
              width: "220px",
              height: "480px",
              objectFit: "cover",
              borderRadius: "15px",
              position: "absolute",
              right: "10%",
              top: "-60px",
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
          The MotoMax EV electric scooter battery is a high-performance lithium
          battery designed for modern electric two-wheelers. Built using
          advanced lithium-ion technology, this e scooter lithium battery
          delivers longer riding range, faster charging and superior durability
          compared to traditional batteries. The 2 wheeler lithium battery is
          lightweight, energy efficient and engineered to support daily electric
          mobility. Whether you are upgrading your existing e scooter battery or
          replacing an old battery, MotoMax EV provides reliable performance and
          long-lasting power for electric scooters.
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
          Electric Scooter Battery
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
          Safety and reliability are essential for electric mobility. The
          MotoMax EV electric scooter battery is built with advanced safety
          protection systems that ensure stable performance and long-term
          durability. With intelligent battery management and multiple
          protection layers, this 2 wheeler lithium battery provides safe and
          reliable power for electric scooters.
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
            {/* SVG Icon 1 */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-main)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: "20px" }}
            >
              <rect x="7" y="4" width="10" height="16" rx="1" ry="1"></rect>
              <line x1="11" y1="2" x2="13" y2="2"></line>
              <polyline points="11 10 14 10 10 15 13 15"></polyline>
            </svg>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Over-charge/
              <br />
              Over-discharge
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              The smart battery management system protects the electric scooter
              battery from over-charging and deep discharge, improving battery
              safety and extending battery life.
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
            {/* SVG Icon 2 */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-main)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: "20px" }}
            >
              <path d="M12 2v20"></path>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Short circuit
              <br />
              <br />
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              The e scooter battery is designed with built-in protection to
              prevent damage caused by electrical faults, ensuring safe
              operation during daily use.
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
            {/* SVG Icon 3 */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-main)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: "20px" }}
            >
              <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
            </svg>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Thermal
              <br />
              Stability
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              This e scooter lithium battery can operate efficiently across
              varying temperature conditions while maintaining stable
              performance.
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
            {/* SVG Icon 4 */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-main)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: "20px" }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="21.17" y1="8" x2="12" y2="8"></line>
              <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
              <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
            </svg>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                marginBottom: "15px",
                color: "var(--text-main)",
                lineHeight: 1.3,
              }}
            >
              Impact &<br />
              Vibration
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              The 2 wheeler lithium battery is engineered to withstand vibration
              and shocks commonly experienced in electric scooters and rough
              road conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "#1a1a1a",
              marginBottom: "20px",
              lineHeight: 1.2,
            }}
          >
            Key Features of E Scooter Lithium
            <br />
            Battery
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.7,
              marginBottom: "60px",
              fontSize: "1rem",
              maxWidth: "1100px",
            }}
          >
            The MotoMax EV e scooter battery is designed to deliver high energy
            efficiency, longer battery life and better riding range compared to
            conventional batteries used in electric scooters. With advanced
            lithium technology, this e scooter lithium battery ensures reliable
            performance, lower maintenance and improved energy storage for
            electric mobility.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Left Column Bullets */}
            <ul
              style={{
                flex: "0 0 45%",
                listStyleType: "none",
                paddingLeft: "0",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>{" "}
                Attractive cycle life
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>{" "}
                Extended safety performance
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>{" "}
                Wide operating temperature range
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>{" "}
                Unrivalled high temperature performance
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>{" "}
                Green energy without metal contaminant
              </li>
            </ul>

            {/* Right Column Bullets (Right-Aligned Text & Bullets) */}
            <ul
              style={{
                flex: "0 0 45%",
                listStyleType: "none",
                paddingRight: "0",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                textAlign: "right",
              }}
            >
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingRight: "20px",
                }}
              >
                High capacity{" "}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingRight: "20px",
                }}
              >
                Steady output voltage{" "}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingRight: "20px",
                }}
              >
                Little self-discharge{" "}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingRight: "20px",
                }}
              >
                Double safety protection{" "}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>
              </li>
              <li
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.05rem",
                  position: "relative",
                  paddingRight: "20px",
                }}
              >
                Withstanding very high level of vibrations and shocks{" "}
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "1.5rem",
                    lineHeight: 0,
                    color: "var(--text-main)",
                  }}
                >
                  •
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Product Specifications */}
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
              Product Specifications
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
            Operation Conditions
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
            {/* Center Battery */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <img
                src="/assets/battery-product.jpg"
                alt="Specs Battery"
                style={{
                  width: "280px",
                  height: "480px",
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
                top: "5%",
                bottom: "5%",
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
                  Max. Charge Voltage
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>57.6V</p>
                {/* Custom pointer line */}
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                      marginRight: "-3px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Standard Charge Current
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>16A</p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                      marginRight: "-3px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Max. Charge Current
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>24A</p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                      marginRight: "-3px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Continuous Discharge Current
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>45A</p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                      marginRight: "-3px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Peak Instant Discharge Current
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>90A</p>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    top: "15px",
                    width: "70px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                      marginRight: "-3px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right Specs */}
            <div
              style={{
                position: "relative",
                top: "10%",
                bottom: "10%",
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
                  Peak Instant Discharge Time
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>3 Second</p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Discharge Cut-off Voltage
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>44.8V</p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Discharge Temperature
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>-20°C ~ 60°C</p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
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
                  Storage Temperature
                </h4>
                <p style={{ color: "#aaa", fontSize: "1rem" }}>15°C ~ 35°C</p>
                <div
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: "15px",
                    width: "40px",
                    borderTop: "2px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-3px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--border-light)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mechanical and Electrical Characteristics Tree */}
      <section
        style={{ padding: "80px 5%", textAlign: "center", background: "var(--bg-main)" }}
      >
        <div
          style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}
        >
          {/* Central Spine Line */}
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

          {/* Mechanical Pill */}
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
                fontSize: "1.4rem",
                color: "var(--text-main)",
                letterSpacing: "1px",
              }}
            >
              MECHANICAL CHARACTERISTICS
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
              {/* Left Side */}
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
                    Height
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>357±2mm</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "15px",
                      width: "30%",
                      borderTop: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderTopRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "12px",
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
                    Width
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>165±2mm</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "-15px",
                      width: "30%",
                      borderBottom: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderBottomRightRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "12px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Right Side */}
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
                    Length
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>165±2mm</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "15px",
                      width: "30%",
                      borderTop: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderTopLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "12px",
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
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>~20kg</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "-15px",
                      width: "30%",
                      borderBottom: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderBottomLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "12px",
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

          {/* Electrical Pill */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: "100px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "#fce3d2",
                display: "inline-block",
                padding: "15px 40px",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: "var(--text-main)",
                letterSpacing: "1px",
              }}
            >
              ELECTRICAL CHARACTERISTICS
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
              {/* Left Side */}
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
                    Nominal Voltage
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>51V</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "15px",
                      width: "30%",
                      borderTop: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderTopRightRadius: "10px",
                      height: "55px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "12px",
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
                    Nominal Capacity
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>45Ah</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "15px",
                      width: "30%",
                      borderTop: "1px solid #999",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "12px",
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
                    Battery pack energy
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>2.3kWh</p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "-40px",
                      width: "30%",
                      borderBottom: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderBottomRightRadius: "10px",
                      height: "55px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      right: "-15%",
                      top: "12px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--text-muted)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Right Side */}
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
                    Impedance (Max. at 1000Hz)
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1rem" }}>≤15mΩ</p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "15px",
                      width: "30%",
                      borderTop: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderTopLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "12px",
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
                    Expected Cycle Life
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "0.95rem" }}>
                    2000 Cycles at 0.5°C,
                    <br />
                    25°C operating range
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "-15px",
                      width: "30%",
                      borderBottom: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderBottomLeftRadius: "10px",
                      height: "30px",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "12px",
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

      {/* 7. FAQ */}
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
            Everything you need to know about MotoMax EV Electric Scooter
            Lithium Batteries
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              textAlign: "left",
            }}
          >
            {/* FAQ Item 1 */}
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
                  What is an electric scooter battery?
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
                  An electric scooter battery is the primary energy source that
                  powers the motor and electronics of the scooter. MotoMax EV
                  provides advanced lithium-ion batteries that offer high energy
                  density, lighter weight, and longer lifespan compared to
                  traditional lead-acid batteries.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
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
                  What is the electric scooter battery price in India?
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
                  The price of an electric scooter battery in India varies
                  depending on the capacity (Ah), voltage (V), and the specific
                  model. MotoMax EV offers highly competitive pricing for
                  premium lithium-ion packs. Please contact our sales team or
                  check our pricing catalog for exact models.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
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
                  What warranty does MotoMax EV offer on electric scooter
                  lithium batteries?
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
                  MotoMax EV stands behind the quality of its products. We offer
                  a comprehensive warranty on our electric scooter lithium
                  batteries, typically covering manufacturing defects and
                  performance guarantees for up to 3 years. Check your specific
                  product documentation for exact terms.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
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
                  Why choose a lithium battery for electric scooters?
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
                  Lithium batteries are superior because they offer a higher
                  energy density, meaning they provide longer range at a much
                  lighter weight. They also charge faster, have a longer overall
                  cycle life (up to 2000 cycles), and are virtually
                  maintenance-free compared to older technologies.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectricScooterBattery;
