import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost/assinment/php-backend/api";

const initialNewsData = [
  {
    id: 1,
    slug: "featured-in-battery-magazine",
    title: "Featured in The Battery Magazine",
    category: "Press & Media",
    source: "The Battery Magazine",
    date_text: "15 Sep 2026",
    read_time: "4 min read",
    is_featured: 1,
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1200",
    tags: "#EVTech, #BatteryMagazine, #CleanEnergy",
    summary:
      "We are thrilled to be spotlighted in the September 2026 edition of The Battery Magazine, documenting MotoMax EV's transformative journey from localized battery assembly to pioneering global-grade smart thermal management systems.",
    content: `MotoMax EV's trailblazing approach to battery thermal management and indigenous cell balancing has earned nationwide recognition. In an in-depth 6-page feature, The Battery Magazine explores how our advanced R&D laboratory engineered smart BMS architectures capable of enduring India's extreme ambient temperatures from 0°C to 52°C.

"Our goal was never just to build battery packs, but to formulate an ecosystem of infallible energy storage that instills uncompromising confidence in commercial EV fleet operators and personal mobility riders alike," stated our engineering director.`
  },
  {
    id: 2,
    slug: "future-proofing-india",
    title: "Future-Proofing India's Clean Mobility Ecosystem",
    category: "Press & Media",
    source: "EV Tech News",
    date_text: "28 Aug 2026",
    read_time: "3 min read",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
    tags: "#Mobility, #GreenIndia, #Sustainability",
    summary:
      "Featured on EV Tech News exploring our strategic focus on in-house engineering, rapid prototyping, and high-efficiency lithium iron phosphate (LFP) formulations tailored for heavy-duty fleet operations.",
    content: `In an exclusive investigative report, EV Tech News evaluated how modular pack architectures are dismantling the adoption barriers for last-mile commercial logistics. MotoMax EV's high-cycle LFP formulations yield over 3,000 charge cycles while maintaining 85%+ state-of-health, slashing the total cost of ownership (TCO) by over 42% compared to conventional combustion powertrains.`
  },
  {
    id: 3,
    slug: "pioneering-next-frontier",
    title: "Pioneering the Next Frontier in Fleet Electrification",
    category: "Company Milestones",
    source: "Motorindia Official",
    date_text: "10 Jul 2026",
    read_time: "5 min read",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    tags: "#FleetElectrification, #Motorindia, #Innovation",
    summary:
      "Motorindia covers our transformation of the landscape from commercial e-rickshaws to heavy-payload industrial delivery trucks and high-speed two-wheeler battery swappable packs.",
    content: `Commercial fleets operate on razor-thin uptime margins. MotoMax EV announced its turnkey fleet telemetry and hot-swappable battery ecosystem across 12 tier-1 transit corridors. Motorindia's cover story examines how automated diagnostic reporting alerts fleet managers before cell imbalances can cause downtime.`
  },
  {
    id: 4,
    slug: "solid-state-launch",
    title: "Launch of Next-Gen Solid State & Drone Batteries",
    category: "Product Launches",
    source: "TechRadar Automotive",
    date_text: "05 Jun 2026",
    read_time: "4 min read",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    tags: "#SolidState, #DronePower, #NextGen",
    summary:
      "Announcing our breakthrough ultra-high energy density solid-state prototype and ultra-lightweight high-discharge drone battery packs for agricultural & commercial aerial logistics.",
    content: `MotoMax EV officially took the wraps off its high-energy density solid-state cell packaging prototype at the National Tech Innovation Summit. Offering 380 Wh/kg and virtually non-flammable solid electrolyte chemistry, this technology marks a pivotal leap toward aerospace and high-altitude surveillance operations.`
  },
  {
    id: 5,
    slug: "smart-bms-4-unveiled",
    title: "Smart BMS 4.0: AI-Driven Predictive Health Unveiled",
    category: "Product Launches",
    source: "Clean Energy Review",
    date_text: "18 May 2026",
    read_time: "3 min read",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: "#SmartBMS, #ArtificialIntelligence, #BatterySafety",
    summary:
      "Introducing Smart BMS 4.0 integrated with on-chip machine learning models that forecast thermal anomalies up to 45 minutes before critical thresholds.",
    content: `Safety is non-negotiable. With our newly patented Smart BMS 4.0, every individual battery pack runs neural-edge anomaly detection algorithms directly on the microcontroller board. The module syncs with cloud dashboards via 4G/LTE telemetry, providing riders and fleet dispatchers with real-time health scores.`
  },
  {
    id: 6,
    slug: "pan-india-expansion",
    title: "MotoMax EV Expands Mega Manufacturing to 50,000 Units/Month",
    category: "Company Milestones",
    source: "Economic Times Energy",
    date_text: "02 Apr 2026",
    read_time: "4 min read",
    is_featured: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    tags: "#MakeInIndia, #Manufacturing, #Scale",
    summary:
      "Commissioning our second smart gigafactory equipped with robotic ultrasonic welding cells, dual-stage automated testing corridors, and 100% solar-powered assembly lines.",
    content: `To satisfy surging pan-India demand, MotoMax EV has officially commissioned Phase II of its mega facility. Spanning over 80,000 sq.ft., the zero-carbon green manufacturing hub elevates total monthly pack throughput to 50,000 units while reducing manufacturing emissions by 60%.`
  }
];

const initialEventsData = [
  {
    id: 1,
    title: "EV India Expo 2026",
    date_text: "18 - 20 Nov 2026",
    location: "Pragati Maidan, New Delhi",
    booth: "Hall 5, Booth #A-42",
    badge: "Official Exhibitor",
    description: "Experience live demonstrations of our smart swappable batteries, heavy commercial battery packs, and next-gen BMS telematics."
  },
  {
    id: 2,
    title: "Global Clean Energy Summit 2026",
    date_text: "05 - 07 Dec 2026",
    location: "HITEX Exhibition Centre, Hyderabad",
    booth: "Keynote Hall B",
    badge: "Keynote Speaker",
    description: "Our leadership team delivers the keynote address on 'Next-Decade Battery Chemistries & India's Path to 100% Zero-Emission Fleets'."
  },
  {
    id: 3,
    title: "Renewable & Battery World Expo 2027",
    date_text: "12 - 14 Jan 2027",
    location: "BIEC, Bengaluru",
    booth: "Pavilion 3, Space #110",
    badge: "Product Showcase",
    description: "Unveiling our ultra-fast charging stationary solar energy storage systems and agricultural drone power packs."
  }
];

const categories = ["All Stories", "Press & Media", "Product Launches", "Company Milestones"];

const NewsEvents = () => {
  const [news, setNews] = useState(initialNewsData);
  const [events, setEvents] = useState(initialEventsData);
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalStory, setActiveModalStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch live from PHP Backend
  useEffect(() => {
    fetch(`${API_BASE}/news_events.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "success") {
          if (data.news && data.news.length > 0) {
            setNews(data.news);
          }
          if (data.events && data.events.length > 0) {
            setEvents(data.events);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load news from backend:", err);
        setLoading(false);
      });
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Stories" || item.category === selectedCategory;
      const tagStr = typeof item.tags === "string" ? item.tags : "";
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.source && item.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tagStr.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredStory = news.find((n) => Number(n.is_featured) === 1) || news[0];
  const gridStories = filteredNews.filter(
    (n) => n.id !== (featuredStory ? featuredStory.id : null) || searchQuery !== "" || selectedCategory !== "All Stories"
  );

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      <style>{`
        /* News & Events Custom Styling */
        .ne-hero {
          padding: 70px 20px 40px;
          text-align: center;
          position: relative;
        }
        .ne-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(254, 166, 3, 0.12);
          color: var(--primary);
          border: 1px solid rgba(254, 166, 3, 0.35);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .ne-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--text-main);
          line-height: 1.15;
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }
        .ne-title-highlight {
          background: linear-gradient(135deg, var(--primary) 0%, #ff8c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ne-subtitle {
          max-width: 720px;
          margin: 0 auto 35px;
          font-size: 1.12rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        /* Stats Strip */
        .ne-stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto 40px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
        }
        .ne-stat-item {
          text-align: center;
        }
        .ne-stat-number {
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1.1;
        }
        .ne-stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 4px;
        }

        /* Filter & Search Bar */
        .ne-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto 40px;
          padding: 0 20px;
        }
        .ne-categories {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ne-tab-btn {
          padding: 10px 22px;
          border-radius: 30px;
          border: 1px solid var(--border-light);
          background: #fff;
          color: var(--text-main);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ne-tab-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          transform: translateY(-2px);
        }
        .ne-tab-btn.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
          box-shadow: 0 6px 20px rgba(254, 166, 3, 0.35);
        }
        .ne-search-box {
          position: relative;
          min-width: 280px;
        }
        .ne-search-input {
          width: 100%;
          padding: 12px 18px 12px 44px;
          border-radius: 30px;
          border: 1px solid var(--border-light);
          background: #fff;
          color: var(--text-main);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .ne-search-input:focus {
          border-color: var(--primary);
          box-shadow: 0 4px 20px rgba(254, 166, 3, 0.2);
        }
        .ne-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          font-size: 1.1rem;
        }

        /* Featured Story Card */
        .ne-featured-container {
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
        }
        .ne-featured-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--border-light);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ne-featured-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
        }
        .ne-featured-img-wrap {
          position: relative;
          min-height: 400px;
          overflow: hidden;
        }
        .ne-featured-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .ne-featured-card:hover .ne-featured-img-wrap img {
          transform: scale(1.06);
        }
        .ne-featured-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .ne-tag-pill {
          display: inline-block;
          padding: 5px 14px;
          background: rgba(254, 166, 3, 0.15);
          color: var(--primary);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .ne-featured-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 14px;
        }
        .ne-featured-title {
          font-size: 2rem;
          font-weight: 900;
          color: var(--text-main);
          line-height: 1.25;
          margin-bottom: 16px;
        }
        .ne-featured-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        /* News Grid Cards */
        .ne-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto 70px;
          padding: 0 20px;
        }
        .ne-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          transition: all 0.35s ease;
          position: relative;
        }
        .ne-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: rgba(254, 166, 3, 0.4);
        }
        .ne-card-img-wrap {
          height: 230px;
          position: relative;
          overflow: hidden;
        }
        .ne-card-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ne-card:hover .ne-card-img-wrap img {
          transform: scale(1.08);
        }
        .ne-card-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .ne-card-time {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(254, 166, 3, 0.95);
          color: #fff;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .ne-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .ne-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #888;
          margin-bottom: 10px;
        }
        .ne-card-meta span.dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #ccc;
          border-radius: 50%;
        }
        .ne-card-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-main);
          line-height: 1.35;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s ease;
        }
        .ne-card:hover .ne-card-title {
          color: var(--primary);
        }
        .ne-card-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .ne-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        .ne-card-tag {
          font-size: 0.75rem;
          color: #666;
          background: #f4f4f4;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .ne-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 15px;
          border-top: 1px solid #f0f0f0;
        }
        .ne-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-size: 0.92rem;
          font-weight: 700;
          text-decoration: none;
          transition: gap 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .ne-read-btn:hover {
          gap: 10px;
        }

        /* Upcoming Events Section */
        .ne-events-section {
          max-width: 1200px;
          margin: 0 auto 70px;
          padding: 0 20px;
        }
        .ne-section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .ne-section-title {
          font-size: 2.4rem;
          font-weight: 900;
          color: var(--text-main);
          margin-bottom: 10px;
        }
        .ne-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }
        .ne-event-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
        }
        .ne-event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }
        .ne-event-badge {
          display: inline-block;
          background: rgba(182, 242, 206, 0.4);
          color: #0b7a42;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 4px 12px;
          border-radius: 20px;
          align-self: flex-start;
          margin-bottom: 16px;
        }
        .ne-event-date {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ne-event-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 10px;
        }
        .ne-event-loc {
          font-size: 0.9rem;
          color: #777;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }
        .ne-event-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        /* Press Kit / Inquiries Banner */
        .ne-presskit {
          max-width: 1200px;
          margin: 0 auto 70px;
          padding: 0 20px;
        }
        .ne-presskit-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 24px;
          padding: 50px 40px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 30px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
        }
        .ne-presskit-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 10px;
        }
        .ne-presskit-content p {
          color: #cbd5e1;
          font-size: 1.05rem;
          max-width: 600px;
          line-height: 1.6;
        }
        .ne-presskit-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .ne-btn-primary {
          background: var(--primary);
          color: #fff;
          padding: 14px 28px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
        }
        .ne-btn-primary:hover {
          background: #e09200;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(254, 166, 3, 0.4);
        }
        .ne-btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.3);
          padding: 12px 26px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .ne-btn-outline:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.1);
        }

        /* Modal Preview */
        .ne-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .ne-modal-box {
          background: #fff;
          border-radius: 24px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
          position: relative;
          padding: 35px;
          animation: modalFadeIn 0.3s ease;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .ne-modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f1f5f9;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .ne-modal-close:hover {
          background: #e2e8f0;
        }

        @media (max-width: 900px) {
          .ne-stats-strip { grid-template-columns: repeat(2, 1fr); gap: 15px; }
          .ne-featured-card { grid-template-columns: 1fr; }
          .ne-featured-img-wrap { min-height: 280px; }
          .ne-featured-content { padding: 25px; }
          .ne-featured-title { font-size: 1.6rem; }
        }
        @media (max-width: 600px) {
          .ne-toolbar { flex-direction: column; align-items: stretch; }
          .ne-search-box { min-width: 100%; }
          .ne-stats-strip { grid-template-columns: 1fr 1fr; padding: 16px; }
          .ne-stat-number { font-size: 1.7rem; }
          .ne-grid { grid-template-columns: 1fr; }
          .ne-presskit-card { padding: 30px 20px; }
          .ne-presskit-content h3 { font-size: 1.6rem; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="ne-hero">
        <div className="ne-badge">
          <span>⚡</span> Press Room & Media Center
        </div>
        <h1 className="ne-title">
          News & <span className="ne-title-highlight">Events</span>
        </h1>
        <p className="ne-subtitle">
          Explore our latest groundbreaking battery technology reveals, national media features,
          global sustainability summits, and official press releases.
        </p>

        {/* Live Metrics Strip */}
        <div className="ne-stats-strip">
          <div className="ne-stat-item">
            <div className="ne-stat-number">{news.length > 0 ? `${news.length * 10}+` : "50+"}</div>
            <div className="ne-stat-label">Media Features</div>
          </div>
          <div className="ne-stat-item">
            <div className="ne-stat-number">{events.length > 0 ? `${events.length * 5}+` : "15+"}</div>
            <div className="ne-stat-label">Industry Summits</div>
          </div>
          <div className="ne-stat-item">
            <div className="ne-stat-number">100%</div>
            <div className="ne-stat-label">In-House R&D</div>
          </div>
          <div className="ne-stat-item">
            <div className="ne-stat-number">3,000+</div>
            <div className="ne-stat-label">LFP Cycle Life</div>
          </div>
        </div>
      </section>

      {/* Toolbar: Category Pills & Live Search */}
      <div className="ne-toolbar">
        <div className="ne-categories" id="news-category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`ne-tab-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="ne-search-box">
          <span className="ne-search-icon">🔍</span>
          <input
            type="text"
            className="ne-search-input"
            placeholder="Search news, topics, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Featured Spotlight Card */}
      {featuredStory && selectedCategory === "All Stories" && searchQuery === "" && (
        <section className="ne-featured-container">
          <div className="ne-featured-card">
            <div className="ne-featured-img-wrap">
              <img src={featuredStory.image} alt={featuredStory.title} />
            </div>
            <div className="ne-featured-content">
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <span className="ne-tag-pill">⭐ FEATURED SPOTLIGHT</span>
                <span style={{ fontSize: "0.82rem", color: "#666", fontWeight: "600" }}>{featuredStory.read_time || "4 min read"}</span>
              </div>
              <div className="ne-featured-meta">
                <span>📰 {featuredStory.source}</span>
                <span>•</span>
                <span>📅 {featuredStory.date_text}</span>
              </div>
              <h2 className="ne-featured-title">{featuredStory.title}</h2>
              <p className="ne-featured-desc">{featuredStory.summary}</p>
              
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", alignItems: "center" }}>
                <button
                  className="ne-btn-primary"
                  onClick={() => setActiveModalStory(featuredStory)}
                >
                  Quick Read Preview →
                </button>
                <Link
                  to={`/post/${featuredStory.slug || featuredStory.id}`}
                  className="ne-btn-outline"
                  style={{ color: "var(--text-main)", borderColor: "var(--border-light)" }}
                >
                  Full Article Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="ne-grid" id="news-grid-container">
        {gridStories.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px" }}>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text-main)", marginBottom: "10px" }}>No Articles Found</h3>
            <p style={{ color: "var(--text-muted)" }}>Try searching for a different keyword or select another category filter.</p>
          </div>
        ) : (
          gridStories.map((story) => {
            const storyTags = typeof story.tags === "string" ? story.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
            const storySlug = story.slug || story.id;
            return (
              <article key={story.id} className="ne-card">
                <div className="ne-card-img-wrap">
                  <img src={story.image} alt={story.title} loading="lazy" />
                  <span className="ne-card-badge">{story.category}</span>
                  <span className="ne-card-time">{story.read_time || "3 min read"}</span>
                </div>

                <div className="ne-card-body">
                  <div className="ne-card-meta">
                    <span>📰 {story.source}</span>
                    <span className="dot"></span>
                    <span>📅 {story.date_text}</span>
                  </div>

                  <h3 className="ne-card-title">{story.title}</h3>
                  <p className="ne-card-desc">{story.summary}</p>

                  <div className="ne-card-tags">
                    {storyTags.map((t, idx) => (
                      <span key={idx} className="ne-card-tag">{t}</span>
                    ))}
                  </div>

                  <div className="ne-card-footer">
                    <button
                      className="ne-read-btn"
                      onClick={() => setActiveModalStory(story)}
                    >
                      Quick Read <span>→</span>
                    </button>
                    <Link
                      to={`/post/${storySlug}`}
                      style={{
                        fontSize: "0.85rem",
                        color: "#666",
                        textDecoration: "none",
                        fontWeight: "600"
                      }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Upcoming Events & Expos Section */}
      <section className="ne-events-section">
        <div className="ne-section-header">
          <div className="ne-badge">
            <span>📅</span> Calendar & Schedule
          </div>
          <h2 className="ne-section-title">Upcoming Expos & Summits</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Meet our engineers and leadership in-person at upcoming industry conferences.
          </p>
        </div>

        <div className="ne-events-grid">
          {events.map((evt) => (
            <div key={evt.id} className="ne-event-card">
              <div className="ne-event-badge">{evt.badge}</div>
              <div className="ne-event-date">
                <span>🗓️</span> {evt.date_text}
              </div>
              <h3 className="ne-event-title">{evt.title}</h3>
              <div className="ne-event-loc">
                <span>📍</span> {evt.location} {evt.booth ? `(${evt.booth})` : ""}
              </div>
              <p className="ne-event-desc">{evt.description}</p>
              <div>
                <a
                  href="#contact-pr"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Pass registration request noted for ${evt.title}! Our team will coordinate your guest badge.`);
                  }}
                  className="ne-btn-outline"
                  style={{
                    color: "var(--primary)",
                    borderColor: "var(--primary)",
                    padding: "10px 20px",
                    fontSize: "0.88rem",
                    display: "inline-block"
                  }}
                >
                  Request Meeting / Booth Pass
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press Kit & Media Inquiry Banner */}
      <section className="ne-presskit" id="contact-pr">
        <div className="ne-presskit-card">
          <div className="ne-presskit-content">
            <h3>Media Kit & Press Inquiries</h3>
            <p>
              Looking for brand assets, executive interviews, high-resolution product photography,
              or technical whitepapers? Our media communications desk is at your service.
            </p>
          </div>
          <div className="ne-presskit-actions">
            <a
              href="mailto:press@motomaxev.com?subject=Press%20Inquiry%20MotoMax%20EV"
              className="ne-btn-primary"
            >
              ✉️ Contact PR Desk
            </a>
            <button
              className="ne-btn-outline"
              onClick={() => alert("Media Kit downloading: MotoMax-Brand-Assets-2026.zip containing logos, product photos, and leadership bios.")}
            >
              📥 Download Media Kit
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Quick-Read Modal */}
      {activeModalStory && (
        <div className="ne-modal-overlay" onClick={() => setActiveModalStory(null)}>
          <div className="ne-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="ne-modal-close" onClick={() => setActiveModalStory(null)}>
              ✕
            </button>

            <span className="ne-tag-pill" style={{ marginBottom: "15px" }}>
              {activeModalStory.category}
            </span>

            <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "var(--text-main)", marginBottom: "15px", lineHeight: "1.3" }}>
              {activeModalStory.title}
            </h2>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "#777", fontSize: "0.85rem", marginBottom: "20px" }}>
              <span>📰 {activeModalStory.source}</span>
              <span>•</span>
              <span>📅 {activeModalStory.date_text}</span>
              <span>•</span>
              <span>⏱️ {activeModalStory.read_time || "3 min read"}</span>
            </div>

            <img
              src={activeModalStory.image}
              alt={activeModalStory.title}
              style={{ width: "100%", maxHeight: "360px", objectFit: "cover", borderRadius: "16px", marginBottom: "25px" }}
            />

            <div style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.8", whiteSpace: "pre-line", marginBottom: "30px" }}>
              {activeModalStory.content || activeModalStory.summary}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(typeof activeModalStory.tags === "string" ? activeModalStory.tags.split(",") : []).map((t, idx) => (
                  <span key={idx} className="ne-card-tag">{t.trim()}</span>
                ))}
              </div>
              <Link
                to={`/post/${activeModalStory.slug || activeModalStory.id}`}
                className="ne-btn-primary"
                onClick={() => setActiveModalStory(null)}
              >
                Go to Dedicated Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsEvents;
