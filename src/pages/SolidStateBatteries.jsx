import React from "react";

const SolidStateBatteries = () => {
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
            h1[style*="3.5rem"] { font-size: 2.2rem !important; }
          }
        `}
      </style>

      {/* 1. Hero Image (Drone over City) */}
      <div
        style={{
          width: "100%",
          height: "60vh",
          minHeight: "400px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="/assets/4.png"
          alt="Drone flying over city at sunset"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
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
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "var(--text-main)",
                    lineHeight: "1.2",
                    marginBottom: "20px",
                  }}
                >
                  Solid State
                  <br />
                  Lithium
                  <br />
                  Batteries
                </h1>
                <p
                  style={{ fontSize: "1.4rem", color: "var(--text-main)", fontWeight: 600 }}
                >
                  14.8V - 44.4V to 4.2AH - 30AH
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
              src="/assets/4.png"
              alt="Drone Batteries Cluster"
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
        <div style={{ marginTop: "50px", maxWidth: "850px" }}>
          <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.8" }}>
            Drones are revolutionizing industries with unmatched versatility. In
            agriculture, they improve crop monitoring, spraying, and yield
            analysis. Videography benefits from unique aerial perspectives for
            films, events, and commercials. Surveillance uses include border
            control, crowd management, and wildlife monitoring. In logistics,
            drones deliver goods to remote areas, while UAVs serve diverse
            industrial needs. Tethered drones provide uninterrupted operation,
            and FPV drones excel in racing, agile inspections, and dynamic
            filming. Advances in technology continue to expand their
            applications, boosting efficiency and innovation across sectors.
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
              textAlign: "left",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "35px" }}>
              <svg
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-main)",
                lineHeight: "1.3",
              }}
            >
              Stable
              <br />
              Performance
            </h3>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "left",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "35px" }}>
              <svg
                width="70"
                height="70"
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
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-main)",
                lineHeight: "1.3",
              }}
            >
              Safety &<br />
              Reliability
            </h3>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "left",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "35px" }}>
              <svg
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-main)",
                lineHeight: "1.3",
              }}
            >
              Customized
              <br />
              Solution
            </h3>
          </div>

          {/* Card 4 */}
          <div
            style={{
              background: "transparent",
              padding: "50px 30px",
              borderRadius: "10px",
              textAlign: "left",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: "35px" }}>
              <svg
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text-main)",
                lineHeight: "1.3",
              }}
            >
              Thermal
              <br />
              Stability
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
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Left Specs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "80px",
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
                  marginBottom: "5px",
                }}
              >
                Nominal Voltage
              </h4>
              <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                14.8V, 22.2V, 22.2V,
                <br />
                22.2V, 22.2V, 44.4V
              </p>
              <div
                style={{
                  position: "absolute",
                  right: "-10%",
                  top: "20px",
                  width: "15%",
                  borderBottom: "1px solid #999",
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
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "5px",
                }}
              >
                Nominal Capacity
              </h4>
              <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                22Ah, 6Ah, 22Ah,
                <br />
                27Ah, 30Ah, 22Ah
              </p>
              <div
                style={{
                  position: "absolute",
                  right: "-10%",
                  top: "20px",
                  width: "15%",
                  borderBottom: "1px solid #999",
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

          {/* Center Spine + Battery Image */}
          <div
            style={{
              width: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src="/assets/4.png"
              alt="Drone Battery Pack"
              style={{
                width: "100%",
                maxWidth: "300px",
                objectFit: "contain",
                zIndex: 5,
                borderRadius: "15px",
              }}
            />
            <div
              style={{
                width: "1px",
                background: "var(--border-light)",
                height: "150px",
                marginTop: "20px",
              }}
            ></div>
          </div>

          {/* Right Specs */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              textAlign: "left",
              width: "35%",
            }}
          >
            <div style={{ position: "relative", paddingLeft: "50px" }}>
              <div
                style={{
                  position: "absolute",
                  left: "-15%",
                  top: "20px",
                  width: "25%",
                  borderBottom: "1px solid #999",
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
              <h4
                style={{
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "5px",
                }}
              >
                Battery Pack
                <br />
                Energy
              </h4>
              <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                325.6Wh | 355.2Wh,
                <br />
                488.4Wh | 599.4Wh,
                <br />
                666Wh | 976.8Wh
              </p>
            </div>

            <div style={{ position: "relative", paddingLeft: "50px" }}>
              <div
                style={{
                  position: "absolute",
                  left: "-15%",
                  top: "20px",
                  width: "25%",
                  borderBottom: "1px solid #999",
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
              <h4
                style={{
                  color: "#d38b6a",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "5px",
                }}
              >
                Energy Density
              </h4>
              <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                247Wh/kg
                <br />
                238Wh/kg
                <br />
                250Wh/kg
                <br />
                252Wh/kg
                <br />
                57Wh/kg
                <br />
                250Wh/kg
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mechanical Characteristics */}
      <section
        style={{
          padding: "0px 5% 100px",
          textAlign: "center",
          background: "var(--bg-main)",
        }}
      >
        <div
          style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "-250px",
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
                padding: "20px 60px",
                borderRadius: "15px",
                fontWeight: 800,
                fontSize: "2rem",
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
                marginTop: "80px",
              }}
            >
              <div
                style={{
                  flex: "1 1 300px",
                  maxWidth: "100%",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "80px",
                  position: "relative",
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
                    Height
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                    190 ± 2 mm, 92 ± 2 mm, 190 ± 2 mm,
                    <br />
                    13 ± 2 mm | 213 ± 2 mm | 205 ± 2 mm,
                    <br />
                    190 ± 2 mm
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
                      height: "80px",
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
                      color: "#d38b6a",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Width
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                    42 ± 2 mm, 48 ± 2 mm, 62 ± 2 mm,
                    <br />
                    65 ± 2 mm, 65 ± 2 mm, 67 ± 2 mm,
                    <br />
                    62 ± 2 mm
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      right: "-10%",
                      top: "-60px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderRight: "1px solid #999",
                      borderBottomRightRadius: "10px",
                      height: "80px",
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
                  gap: "80px",
                  paddingLeft: "5%",
                  position: "relative",
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
                    Length
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                    73 ± 2 mm
                    <br />
                    76 ± 2 mm
                    <br />7 ± 2 mm
                    <br />1 ± 2 mm
                    <br />
                    91 ± 2 mm
                    <br />
                    89 ± 2 mm
                    <br />
                    154 ± 2 mm
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
                      height: "180px",
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
                <div style={{ position: "relative", marginTop: "20px" }}>
                  <h4
                    style={{
                      color: "#d38b6a",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Weight
                  </h4>
                  <p style={{ color: "#aaa", fontSize: "1.1rem" }}>
                    ~1.32 kg, ~1.49 kg
                    <br />
                    ~1.95 kg, ~2.38 kg
                  </p>
                  <div
                    style={{
                      position: "absolute",
                      left: "-15%",
                      top: "-60px",
                      width: "20%",
                      borderBottom: "1px solid #999",
                      borderLeft: "1px solid #999",
                      borderBottomLeftRadius: "10px",
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolidStateBatteries;
