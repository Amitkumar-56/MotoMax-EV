import React, { useState } from "react";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Dealership = () => {
  const [formData, setFormData] = useState({
    owner_name: "",
    phone: "",
    gst_registered: "Yes",
    gst_number: "",
    state: "",
    city: "",
    investment_capacity: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCR)", "Jammu & Kashmir"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.owner_name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in Owner Name and Contact Number.");
      return;
    }

    if (!formData.state.trim() || !formData.city.trim()) {
      setErrorMsg("Please select State and enter Target City.");
      return;
    }

    if (!formData.investment_capacity.trim()) {
      setErrorMsg("Please enter your expected Investment Amount.");
      return;
    }

    if (formData.gst_registered === "Yes" && !formData.gst_number.trim()) {
      setErrorMsg("Please enter your GST Number or select 'No' for GST registration.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/dealership.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccessMsg(data.message || "Your dealership inquiry has been submitted successfully! Our regional business development team will contact you within 24 hours.");
        setErrorMsg("");
        // Form immediately resets back to normal
        setFormData({
          owner_name: "",
          phone: "",
          gst_registered: "Yes",
          gst_number: "",
          state: "",
          city: "",
          investment_capacity: "",
          message: ""
        });
        const formBox = document.getElementById("apply-form");
        if (formBox) {
          formBox.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        setErrorMsg(data.message || "Failed to submit dealership form. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Connection error: " + err.message + ". Please verify backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dealership-page-root" style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>
        {`
          .dealership-hero-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
            gap: 16px;
            max-width: 950px;
          }
          .dealership-split-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
            gap: 40px;
            align-items: start;
          }
          .dealership-form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .dealership-gst-row {
            display: grid;
            grid-template-columns: 1fr 1.6fr;
            gap: 16px;
          }
          .dealership-card-padding {
            padding: 36px;
          }
          .dealership-form-padding {
            padding: 40px;
          }

          @media (max-width: 768px) {
            .dealership-hero-section {
              padding: 85px 16px 50px !important;
            }
            .dealership-main-section {
              margin: 35px auto 60px !important;
              padding: 0 14px !important;
            }
            .dealership-split-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .dealership-hero-metrics {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }
            .dealership-form-row {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
            .dealership-gst-row {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
            .dealership-card-padding {
              padding: 22px 16px !important;
              border-radius: 18px !important;
            }
            .dealership-form-padding {
              padding: 24px 16px !important;
              border-radius: 18px !important;
            }
          }
        `}
      </style>

      {/* 1. HERO SECTION */}
      <section
        className="dealership-hero-section"
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #090e17 0%, #111827 50%, #1e293b 100%)",
          color: "#fff",
          padding: "100px 20px 75px",
          overflow: "hidden"
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "550px",
            height: "550px",
            background: "radial-gradient(circle, rgba(254, 166, 3, 0.22) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none"
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(254, 166, 3, 0.15)", border: "1px solid rgba(254, 166, 3, 0.4)", borderRadius: "30px", padding: "8px 20px", marginBottom: "22px" }}>
            <span style={{ color: "#FEA603", fontSize: "1rem" }}>⚡</span>
            <span style={{ color: "#FEA603", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase" }}>
              Dealership & Franchise Opportunities 2026
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
              fontWeight: 900,
              lineHeight: 1.18,
              maxWidth: "920px",
              margin: "0 0 20px",
              color: "#ffffff"
            }}
          >
            Partner With India's Leading{" "}
            <span style={{ background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              EV & Battery
            </span>{" "}
            Powerhouse
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "#94a3b8",
              maxWidth: "760px",
              lineHeight: 1.6,
              marginBottom: "34px"
            }}
          >
            Become an authorized dealer for <strong>MotoMax EV Smart Scooties</strong> and{" "}
            <strong>Advanced Lithium Battery Packs</strong> in your city. Lucrative margins, exclusive territory rights, complete showroom branding, and full marketing support.
          </p>

          {/* Quick highlight metrics */}
          <div className="dealership-hero-metrics">
            {[
              { icon: "💰", title: "High ROI Margins", desc: "Up to 18-24% dealership returns" },
              { icon: "🛵", title: "EV & Battery Ecosystem", desc: "Smart Scooties & Lithium Packs" },
              { icon: "🛡️", title: "AIS-156 Certified", desc: "Govt. tested safety & 3-5 yr warranty" },
              { icon: "🚀", title: "360° Field Support", desc: "Branding, mechanic training & leads" }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  boxSizing: "border-box"
                }}
              >
                <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#fff" }}>{item.title}</h4>
                  <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. APPLICATION FORM & VALUE PROPOSITION SPLIT */}
      <section className="dealership-main-section" style={{ maxWidth: "1200px", margin: "55px auto 85px", padding: "0 20px", boxSizing: "border-box" }}>
        <div className="dealership-split-grid">
          
          {/* Left Column: What We Provide + Direct Contact */}
          <div style={{ width: "100%", boxSizing: "border-box" }}>
            <div className="dealership-card-padding" style={{ background: "#fff", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 8px 30px rgba(0,0,0,0.03)", marginBottom: "30px", boxSizing: "border-box", width: "100%" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
                🤝 What We Provide to Our Dealership Partners
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
                When you partner with MotoMax EV, you receive institutional-grade backing from day one:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  {
                    t: "Complete Showroom & Retail Branding",
                    d: "3D showroom layout, glow-sign board, indoor display stands, banners, and marketing promotional kits."
                  },
                  {
                    t: "Certified Technical & Service Training",
                    d: "Comprehensive hands-on training for service personnel on EV diagnostics, battery BMS tuning, and electrical systems."
                  },
                  {
                    t: "Hyperlocal Digital Customer Leads",
                    d: "All online inquiries, digital leads, and customer bookings from your territory routed exclusively to your dealership."
                  },
                  {
                    t: "Pan-India Warranty & Spare Parts Support",
                    d: "Direct manufacturer warranty honoring with prompt spare parts dispatch and quick battery cell replacements."
                  }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FEA603", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#1e293b" }}>{item.t}</h4>
                      <p style={{ margin: "3px 0 0", fontSize: "0.88rem", color: "#64748b", lineHeight: 1.5 }}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Box */}
            <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "24px", padding: "30px", color: "#fff" }}>
              <h4 style={{ margin: "0 0 10px", fontSize: "1.2rem", fontWeight: 800, color: "#FEA603" }}>
                Prefer Direct Telephonic Discussion?
              </h4>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "20px" }}>
                Our Senior Business Development Managers are ready to discuss territory availability and partnership details.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>📞</span>
                  <span><strong>Toll-Free / Hotline:</strong> +91-11-48224444</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>✉️</span>
                  <span><strong>Dealership Cell:</strong> info@motomaxev.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>🏢</span>
                  <span><strong>Headquarters:</strong> A-53, Naraina Industrial Area Phase-1, New Delhi-110028</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dealership Application Form */}
          <div
            id="apply-form"
            className="dealership-form-padding"
            style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 15px 40px rgba(0, 0, 0, 0.06)",
              position: "relative",
              boxSizing: "border-box",
              width: "100%"
            }}
          >
            <div style={{ borderBottom: "2px solid #f1f5f9", paddingBottom: "20px", marginBottom: "26px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#FEA603", textTransform: "uppercase", letterSpacing: "1px" }}>
                Online Dealership Application Form
              </span>
              <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#0f172a", margin: "6px 0 0" }}>
                Register Your Dealership Interest
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.92rem", margin: "6px 0 0" }}>
                Fill out the form below. Inquiries are directly submitted to our central Admin team.
              </p>
            </div>

            {successMsg && (
              <div
                style={{
                  background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                  border: "1.5px solid #10b981",
                  color: "#065f46",
                  padding: "18px 22px",
                  borderRadius: "14px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  boxShadow: "0 8px 25px rgba(16, 185, 129, 0.18)",
                  animation: "fadeIn 0.3s ease-out"
                }}
              >
                <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>✅</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: "block", fontSize: "1.08rem", color: "#065f46", marginBottom: "4px" }}>
                    Application Submitted Successfully!
                  </strong>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "#047857", lineHeight: 1.5 }}>
                    {successMsg}
                  </p>
                  <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700, display: "inline-block", marginTop: "6px" }}>
                    ✓ Form has been reset to normal. You can submit another application if needed.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessMsg("")}
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    border: "none",
                    color: "#065f46",
                    fontSize: "1.1rem",
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    lineHeight: 1
                  }}
                  title="Close message"
                >
                  ✕
                </button>
              </div>
            )}

            {errorMsg && (
                  <div
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <span>⚠️</span>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Owner / Applicant Name & Contact Number */}
                  <div className="dealership-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Owner / Applicant Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="owner_name"
                        required
                        value={formData.owner_name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Sharma"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "0.95rem",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Contact Number <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "0.95rem",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  {/* GST Registered & GST Number */}
                  <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "14px", border: "1px solid #e2e8f0", boxSizing: "border-box", width: "100%" }}>
                    <div className="dealership-gst-row">
                      <div>
                        <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          GST Registered? <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <select
                          name="gst_registered"
                          value={formData.gst_registered}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "10px",
                            border: "1.5px solid #cbd5e1",
                            background: "#fff",
                            fontSize: "0.95rem",
                            outline: "none",
                            boxSizing: "border-box",
                            fontWeight: 600
                          }}
                        >
                          <option value="Yes">Yes (Have GST)</option>
                          <option value="No">No (Will Apply)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                          GST Number {formData.gst_registered === "Yes" && <span style={{ color: "#ef4444" }}>*</span>}
                        </label>
                        <input
                          type="text"
                          name="gst_number"
                          value={formData.gst_number}
                          onChange={handleChange}
                          placeholder={formData.gst_registered === "Yes" ? "e.g. 07AAAAA0000A1Z5" : "Not applicable yet"}
                          disabled={formData.gst_registered === "No"}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.95rem",
                            background: formData.gst_registered === "No" ? "#f1f5f9" : "#fff",
                            outline: "none",
                            boxSizing: "border-box",
                            textTransform: "uppercase"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* State & City */}
                  <div className="dealership-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        State / Region <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "10px",
                          border: "1.5px solid #cbd5e1",
                          background: "#fff",
                          fontSize: "0.95rem",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      >
                        <option value="">Select State</option>
                        {indianStates.map((st, i) => (
                          <option key={i} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                        Target City / District <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Lucknow, Pune, Jaipur"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "0.95rem",
                          outline: "none",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>

                  {/* Investment Amount (Free text input - applicant types amount themselves, NO dropdown) */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                      Investment Amount (in ₹) <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="investment_capacity"
                      required
                      value={formData.investment_capacity}
                      onChange={handleChange}
                      placeholder="e.g. ₹15,00,000 / 15 Lakh"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1.5px solid #cbd5e1",
                        fontSize: "0.95rem",
                        outline: "none",
                        boxSizing: "border-box",
                        background: "#fff",
                        fontWeight: 600,
                        color: "#0f172a"
                      }}
                    />
                    <span style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px", display: "block" }}>
                      Enter your proposed investment budget (e.g. ₹10 Lakh, ₹25 Lakh, ₹50 Lakh)
                    </span>
                  </div>

                  {/* Message Box with NO character limit */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <label style={{ fontSize: "0.88rem", fontWeight: 700, color: "#334155" }}>
                        Proposal / Business Plan / Message
                      </label>
                      <span style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 700, background: "#dcfce7", padding: "2px 8px", borderRadius: "12px" }}>
                        ∞ No Character Limit
                      </span>
                    </div>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please write your detailed proposal, showroom location, experience in automobile/battery sector, expected vehicle sales, or any questions for MotoMax EV. You can type as much details as needed..."
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        border: "1.5px solid #cbd5e1",
                        fontSize: "0.95rem",
                        outline: "none",
                        boxSizing: "border-box",
                        resize: "vertical",
                        fontFamily: "inherit",
                        lineHeight: 1.5
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #FEA603 0%, #ff8c00 100%)",
                      color: "#fff",
                      padding: "16px 24px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "1.08rem",
                      fontWeight: 800,
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 25px rgba(254, 166, 3, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease"
                    }}
                  >
                    {loading ? (
                      <>
                        <span>⏳</span>
                        <span>Registering Dealership Application...</span>
                      </>
                    ) : (
                      <>
                        <span>🚀</span>
                        <span>Submit Dealership Application</span>
                      </>
                    )}
                  </button>

                  <p style={{ textAlign: "center", margin: 0, fontSize: "0.82rem", color: "#94a3b8" }}>
                    🔒 We respect your privacy. All information submitted is kept strictly confidential.
                  </p>
                </form>
              </div>
        </div>
      </section>
    </div>
  );
};

export default Dealership;
