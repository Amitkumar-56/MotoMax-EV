import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const defaultAbout = {
  hero_badge: "⚡ Pioneering Green Mobility Since 2004",
  hero_title: "Powering a Greener Tomorrow",
  hero_subtitle: "India's premier manufacturer of high-reliability lithium-ion batteries and advanced EV charging ecosystems.",
  hero_image: "/assets/slider-3.jpg",
  story_tag: "Our Heritage",
  story_title: "Driving India's Electric Revolution",
  story_para1: "MotoMax EV is one of India's earliest pioneers and most trusted names in the energy storage and electric mobility space. Established in 2004, the company has consistently led the transition towards sustainable transportation, emerging as India's leading manufacturer of lithium-ion batteries.",
  story_para2: "From heavy-duty commercial e-rickshaws to next-gen electric two-wheelers, our battery architectures are built from ground up to deliver uncompromising range, thermal safety, and extended lifecycles.",
  story_image: "/assets/slider-1.jpg",
  story_badge_number: "20+ Years",
  story_badge_text: "Clean Tech Innovation",
  founder_quote: "Our vision is to build an energy-independent India powered by smart, clean, and reliable mobility.",
  founder_name: "— Mr. Samrath Jit Singh, Founder & CEO",
  stat1_number: "300,000+",
  stat1_label: "Electric 2-Wheelers Powered",
  stat2_number: "250,000+",
  stat2_label: "E-Rickshaws on the Road",
  stat3_number: "800+",
  stat3_label: "Dedicated Professionals",
  stat4_number: "100%",
  stat4_label: "AIS-156 & BIS Certified",
  infra_tag: "Manufacturing Excellence",
  infra_title: "World-Class Infrastructure & People",
  infra_desc: "Our state-of-the-art automated manufacturing plants are backed by dedicated testing laboratories and rapid customer service hubs.",
  infra_image: "/assets/slider-2.jpg",
  infra_f1_title: "800+ Team Strength",
  infra_f1_text: "Expanding to 1,000+ members with our upcoming gigawatt-scale assembly facility.",
  infra_f2_title: "Dedicated R&D Center",
  infra_f2_text: "Over 40 elite engineers focusing solely on advanced battery chemistries and power electronics.",
  infra_f3_title: "Pan-India Service Network",
  infra_f3_text: "160+ service engineers ensuring on-ground product support, quick turnaround, and OEM confidence.",
  cta_title: "Together, Let's Drive India's Net-Zero Future",
  cta_text: "Partner with MotoMax EV for industry-leading lithium battery solutions, OEM integrations, and nationwide distribution."
};

const AboutUs = () => {
  const [about, setAbout] = useState(defaultAbout);

  useEffect(() => {
    fetch(`${API_BASE}/about.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "success" && data.data) {
          setAbout((prev) => ({ ...prev, ...data.data }));
        }
      })
      .catch((err) => console.error("Could not fetch about settings:", err));
  }, []);

  return (
    <div className="about-page-root">
      <style>{`
        .about-page-root {
          background: #ffffff;
          color: #0f172a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }

        /* Hero Banner */
        .about-hero {
          position: relative;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #090e17;
          overflow: hidden;
        }
        .about-hero-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.42;
          filter: scale(1.02);
          transition: transform 8s ease;
        }
        .about-hero:hover .about-hero-bg {
          transform: scale(1.06);
        }
        .about-hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(9, 14, 23, 0.7) 0%, rgba(9, 14, 23, 0.9) 100%);
        }
        .about-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 80px 24px;
        }
        .about-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 30px;
          background: rgba(254, 166, 3, 0.15);
          border: 1px solid rgba(254, 166, 3, 0.4);
          color: #FEA603;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .about-hero-title {
          font-size: clamp(2.3rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.15;
          color: #ffffff;
          letter-spacing: -1px;
          margin: 0 0 20px 0;
        }
        .about-hero-title span {
          background: linear-gradient(135deg, #FEA603 0%, #ff8c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-hero-subtitle {
          color: #cbd5e1;
          font-size: 1.15rem;
          line-height: 1.6;
          max-width: 720px;
          margin: 0 auto;
        }

        /* Container helper */
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Section wrapper */
        .about-section {
          padding: 90px 0;
        }
        .about-section-alt {
          background: #f8fafc;
        }

        /* Section Header */
        .section-header-center {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 55px;
        }
        .section-tag {
          color: #FEA603;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: inline-block;
        }
        .section-heading {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          letter-spacing: -0.5px;
          margin: 0 0 16px 0;
        }
        .section-desc {
          color: #64748b;
          font-size: 1.05rem;
          line-height: 1.65;
          margin: 0;
        }

        /* Story Section (Grid) */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .story-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #e2e8f0;
        }
        .story-card img {
          width: 100%;
          height: 100%;
          min-height: 420px;
          object-fit: cover;
          display: block;
        }
        .story-badge-floating {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(254, 166, 3, 0.3);
          border-radius: 16px;
          padding: 18px 24px;
          color: #ffffff;
        }
        .story-badge-floating h4 {
          font-size: 1.8rem;
          font-weight: 900;
          color: #FEA603;
          margin: 0;
          line-height: 1;
        }
        .story-badge-floating p {
          font-size: 0.82rem;
          color: #cbd5e1;
          margin: 6px 0 0 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .story-text h3 {
          font-size: 1.85rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 18px 0;
          line-height: 1.3;
        }
        .story-text p {
          color: #475569;
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 20px;
        }
        .story-leader-box {
          margin-top: 28px;
          padding: 20px 24px;
          background: #f1f5f9;
          border-left: 4px solid #FEA603;
          border-radius: 0 14px 14px 0;
        }
        .story-leader-box p {
          font-style: italic;
          color: #334155;
          margin: 0 0 8px 0;
          font-size: 0.95rem;
        }
        .story-leader-box span {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
        }

        /* Stat Counter Cards */
        .impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 50px;
        }
        .impact-stat-card {
          background: #ffffff;
          padding: 32px 24px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .impact-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px rgba(254, 166, 3, 0.12);
          border-color: rgba(254, 166, 3, 0.4);
        }
        .impact-stat-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 16px;
          border-radius: 14px;
          background: rgba(254, 166, 3, 0.12);
          color: #FEA603;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
        .impact-stat-number {
          font-size: 2.2rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }
        .impact-stat-label {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0;
        }

        /* Quality Pillars (4 Cards) */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .pillar-card {
          background: #ffffff;
          padding: 36px 28px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: #FEA603;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
        }
        .pillar-num {
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(254, 166, 3, 0.3);
          margin-bottom: 14px;
        }
        .pillar-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px 0;
        }
        .pillar-text {
          color: #64748b;
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Infrastructure Split */
        .infra-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .infra-image-wrap {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .infra-image-wrap img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          display: block;
        }
        .infra-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 24px;
        }
        .infra-feature-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .infra-feature-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #ecfdf5;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }
        .infra-feature-text h5 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px 0;
        }
        .infra-feature-text p {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        /* Beyond Mobility Cards */
        .beyond-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .beyond-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .beyond-card:hover {
          border-color: #FEA603;
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.06);
        }
        .beyond-icon {
          font-size: 2.2rem;
          margin-bottom: 14px;
        }
        .beyond-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
        }
        .beyond-text {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
        }

        /* CTA Banner */
        .about-cta-section {
          background: linear-gradient(135deg, #090e17 0%, #1e293b 100%);
          border-radius: 30px;
          padding: 60px 40px;
          text-align: center;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          margin-bottom: 80px;
        }
        .about-cta-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(254, 166, 3, 0.25) 0%, transparent 70%);
          border-radius: 50%;
        }
        .about-cta-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 900;
          margin: 0 0 16px 0;
          letter-spacing: -0.5px;
        }
        .about-cta-text {
          color: #cbd5e1;
          font-size: 1.05rem;
          max-width: 650px;
          margin: 0 auto 30px;
          line-height: 1.6;
        }
        .about-cta-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-cta-gold {
          background: linear-gradient(135deg, #FEA603 0%, #ff8c00 100%);
          color: #ffffff;
          font-weight: 700;
          padding: 14px 34px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 0.95rem;
          box-shadow: 0 10px 25px rgba(254, 166, 3, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-cta-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(254, 166, 3, 0.5);
        }
        .btn-cta-outline {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 0.95rem;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-cta-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .story-grid, .infra-split {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .beyond-grid {
            grid-template-columns: 1fr;
          }
          .story-card img {
            min-height: 320px;
          }
        }
        @media (max-width: 640px) {
          .impact-grid {
            grid-template-columns: 1fr;
          }
          .about-section {
            padding: 60px 0;
          }
          .about-cta-section {
            padding: 40px 20px;
            border-radius: 20px;
          }
        }
      `}</style>

      {/* 1. Hero Banner */}
      <section className="about-hero">
        <img src={about.hero_image || "/assets/slider-3.jpg"} alt="MotoMax EV Facility" className="about-hero-bg" onError={(e) => { e.currentTarget.src = "/assets/slider-3.jpg"; }} />
        <div className="about-hero-gradient" />
        <div className="about-hero-content">
          <div className="about-hero-badge">
            <span>{about.hero_badge}</span>
          </div>
          <h1 className="about-hero-title">
            {about.hero_title}
          </h1>
          <p className="about-hero-subtitle">
            {about.hero_subtitle}
          </p>
        </div>
      </section>

      {/* 2. Our Legacy & Founder */}
      <section className="about-section">
        <div className="about-container">
          <div className="story-grid">
            <div className="story-card">
              <img src={about.story_image || "/assets/slider-1.jpg"} alt="MotoMax Innovation" onError={(e) => { e.currentTarget.src = "/assets/5.png"; }} />
              <div className="story-badge-floating">
                <h4>{about.story_badge_number}</h4>
                <p>{about.story_badge_text}</p>
              </div>
            </div>

            <div className="story-text">
              <span className="section-tag">{about.story_tag}</span>
              <h3>{about.story_title}</h3>
              <p>{about.story_para1}</p>
              <p>{about.story_para2}</p>

              <div className="story-leader-box">
                <p>"{about.founder_quote}"</p>
                <span>{about.founder_name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proven Impact Metrics */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Proven Track Record</span>
            <h2 className="section-heading">Our Nationwide Impact</h2>
            <p className="section-desc">
              Reliable energy storage trusted by top OEMs, commercial fleet operators, and over half a million daily drivers.
            </p>
          </div>

          <div className="impact-grid">
            <div className="impact-stat-card">
              <div className="impact-stat-icon">🛵</div>
              <h3 className="impact-stat-number">{about.stat1_number}</h3>
              <p className="impact-stat-label">{about.stat1_label}</p>
            </div>

            <div className="impact-stat-card">
              <div className="impact-stat-icon">🛺</div>
              <h3 className="impact-stat-number">{about.stat2_number}</h3>
              <p className="impact-stat-label">{about.stat2_label}</p>
            </div>

            <div className="impact-stat-card">
              <div className="impact-stat-icon">👥</div>
              <h3 className="impact-stat-number">{about.stat3_number}</h3>
              <p className="impact-stat-label">{about.stat3_label}</p>
            </div>

            <div className="impact-stat-card">
              <div className="impact-stat-icon">🛡️</div>
              <h3 className="impact-stat-number">{about.stat4_number}</h3>
              <p className="impact-stat-label">{about.stat4_label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Built on Quality & Engineering */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Engineering Standard</span>
            <h2 className="section-heading">Built on Quality & Innovation</h2>
            <p className="section-desc">
              Every MotoMax EV battery and charger is engineered with uncompromising safety benchmarks for Indian climates.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">AIS-156 & BIS Certified</h3>
              <p className="pillar-text">
                All battery packs comply with stringent Indian safety norms, rigorous thermal runaways, and vibration standards.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">Intelligent Smart BMS</h3>
              <p className="pillar-text">
                Proprietary active thermal monitoring, cell balancing, overcharge protection, and real-time state-of-health tracking.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">IP67 Weather Resistance</h3>
              <p className="pillar-text">
                Dust-proof and water-resistant casing engineered to endure harsh monsoon downpours, summer heatwaves, and rough roads.
              </p>
            </div>

            <div className="pillar-card">
              <div className="pillar-num">04</div>
              <h3 className="pillar-title">Automated Cell Grading</h3>
              <p className="pillar-text">
                100% laser-tested internal resistance and cell sorting ensure consistent battery chemistry and 2,500+ charge cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Infrastructure & Team */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="infra-split">
            <div>
              <span className="section-tag">{about.infra_tag}</span>
              <h2 className="section-heading">{about.infra_title}</h2>
              <p className="section-desc">{about.infra_desc}</p>

              <div className="infra-features">
                <div className="infra-feature-item">
                  <div className="infra-feature-icon">✓</div>
                  <div className="infra-feature-text">
                    <h5>{about.infra_f1_title}</h5>
                    <p>{about.infra_f1_text}</p>
                  </div>
                </div>

                <div className="infra-feature-item">
                  <div className="infra-feature-icon">✓</div>
                  <div className="infra-feature-text">
                    <h5>{about.infra_f2_title}</h5>
                    <p>{about.infra_f2_text}</p>
                  </div>
                </div>

                <div className="infra-feature-item">
                  <div className="infra-feature-icon">✓</div>
                  <div className="infra-feature-text">
                    <h5>{about.infra_f3_title}</h5>
                    <p>{about.infra_f3_text}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="infra-image-wrap">
              <img src={about.infra_image || "/assets/slider-2.jpg"} alt="MotoMax R&D Testing Lab" onError={(e) => { e.currentTarget.src = "/assets/slider-4.jpg"; }} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Beyond Mobility (Energy Storage) */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Diversified Clean Tech</span>
            <h2 className="section-heading">Beyond Mobility: Energy Storage</h2>
            <p className="section-desc">
              Delivering full-spectrum renewable solutions to power telecom towers, industrial microgrids, and residential solar setups.
            </p>
          </div>

          <div className="beyond-grid">
            <div className="beyond-card">
              <div className="beyond-icon">📡</div>
              <h3 className="beyond-title">Telecom Infrastructure</h3>
              <p className="beyond-text">
                High-cycle lithium battery backups ensuring 99.99% continuous uptime for remote telecom towers.
              </p>
            </div>

            <div className="beyond-card">
              <div className="beyond-icon">⚡</div>
              <h3 className="beyond-title">Grid-Scale Storage</h3>
              <p className="beyond-text">
                Modular BESS containers designed for commercial solar plants, frequency regulation, and peak shaving.
              </p>
            </div>

            <div className="beyond-card">
              <div className="beyond-icon">🏠</div>
              <h3 className="beyond-title">Residential Solar</h3>
              <p className="beyond-text">
                Compact, elegant wall-mounted home energy storage systems for uninterrupted green power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <div className="about-container">
        <div className="about-cta-section">
          <h2 className="about-cta-title">{about.cta_title}</h2>
          <p className="about-cta-text">{about.cta_text}</p>
          <div className="about-cta-btns">
            <Link to="/products" className="btn-cta-gold">
              Explore Our Products →
            </Link>
            <Link to="/contact-us" className="btn-cta-outline">
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
