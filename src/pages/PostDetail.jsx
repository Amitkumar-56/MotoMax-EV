import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_BASE = "http://localhost/assinment/php-backend/api";

const staticArticles = {
  "featured-in-battery-magazine": {
    title: "Featured in The Battery Magazine: Pioneering EV Power",
    category: "Press & Media",
    created_at: "2026-09-15",
    image_url: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1200",
    content: `## Trailblazing Indigenous Battery Engineering

We are extremely proud to announce our spotlight cover feature in the September 2026 edition of **The Battery Magazine**, documenting MotoMax EV's transformative journey from localized assembly to state-of-the-art battery research and engineering.

### Engineering Beyond Extreme Temperatures
Operating electric vehicles across the Indian subcontinent demands specialized thermal resilience. Ambient road temperatures can spike beyond 48°C in peak summer and drop below freezing in northern mountain terrains. 

Our in-house R&D lab engineered:
- **Phase Change Thermal Dissipation**: Minimizing hot spots between adjacent lithium cells.
- **Active Digital Balancing**: Ensuring uniform voltage across all cell strings.
- **Flame-Retardant Encapsulation**: Automotive-grade flame-barrier insulation with IP67 waterproofing.

> *"Our mission was never just to package cells into boxes, but to deliver absolute trust, ultra-low operating cost, and zero fire risk to everyday logistics operators and EV riders across the country."*

The Battery Magazine recognized our contributions toward building India's indigenous supply chain, highlighting our zero-defect testing rigs and multi-layered BMS firmware.`
  },
  "future-proofing-india": {
    title: "Future-Proofing India's Clean Mobility Ecosystem",
    category: "Press & Media",
    created_at: "2026-08-28",
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
    content: `## Transforming Fleet Economics with Advanced LFP Chemistries

In an extensive industry report, EV Tech News evaluated how modular pack architectures are dismantling the adoption barriers for last-mile commercial logistics. 

### Key Highlights of the Feature:
1. **3,000+ Full Cycles**: LFP (Lithium Iron Phosphate) chemistry optimized to endure 8+ years of daily commercial operation.
2. **42% Slashing in TCO**: Fleet managers achieve rapid return on investment compared to diesel or petrol alternatives.
3. **Smart Fleet Telemetry**: 4G/LTE cloud connected packs for remote health inspection, geo-fencing, and preventive battery maintenance.`
  },
  "pioneering-next-frontier": {
    title: "Pioneering the Next Frontier in Fleet Electrification",
    category: "Company Milestones",
    created_at: "2026-07-10",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
    content: `## Revolutionizing Commercial Fleets & Two-Wheeler Mobility

Motorindia covered MotoMax EV's strategic expansion from commercial e-rickshaw batteries to high-speed delivery scooters, industrial utility drones, and heavy-duty three-wheelers.

With swappable battery networks popping up along high-density delivery routes, MotoMax EV packs are setting benchmark uptime reliability standards across multiple metro regions.`
  },
  "solid-state-launch": {
    title: "Launch of Next-Gen Solid State & Drone Batteries",
    category: "Product Launches",
    created_at: "2026-06-05",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200",
    content: `## The Next Breakthrough in Solid-State Technology

MotoMax EV officially took the wraps off its experimental solid-state battery prototype, offering a breakthrough **380 Wh/kg** energy density.

By utilizing non-volatile solid electrolyte barriers, the battery pack eliminates the risk of thermal runaway, making it the perfect energy source for agricultural drones, high-altitude surveillance, and ultra-long range EV roadsters.`
  },
  "smart-bms-4-unveiled": {
    title: "Smart BMS 4.0: AI-Driven Predictive Health Unveiled",
    category: "Product Launches",
    created_at: "2026-05-18",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    content: `## Artificial Intelligence Meets Battery Management

With our patent-pending Smart BMS 4.0, every individual battery pack runs onboard neural-network anomaly detection models directly on the microcontroller board.

The system detects minute internal micro-shorts or abnormal cell temperature ramps up to 45 minutes before standard thermal cutoffs, safeguarding both riders and charging hubs.`
  },
  "pan-india-expansion": {
    title: "MotoMax EV Expands Mega Manufacturing to 50,000 Units/Month",
    category: "Company Milestones",
    created_at: "2026-04-02",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    content: `## Scaling Up to Power India's Clean Transportation

Commissioning Phase II of our automated green mega-facility elevates total monthly battery pack output to over 50,000 units. 

Equipped with robotic ultrasonic spot welding, high-precision laser tab soldering, and 100% rooftop solar energy generation, this new milestone accelerates India's journey toward zero-emission energy independence.`
  }
};

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // First try fetching from news_events.php API
    fetch(`${API_BASE}/news_events.php?slug=${slug}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.status === "success" && resData.data) {
          const item = resData.data;
          setPost({
            title: item.title,
            category: item.category,
            created_at: item.date_text,
            image_url: item.image,
            content: item.content || item.summary,
          });
          setLoading(false);
        } else {
          // Check staticArticles fallback or blogs.php
          if (staticArticles[slug]) {
            setPost(staticArticles[slug]);
            setLoading(false);
          } else {
            fetch(`${API_BASE}/blogs.php?id=${slug}`)
              .then((res) => res.json())
              .then((bData) => {
                if (bData && bData.title) {
                  setPost(bData);
                }
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }
        }
      })
      .catch(() => {
        if (staticArticles[slug]) {
          setPost(staticArticles[slug]);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-main)" }}>Loading Article...</h2>
      </div>
    );
  }

  if (!post || !post.title) {
    return (
      <div style={{ padding: "120px 20px", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-main)", marginBottom: "15px" }}>Article Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "25px" }}>The requested news or article could not be located.</p>
        <Link
          to="/news-events"
          style={{
            background: "var(--primary)",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ← Back to News & Events
        </Link>
      </div>
    );
  }

  const title = post.title;

  return (
    <div className="responsive-page" style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        style={{
          padding: "80px 20px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(254,166,3,0.08) 0%, rgba(255,255,255,0) 100%)",
        }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "#fff",
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              marginBottom: "20px",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}
          >
            {post.category || "News & Events"}
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 900,
              color: "var(--text-main)",
              marginBottom: "20px",
              lineHeight: 1.25,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "1.05rem",
            }}
          >
            Published on {post.created_at ? new Date(post.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "MotoMax EV Insights"}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section
        style={{
          padding: "40px 20px 90px",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      >
        <img
          src={post.image_url || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"}
          alt={title}
          style={{
            width: "100%",
            maxHeight: "480px",
            objectFit: "cover",
            borderRadius: "24px",
            marginBottom: "40px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          }}
        />

        <div
          style={{
            fontSize: "1.15rem",
            color: "var(--text-main)",
            lineHeight: "1.85",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ whiteSpace: "pre-wrap" }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>

        <div style={{ marginTop: "60px", textAlign: "center", display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/news-events"
            style={{
              display: "inline-block",
              background: "var(--primary)",
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "30px",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(254,166,3,0.3)"
            }}
          >
            ← Back to News & Events
          </Link>
          <Link
            to="/blog"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "2px solid var(--border-light)",
              color: "var(--text-main)",
              padding: "12px 28px",
              borderRadius: "30px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Explore Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
