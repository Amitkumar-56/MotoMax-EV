import React from "react";

const SolarStreetLightStorage = () => {
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
            div[style*="width: 55%"] { width: 100% !important; }
            div[style*="padding: 60px"] { padding: 30px 20px !important; }
            div[style*="padding: 60px 80px"] { padding: 30px !important; display: flex !important; flex-direction: column !important; }
            img[style*="right: 10%"] { position: relative !important; right: 0 !important; top: 0 !important; margin: 20px auto 0 !important; width: 150px !important; height: auto !important; }
            ul[style*="45%"] { flex: 1 1 100% !important; text-align: left !important; padding-right: 0 !important; }
            div[style*="paddingLeft: 50px"] { padding-left: 0 !important; }
            div[style*="borderTop"] { display: none !important; }
            button[style*="padding: 10px 20px"] { width: 100% !important; }
            div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; gap: 15px !important; }
            div[style*="padding: 50px 30px"] { min-height: 150px !important; padding: 25px 20px !important; }
            div[style*="flex: 1 1 380px"], div[style*="flex: 1 1 300px"] { flex: 1 1 100% !important; padding-left: 0 !important; }
            div[style*="bottom: -50px"] { position: relative !important; bottom: 0 !important; justify-content: center !important; left: 0 !important; margin-top: -100px !important; }
            img[style*="height: 450px"], img[style*="height: 480px"] { height: 250px !important; width: auto !important; }
            img[style*="height: 380px"] { height: 200px !important; width: auto !important; margin-left: 10px !important; }
            h4[style*="11vw"] { font-size: 15vw !important; }
            div[style*="padding: 20px 25px"] { justify-content: space-between !important; flex-wrap: nowrap !important; }
            h1[style*="3rem"] { font-size: 2.2rem !important; }
          }
        `}
      </style>

            {/* Premium Hero Section */}
      <div className="premium-product-hero">
        <div className="hero-particles"></div>
        <div className="premium-hero-container">
          <div className="premium-hero-text">
            <span className="premium-badge">Next-Gen Tech</span>
            <h1 className="premium-hero-title">Solar Street Light Battery</h1>
            <p className="premium-hero-subtitle">Experience unmatched performance, reliability, and innovation with MotoMax EV's state-of-the-art solar street light battery. Designed for maximum efficiency and power delivery.</p>
          </div>
          <div className="premium-hero-img-wrapper">
            <img src="/assets/3.png" alt="Solar Street Light Battery" className="premium-hero-img" />
          </div>
        </div>
      </div>
      
      {/* 2. Title Section & Battery Cluster */}
      <section style={{ padding: "80px 10% 40px", position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {/* Left: Green Title Box */}
          <div style={{ position: "relative", width: "55%" }}>
            <div
              style={{
                background: "var(--secondary)",
                padding: "60px",
                borderRadius: "20px",
                transform: "skew(-5deg)",
                boxShadow: "0 15px 30px rgba(156, 240, 196, 0.3)",
              }}
            >
              <div style={{ transform: "skew(5deg)" }}>
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: 900,
                    color: "var(--text-main)",
                    lineHeight: "1.2",
                    marginBottom: "20px",
                  }}
                >
                  Solar Street Light
                  <br />& Solar Panel
                  <br />
                  Cleaning
                  <br />
                  Robots Battery
                </h1>
                <p
                  style={{ fontSize: "1.2rem", color: "var(--text-main)", fontWeight: 600 }}
                >
                  Lithium iron Phosphate (LiFePO4) Battery
                </p>
              </div>
            </div>
          </div>

          {/* Right: Battery Cluster Image */}
          <div
            style={{
              flex: "1 1 300px",
              maxWidth: "100%",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src="/assets/3.png"
              alt="Solar Batteries Cluster"
              style={{
                width: "120%",
                maxWidth: "700px",
                transform: "translateX(-10%)",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Description Paragraph */}
        <div style={{ marginTop: "50px", maxWidth: "800px" }}>
          <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.8" }}>
            MotoMax EV's LiFePO4 battery solutions offer a highly advanced and
            efficient alternative to traditional lead-acid technology, making
            them an ideal choice for energy storage systems. Known for their
            superior performance and reliability, these batteries are designed
            to meet the growing demands of modern industries. Among the most
            popular options is the LDP 24-150 battery, which has gained
            significant traction across various sectors due to its advanced
            features and consistent power delivery. Whether for industrial use
            or large-scale energy storage, MotoMax EV's solutions provide
            dependable and innovative energy storage options.
          </p>
        </div>
      </section>

      {/* 3. Salient Features */}
      <section
        style={{
          padding: "60px 10%",
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
            Salient Features
          </span>
        </div>

        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            color: "#1a1a1a",
            marginBottom: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Salient Features
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            lineHeight: "1.8",
            maxWidth: "900px",
            margin: "0 auto 60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          These batteries are ideal for solar panel cleaning robots, solar and
          wind energy storage systems, UPS backup power, telecommunication,
          medical equipment, and solar street lights, offering reliable and
          efficient energy solutions.
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
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "center",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                <path d="M12 2v10l8.66 5"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)" }}>
              Environmental
              <br />
              Friendly
            </h3>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "center",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)" }}>
              Power Saving
            </h3>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "center",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)" }}>
              No Maintenance
            </h3>
          </div>

          {/* Card 4 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "center",
              minHeight: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              <svg
                width="60"
                height="60"
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
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-main)" }}>
              Advanced BMS
              <br />
              Protection
            </h3>
          </div>
        </div>
      </section>

      {/* 4. Product Specifications */}
      <section
        style={{
          padding: "80px 5%",
          textAlign: "center",
          position: "relative",
          marginTop: "40px",
        }}
      >
        {/* Faded Background Text */}
        <div
          style={{
            position: "absolute",
            top: "-2%",
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

        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            color: "#1a1a1a",
            marginBottom: "100px",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <span style={{ color: "#ff6b35" }}>Product Specifications</span>
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "60px",
            position: "relative",
            zIndex: 1,
            maxWidth: "1400px",
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
              width: "35%",
            }}
          >
            <div style={{ position: "relative" }}>
              <h4
                style={{
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Capacity
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                Voltage
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    18Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    30Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    52Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    60Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    90Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    105Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    232Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    314Ah
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>12.8/25.6V</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "-15%",
                  top: "20px",
                  width: "15%",
                  borderTop: "1px solid #999",
                  borderRight: "1px solid #999",
                  borderTopRightRadius: "10px",
                  height: "80px",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-16%",
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
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Watt Hours
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                Continuous Charge Current (Max)
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  fontSize: "0.9rem",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    230.4/460.8Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>9A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    384/768Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>115A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    1331.2Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>25A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    768/1536Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>30A(0.5C)</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  fontSize: "0.9rem",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    1152/2304Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>45A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    1344/2688Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>53A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    2970/5939Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>116A(0.5C)</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    4019/8039Wh
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>157A(0.5C)</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "-15%",
                  top: "20px",
                  width: "15%",
                  borderTop: "1px solid #999",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-16%",
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
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Continuous discharge
                <br />
                current (max)
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                Cell type
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  fontSize: "0.9rem",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    9A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Cylindrical</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    115A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Cylindrical</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    25A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Prismatic</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    30A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Cylindrical</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  fontSize: "0.9rem",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    45A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Cylindrical</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    53A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Prismatic</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    116A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Prismatic</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    157A(0.5C)
                  </span>
                  <br />
                  <span style={{ color: "#666" }}>Prismatic</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "-15%",
                  top: "20px",
                  width: "15%",
                  borderTop: "1px solid #999",
                  borderRight: "1px solid #999",
                  borderBottomRightRadius: "10px",
                  height: "80px",
                  transform: "scaleY(-1)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-16%",
                  top: "17px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--text-muted)",
                }}
              ></div>
            </div>
          </div>

          {/* Center Spine + Battery Image */}
          <div
            style={{
              width: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "1px",
                background: "var(--border-light)",
                height: "300px",
                marginBottom: "20px",
              }}
            ></div>
            <img
              src="/assets/3.png"
              alt="Solar Black Battery"
              style={{
                width: "400px",
                maxWidth: "none",
                objectFit: "contain",
                zIndex: 5,
              }}
            />
          </div>

          {/* Right Specs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              textAlign: "right",
              width: "35%",
            }}
          >
            <div style={{ position: "relative" }}>
              <h4
                style={{
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Recommended
                <br />
                charge voltage
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                Float voltage
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>29.2V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    14.4/29.2V
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>13.8/27.6V</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "-15%",
                  top: "20px",
                  width: "15%",
                  borderTop: "1px solid #999",
                  borderLeft: "1px solid #999",
                  borderTopLeftRadius: "10px",
                  height: "80px",
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
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Cut Off
                <br />
                Temperature
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                E13 Marking
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "40px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "40px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    75±5°C
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>Yes</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "-15%",
                  top: "20px",
                  width: "15%",
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
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Dimensions
              </h4>
              <p
                style={{ color: "var(--text-muted)", fontWeight: 700, marginBottom: "5px" }}
              >
                E13 Marking
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
                <div>
                  <span style={{ color: "#d38b6a", fontWeight: 600 }}>
                    Customized
                  </span>
                  <br />
                  <span style={{ color: "#aaa" }}>TK1218</span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "-15%",
                  top: "20px",
                  width: "15%",
                  borderTop: "1px solid #999",
                  borderLeft: "1px solid #999",
                  borderBottomLeftRadius: "10px",
                  height: "80px",
                  transform: "scaleY(-1)",
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
      </section>
    </div>
  );
};

export default SolarStreetLightStorage;
