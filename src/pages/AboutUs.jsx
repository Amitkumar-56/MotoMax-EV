import React from "react";
import "../index.css";

const AboutUs = () => {
  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)" }}>
      <style>
        {`
          @media (max-width: 768px) {
            .hero-container { height: 300px !important; }
            .section-title { font-size: 2rem !important; }
            h4[style*="5rem"] { font-size: 3rem !important; top: -40px !important; left: 0 !important; white-space: normal !important; width: 100%; word-break: break-word; }
            h2[style*="3rem"] { font-size: 2.2rem !important; }
            h2[style*="2.5rem"] { font-size: 2rem !important; }
            div[style*="flex: 1 1 500px"], div[style*="flex: 1 1 400px"], div[style*="flex: 1 1 350px"], div[style*="flex: 2 1 600px"] {
              flex: 1 1 100% !important;
            }
            .section-padding { padding: 3rem 5% !important; }
            div[style*="flex-direction: row-reverse"] { flex-direction: column !important; }
            img[style*="height: 500px"] { height: 300px !important; }
          }
        `}
      </style>

      {/* 1. Hero Image */}
      <div
        className="hero-container"
        style={{ width: "100%", height: "500px", overflow: "hidden" }}
      >
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600"
          alt="Team Meeting"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* 2. Powering a Greener Tomorrow */}
      <section className="section-padding text-center">
        <h1 className="section-title" style={{ fontSize: "2.5rem" }}>
          Powering a Greener
          <br />
          Tomorrow
        </h1>
        <p
          className="section-subtitle"
          style={{
            maxWidth: "800px",
            margin: "1rem auto 4rem",
            fontSize: "0.95rem",
          }}
        >
          MotoMax EV is one of India's earliest pioneers and most trusted names
          in the energy storage and electric mobility space. Established in
          2004, the company has consistently led the transition towards
          sustainable transportation, emerging as India's leading manufacturer
          of lithium-ion batteries.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            alignItems: "center",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              Under the guidance of{" "}
              <strong>Mr. Samrath Jit Singh, Founder and CEO</strong>, MotoMax
              EV has built a legacy of over two decades in clean tech
              innovation. His vision of creating an inclusive and greener future
              continues to inspire MotoMax EV's mission of powering smarter
              cities, cleaner transportation, and energy independence, one
              battery at a time.
            </p>
            <button
              style={{
                background: "var(--text-muted)",
                color: "var(--bg-main)",
                border: "none",
                padding: "10px 25px",
                borderRadius: "30px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  background: "var(--bg-main)",
                  borderRadius: "50%",
                }}
              ></span>{" "}
              Read More
            </button>
          </div>

          <div
            style={{
              flex: "1 1 350px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#fcefe3",
                borderRadius: "30px",
                padding: "0 20px",
                display: "inline-block",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                alt="CEO"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  display: "block",
                  borderRadius: "30px",
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Impact */}
      <section className="section-padding" style={{ paddingTop: "0" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* E-Rickshaw Image */}
          <div style={{ flex: "1 1 500px" }}>
            <img
              src="/assets/5.png"
              alt="Electric Vehicle"
              style={{
                width: "100%",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))",
                borderRadius: "15px",
              }}
            />
          </div>

          <div
            style={{
              flex: "1 1 500px",
              position: "relative",
              textAlign: "left",
            }}
          >
            <h4
              style={{
                color: "transparent",
                fontSize: "clamp(3rem, 10vw, 5rem)",
                fontWeight: 900,
                position: "absolute",
                top: "-50px",
                left: "-10px",
                zIndex: 0,
                whiteSpace: "normal",
                wordBreak: "break-word",
                width: "100%",
              }}
            >
              Our Impact
            </h4>
            <h2
              className="section-title"
              style={{
                position: "relative",
                zIndex: 1,
                fontSize: "2.5rem",
                marginBottom: "30px",
              }}
            >
              Our
              <br />
              Impact
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                marginBottom: "15px",
                position: "relative",
                zIndex: 1,
              }}
            >
              At the heart of MotoMax EV's success is its{" "}
              <strong>Li-EV battery series</strong>, engineered for durability,
              safety, and top-tier performance across diverse Indian terrains.
              These advanced battery packs currently power
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                marginBottom: "40px",
                position: "relative",
                zIndex: 1,
              }}
            >
              helping electrify India's streets from last-mile delivery fleets
              to everyday commuters and premium EV users. The company's
              IP67-rated EV chargers offer unmatched reliability and weather
              resistance, trusted by top OEMs and fleet operators nationwide.
            </p>

            <div style={{ display: "flex", gap: "60px" }}>
              <div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "5px",
                  }}
                >
                  More than
                </p>
                <h3
                  style={{
                    color: "#5be8c0",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                  }}
                >
                  300,000
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  electric two-wheelers
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8rem",
                    marginBottom: "5px",
                  }}
                >
                  Over
                </p>
                <h3
                  style={{
                    color: "#ffb997",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                  }}
                >
                  250,000
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  e-rickshaws
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Built on Quality and Innovation */}
      <section className="section-padding text-center">
        <h2 className="section-title">
          Built on Quality and
          <br />
          Innovation
        </h2>
        <p
          className="section-subtitle"
          style={{
            maxWidth: "700px",
            margin: "1rem auto 4rem",
            fontSize: "0.95rem",
          }}
        >
          Every MotoMax EV product reflects our uncompromising focus on
          performance, safety, and quality
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#5be8c0",
                margin: "0 auto 20px",
              }}
            ></div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              BIS-certified and AIS-156
              <br />
              compliant batteries
            </p>
          </div>

          <div>
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#ffb997",
                margin: "0 auto 20px",
              }}
            ></div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              Advanced Battery
              <br />
              Management Systems (BMS)
              <br />
              for thermal stability & extended
              <br />
              lifecycle
            </p>
          </div>

          <div>
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#5be8c0",
                margin: "0 auto 20px",
              }}
            ></div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              IP67-rated chargers for rugged
              <br />& reliable operation
            </p>
          </div>

          <div>
            <div
              style={{
                width: "40px",
                height: "3px",
                background: "#ffb997",
                margin: "0 auto 20px",
              }}
            ></div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
              Rigorous quality control
              <br />
              protocols at every step of
              <br />
              production
            </p>
          </div>
        </div>
      </section>

      {/* 5. Our People & Infrastructure */}
      <section
        style={{ position: "relative", width: "100%", paddingBottom: "100px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
          alt="Factory Floor"
          style={{ width: "100%", height: "500px", objectFit: "contain" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bg-main)",
            width: "80%",
            maxWidth: "900px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            textAlign: "left",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: 800,
              marginBottom: "10px",
            }}
          >
            Our People & Infrastructure
          </h2>
          <p
            style={{ color: "#888", fontSize: "0.85rem", marginBottom: "20px" }}
          >
            Our strength lies in our people and infrastructure
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.6" }}>
            MotoMax EV employs approximately 800 people, a number set to grow to
            1,000 with the commissioning of its new plant. The company maintains
            a sharp focus on R&D and Quality Control, with over 40 professionals
            dedicated to these functions. Its nationwide Service team,
            comprising more than 160 members, ensures consistent product support
            and customer satisfaction across India.
          </p>
        </div>
      </section>

      {/* 6. Beyond Mobility */}
      <section className="section-padding">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto 60px",
          }}
        >
          <div style={{ flex: "1 1 300px" }}>
            <h2
              style={{
                fontSize: "3rem",
                fontWeight: 900,
                marginBottom: "20px",
                lineHeight: 1.1,
              }}
            >
              Beyond
              <br />
              Mobility
            </h2>
            <p style={{ color: "#666", fontSize: "1.1rem" }}>
              MotoMax EV's diverse product portfolio also supports
            </p>
          </div>
          <div
            style={{
              flex: "2 1 600px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800"
              alt="Energy Storage Unit"
              style={{
                width: "100%",
                maxWidth: "700px",
                filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto 40px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            Telecom
            <br />
            Infrastructure
          </h3>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            Grid-Scale Energy
            <br />
            Storage
          </h3>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            Residential Solar
            <br />
            Energy Systems
          </h3>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          This positions us as a full-spectrum clean energy solutions provider,
          empowering industries, homes, and communities.
        </p>
      </section>

      {/* 7. Together, let's drive the change */}
      <section
        className="section-padding"
        style={{ background: "#fcfcfc", borderTop: "1px solid #eee" }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            textAlign: "left",
            maxWidth: "1200px",
            margin: "0 auto 20px",
            color: "var(--text-main)",
          }}
        >
          Together, let's drive the change
          <br />
          toward a cleaner tomorrow.
        </h2>
        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "60px",
            color: "var(--text-main)",
          }}
        >
          Enabling India's Net Zero Mission
        </h3>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "80px",
          }}
        >
          {/* Row 1 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "50px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <img
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600"
                alt="Net Zero Plant"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 500px" }}>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                }}
              >
                MotoMax EV is a catalyst for change in India's journey toward
                clean, affordable, and inclusive mobility.
              </p>
              <p
                style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}
              >
                The company actively supports Government of India's mission of
                an Net Zero India by enabling a robust EV supply chain from the
                ground up. Whether it's powering an e-rickshaw owner earning
                their daily livelihood or supporting the electrification needs
                of large OEMs and fleet operators, MotoMax EV is helping
                democratise access to sustainable mobility.
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "50px",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <div style={{ flex: "1 1 400px" }}>
              <img
                src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=600"
                alt="Looking Ahead Eye"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                }}
              />
            </div>
            <div style={{ flex: "1 1 500px" }}>
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 400,
                  marginBottom: "20px",
                  color: "var(--text-main)",
                }}
              >
                Looking Ahead
              </h3>
              <p
                style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.7 }}
              >
                MotoMax EV is now expanding into new markets with growing EV and
                renewable energy demand. Backed by state-of-the-art
                manufacturing, a dedicated R&D center, and a vision-driven
                leadership, the company is scaling its impact globally while
                staying rooted in innovation and sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
