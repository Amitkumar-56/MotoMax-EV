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

        /* Mission & Vision Cards */
        .mv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }
        .mv-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 28px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .mv-card:hover {
          transform: translateY(-5px);
          border-color: #FEA603;
          box-shadow: 0 16px 35px rgba(254,166,3,0.12);
        }
        .mv-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(254, 166, 3, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 20px;
        }
        .mv-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px 0;
        }
        .mv-text {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.65;
          margin: 0;
        }
        .values-list {
          list-style: none;
          padding: 0;
          margin: 12px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .values-list li {
          font-size: 0.9rem;
          color: #334155;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.45;
        }
        .values-list li strong {
          color: #0f172a;
        }

        /* Timeline Milestone */
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          position: relative;
        }
        .timeline-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 28px 24px;
          transition: all 0.3s ease;
          position: relative;
          border-top: 4px solid #FEA603;
        }
        .timeline-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(0,0,0,0.06);
        }
        .timeline-year {
          font-size: 1.6rem;
          font-weight: 900;
          color: #FEA603;
          margin-bottom: 8px;
        }
        .timeline-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px 0;
        }
        .timeline-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        /* Certifications Badges */
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 20px;
        }
        .cert-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .cert-card:hover {
          transform: translateY(-3px);
          border-color: #FEA603;
          box-shadow: 0 10px 25px rgba(254,166,3,0.1);
        }
        .cert-icon {
          font-size: 2.2rem;
          margin-bottom: 12px;
        }
        .cert-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
        }
        .cert-desc {
          font-size: 0.82rem;
          color: #64748b;
          margin: 0;
          line-height: 1.45;
        }

        /* FAQ Grid */
        .faq-grid-about {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .faq-card-about {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 26px 24px;
          transition: border-color 0.25s ease;
        }
        .faq-card-about:hover {
          border-color: #FEA603;
        }
        .faq-q {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px 0;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .faq-a {
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
          padding-left: 28px;
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
          .mv-grid {
            grid-template-columns: 1fr;
          }
          .faq-grid-about {
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
            India's premier clean-tech enterprise driving two synergistic core businesses: Advanced Lithium Battery Engineering and Smart Electric Scooty Mobility.
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

      {/* 2.2 Dual Business Pillars: Battery & Electric Scooty */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Our Core Business Verticals</span>
            <h2 className="section-heading">Two Pillars of MotoMax Clean Tech</h2>
            <p className="section-desc">
              MotoMax EV operates two specialized, high-impact divisions engineered to power India's sustainable energy and green transportation future.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px", marginTop: "35px" }}>
            {/* Division 1: Lithium Batteries */}
            <div style={{
              background: "#ffffff",
              border: "2px solid #e2e8f0",
              borderRadius: "24px",
              padding: "36px 30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              position: "relative",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FEA603"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(254,166,3,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                  🔋
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#d97706", textTransform: "uppercase", letterSpacing: "1px" }}>Business Pillar 01</span>
                  <h3 style={{ margin: "4px 0 0", fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>Lithium Battery Division</h3>
                </div>
              </div>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.65", margin: "0 0 20px" }}>
                Pioneering high-density LiFePO4 and NMC power packs engineered for maximum safety, thermal stability, and deep cycle longevity in extreme Indian climates.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#FEA603", fontWeight: 800 }}>✔</span> AIS-156 Phase 2 & BIS Certified Cell Grading
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#FEA603", fontWeight: 800 }}>✔</span> Proprietary Smart BMS with Multi-Tier Protection
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#FEA603", fontWeight: 800 }}>✔</span> Inverter, Home Solar, EV & Industrial BESS Solutions
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#FEA603", fontWeight: 800 }}>✔</span> 2,500+ Charge Cycles & 3-Year Warranty
                </li>
              </ul>
            </div>

            {/* Division 2: Electric Scooty */}
            <div style={{
              background: "#ffffff",
              border: "2px solid #e2e8f0",
              borderRadius: "24px",
              padding: "36px 30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              position: "relative",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.transform = "translateY(-4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>
                  🛵
                </div>
                <div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#059669", textTransform: "uppercase", letterSpacing: "1px" }}>Business Pillar 02</span>
                  <h3 style={{ margin: "4px 0 0", fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>Smart Electric Scooty Mobility</h3>
                </div>
              </div>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.65", margin: "0 0 20px" }}>
                Engineering next-generation high-speed electric scooters designed for daily urban commuters, college students, and commercial delivery fleets.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#10b981", fontWeight: 800 }}>✔</span> High-Speed EV 2-Wheelers with 90 - 150 KM Real Range
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#10b981", fontWeight: 800 }}>✔</span> Ultra-Low Running Cost: Only ~15 Paise per Kilometer
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#10b981", fontWeight: 800 }}>✔</span> Portable Home Charging & Instant Detachable Battery
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.92rem", color: "#334155" }}>
                  <span style={{ color: "#10b981", fontWeight: 800 }}>✔</span> Pan-India Dealership Network & Certified Service Centers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Mission, Vision & Core Values */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Our Guiding North Star</span>
            <h2 className="section-heading">Mission, Vision & Core Values</h2>
            <p className="section-desc">
              Pioneering safe, sustainable, and affordable electric mobility solutions built for Indian commuters, fleets, and families.
            </p>
          </div>

          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">🎯</div>
              <h3 className="mv-title">Our Mission</h3>
              <p className="mv-text">
                To democratize zero-emission electric mobility across India by engineering rugged, thermally safe lithium power packs and smart e-scooters accessible to every daily rider.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon">🔭</div>
              <h3 className="mv-title">Our Vision</h3>
              <p className="mv-text">
                To be India's most trusted green energy and electric two-wheeler ecosystem, reducing 100,000+ metric tons of urban emissions while powering sustainable commutes by 2030.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon">💎</div>
              <h3 className="mv-title">Core Values</h3>
              <p className="mv-text">
                Safety first with zero compromise, continuous indigenous innovation, and green responsibility.
              </p>
              <ul className="values-list">
                <li><span>✔</span> <strong>Safety First:</strong> Multi-tier thermal BMS & AIS-156 protocols</li>
                <li><span>✔</span> <strong>Innovation:</strong> 100% in-house testing & smart telematics</li>
                <li><span>✔</span> <strong>Integrity:</strong> Honest warranties & transparent real-world range</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proven Impact Metrics */}
      <section className="about-section">
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
      <section className="about-section about-section-alt">
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
      <section className="about-section">
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

      {/* 5.5 Our Journey & Milestones */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">How We Grew</span>
            <h2 className="section-heading">Two Decades of Clean Energy Innovation</h2>
            <p className="section-desc">
              From early pioneering lead-acid battery designs to ultra-advanced smart lithium power trains and flagship electric scooties.
            </p>
          </div>

          <div className="timeline-grid">
            <div className="timeline-card">
              <div className="timeline-year">2005</div>
              <h4 className="timeline-title">Foundations Laid</h4>
              <p className="timeline-desc">
                Inception of the parent energy research lab focusing on robust power storage and industrial battery solutions for semi-urban India.
              </p>
            </div>

            <div className="timeline-card">
              <div className="timeline-year">2014</div>
              <h4 className="timeline-title">Lithium-Ion Transition</h4>
              <p className="timeline-desc">
                Pioneered indigenous Smart BMS design and high-density Lithium Ferrophosphate (LFP) pack assembly tailored for extreme Indian summer temperatures.
              </p>
            </div>

            <div className="timeline-card">
              <div className="timeline-year">2020</div>
              <h4 className="timeline-title">AIS-156 Certification</h4>
              <p className="timeline-desc">
                Achieved premier Automotive Research Association of India (ARAI) certifications and scaled factory capacity to 50,000+ packs annually.
              </p>
            </div>

            <div className="timeline-card">
              <div className="timeline-year">2024 - 2026</div>
              <h4 className="timeline-title">Electric Scooty Lineup</h4>
              <p className="timeline-desc">
                Launched flagship high-speed electric scooties (CityGlide EX & Storm Pro), expanding across 25+ states with 500+ certified service touchpoints.
              </p>
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

      {/* 6.5 Quality Certifications & Accreditations */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Government & Global Accreditations</span>
            <h2 className="section-heading">Certified for Maximum Safety & Trust</h2>
            <p className="section-desc">
              MotoMax products undergo 45+ destructive, thermal, vibration, and water-submersion tests certified by top national laboratories.
            </p>
          </div>

          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-icon">🏅</div>
              <h4 className="cert-title">AIS-156 Phase 2</h4>
              <p className="cert-desc">Certified thermal propagation and ingress prevention standard for EV battery packs.</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">🛡️</div>
              <h4 className="cert-title">BIS Certified</h4>
              <p className="cert-desc">Bureau of Indian Standards certified cells, enclosures, and high-efficiency smart chargers.</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">💧</div>
              <h4 className="cert-title">IP67 Waterproof</h4>
              <p className="cert-desc">100% dust-tight and submersible up to 1 meter for 30 minutes in flood and monsoon conditions.</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon">🌱</div>
              <h4 className="cert-title">ISO 9001 & 14001</h4>
              <p className="cert-desc">International standards for rigorous manufacturing quality control and environmental management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.8 About MotoMax FAQ */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header-center">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about MotoMax EV engineering, warranty, and dealership partnerships.
            </p>
          </div>

          <div className="faq-grid-about">
            <div className="faq-card-about">
              <h4 className="faq-q"><span>❓</span> What warranty does MotoMax offer on Scooties & Batteries?</h4>
              <p className="faq-a">We provide an industry-leading 3-Year / 50,000 km replacement warranty on all our smart lithium battery packs, and comprehensive bumper-to-bumper support across all authorized service centers.</p>
            </div>
            <div className="faq-card-about">
              <h4 className="faq-q"><span>❓</span> Can I buy a MotoMax Electric Scooty directly or book a test ride?</h4>
              <p className="faq-a">Yes! You can reserve your test ride or book online via our contact & sales desk, or walk into any of our 500+ authorized dealer showrooms nationwide.</p>
            </div>
            <div className="faq-card-about">
              <h4 className="faq-q"><span>❓</span> How long does a full battery charge take?</h4>
              <p className="faq-a">With our standard 6A smart home charger, it takes approximately 3.5 to 4 hours. With our optional Ultra-Fast DC charger, 80% charge is reached in under 90 minutes.</p>
            </div>
            <div className="faq-card-about">
              <h4 className="faq-q"><span>❓</span> How do I become an authorized dealer or franchisee?</h4>
              <p className="faq-a">Reach out to us through our Partner With Us form on the Contact page. Our regional dealership team will contact you within 24 hours with complete commercial details.</p>
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
