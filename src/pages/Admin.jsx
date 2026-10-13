import React, { useState, useEffect, useRef } from "react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const ImageUploadField = ({ label, currentImage, onImageUploaded, id }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${API_BASE}/upload.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploading(false);
        if (data.status === "success" && data.url) {
          onImageUploaded(data.url);
        } else {
          alert(data.message || "Upload failed");
        }
      })
      .catch((err) => {
        setUploading(false);
        alert("Upload error: " + err.message);
      });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px", color: "#334155" }}>
          {label}
        </label>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", background: "#fff", padding: "12px 16px", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
        {currentImage ? (
          <img
            src={currentImage}
            alt="Preview"
            style={{ width: "70px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
        ) : (
          <div style={{ width: "70px", height: "50px", borderRadius: "8px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "1.2rem" }}>
            🖼️
          </div>
        )}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id={id || undefined}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            disabled={uploading}
            style={{
              background: uploading ? "#94a3b8" : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              cursor: uploading ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            {uploading ? "⏳ Uploading Image..." : "📁 Upload Image from Computer"}
          </button>
          <span style={{ marginLeft: "12px", fontSize: "0.8rem", color: "#64748b" }}>
            {currentImage ? "✅ Image uploaded & ready" : "JPG, PNG, WEBP (Direct file upload)"}
          </span>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("adminLoggedIn") === "true");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Products
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [range, setRange] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [category, setCategory] = useState("2-Wheeler");
  const [editProductId, setEditProductId] = useState(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Inquiries & Orders & Users
  const [queries, setQueries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Dealership Inquiries
  const [dealershipInquiries, setDealershipInquiries] = useState([]);
  const [dealershipStats, setDealershipStats] = useState({ total: 0, new_count: 0, contacted_count: 0, approved_count: 0 });
  const [dealershipFilter, setDealershipFilter] = useState("all");
  const [dealershipSearch, setDealershipSearch] = useState("");
  const [dealershipPage, setDealershipPage] = useState(1);
  const [selectedDealership, setSelectedDealership] = useState(null);
  const [dealershipLoading, setDealershipLoading] = useState(false);

  const [productPage, setProductPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const renderPagination = (currentPage, totalItems, onPageChange) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '25px', marginBottom: '10px' }}>
        <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} style={{padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', background: currentPage===1 ? '#f8fafc' : '#fff', color: currentPage===1 ? '#94a3b8' : '#1e293b', cursor: currentPage===1 ? 'not-allowed' : 'pointer', fontWeight: 600, transition: 'all 0.2s'}}>← Prev</button>
        <span style={{padding: '8px 16px', fontWeight: 'bold', background: '#f1f5f9', borderRadius: '8px', color: '#334155'}}>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} style={{padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '8px', background: currentPage===totalPages ? '#f8fafc' : '#fff', color: currentPage===totalPages ? '#94a3b8' : '#1e293b', cursor: currentPage===totalPages ? 'not-allowed' : 'pointer', fontWeight: 600, transition: 'all 0.2s'}}>Next →</button>
      </div>
    );
  };

  // Settings (Images and Text)
  const [settings, setSettings] = useState({
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7",
    aboutImage: "https://images.unsplash.com/photo-1620802051779-11f4d1dd4b2a",
    contactImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    heroTitle: "Powering the Future of Mobility",
    homepage_slider: JSON.stringify([
      { type: "image", src: "/assets/motomax-banner-batteries.jpg", title: "", subtitle: "" },
      { type: "image", src: "/assets/motomax-banner-assembly.jpg", title: "", subtitle: "" },
      { type: "image", src: "/assets/motomax-scooty-fleet.jpg", title: "INDIA'S LEADING ELECTRIC MOBILITY ECOSYSTEM", subtitle: "High Speed Scooties, Commercial Fleets & Smart EV Powertrains" },
      { type: "image", src: "/assets/motomax-cell-grading.jpg", title: "AIS-156 & BIS CERTIFIED CELL GRADING", subtitle: "Laser-Tested Internal Resistance & Smart Thermal Management" },
      { type: "image", src: "/assets/motomax-battery-warehouse.jpg", title: "HIGH CAPACITY ENERGY STORAGE SOLUTIONS", subtitle: "Trusted by Top OEMs and 500,000+ Daily Drivers Across India" },
      { type: "video", src: "/assets/home-video.mp4" }
    ], null, 2)
  });



  // About Us
  const [aboutSettings, setAboutSettings] = useState({
    hero_badge: "⚡ Pioneering Green Mobility Since 2004",
    hero_title: "Powering a Greener Tomorrow",
    hero_subtitle: "India's premier manufacturer of high-reliability lithium-ion batteries and advanced EV charging ecosystems.",
    hero_image: "/assets/slider-3.jpg",
    story_tag: "Our Heritage",
    story_title: "Driving India's Electric Revolution",
    story_para1: "",
    story_para2: "",
    story_image: "/assets/slider-1.jpg",
    story_badge_number: "20+ Years",
    story_badge_text: "Clean Tech Innovation",
    founder_quote: "",
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
    infra_desc: "",
    infra_image: "/assets/slider-2.jpg",
    infra_f1_title: "800+ Team Strength",
    infra_f1_text: "",
    infra_f2_title: "Dedicated R&D Center",
    infra_f2_text: "",
    infra_f3_title: "Pan-India Service Network",
    infra_f3_text: "",
    cta_title: "Together, Let's Drive India's Net-Zero Future",
    cta_text: ""
  });

  // Profile
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);

  // Contact Page Settings
  const [contactSettings, setContactSettings] = useState({
    hero_badge: "Get In Touch",
    hero_title: "Contact MotoMax EV",
    hero_subtitle: "We're here to help and answer any questions you might have. We look forward to hearing from you.",
    office_company: "MotoMax EV Limited",
    office_address: "A-53, Naraina Industrial Area\nPhase-1, Naraina, Delhi-110028",
    office_cin: "CIN: U27101DL2006PLC154820",
    phone_primary: "+91-11-48224444",
    phone_secondary: "+91-11-48022444",
    working_hours: "Mon - Fri: 9:00 AM - 6:00 PM",
    email_primary: "info@motomaxev.com",
    email_secondary: "support@motomaxev.com",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9960251783063!2d77.1390978761159!3d28.62988118420074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d032e367856b3%3A0xc3b832b85a30a109!2sNaraina%20Industrial%20Area%20Phase%201%2C%20Naraina%2C%20New%20Delhi%2C%20Delhi%20110028!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  });

  // Footer Settings
  const [footerSettings, setFooterSettings] = useState({
    logo_url: "/Icon.png",
    company_name: "MotoMax EV",
    address: "A-53, Naraina Industrial Area Phase-1,\nNaraina, Delhi-110028 (India)",
    phone: "+91-11-48224444",
    email: "info@motomaxev.com",
    website: "www.motomaxev.com",
    cta_title: "Let's energize\nour spaces with\nclean power",
    cta_btn_text: "ENQUIRE NOW",
    cta_btn_link: "/contact-us",
    facebook_url: "https://facebook.com",
    instagram_url: "https://instagram.com",
    linkedin_url: "https://linkedin.com",
    twitter_url: "https://twitter.com",
    youtube_url: "",
    copyright_text: "© 2026 MotoMax EV Industries. All Rights Reserved.",
    useful_links: [
      { title: "Home", url: "/" },
      { title: "About Us", url: "/about-us" },
      { title: "Contact", url: "/contact-us" },
      { title: "Management", url: "/team" }
    ],
    product_links: [
      { title: "Automotive Lithium Battery", url: "/products/electric-scooter-battery" },
      { title: "Inverter Lithium Battery", url: "/products/lithium-inverter-battery-home" },
      { title: "Lithium Battery Solar App.", url: "/products/solar-street-light-storage" },
      { title: "Drone Lithium Battery", url: "/products/solid-state" },
      { title: "EV Charger", url: "/products/charger" },
      { title: "Inverter", url: "/products/inverter" }
    ]
  });

  const fetchProfile = () => {
    fetch(`${API_BASE}/profile.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.name) {
          setProfile(prev => ({ ...prev, name: data.name, email: data.email }));
        }
      });
  };

  const fetchSettings = () => {
    fetch(`${API_BASE}/settings.php`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success" && data.data && Object.keys(data.data).length > 0) {
          setSettings(prev => ({ ...prev, ...data.data }));
        }
      });
  };

  const fetchProducts = () => {
    fetch(`${API_BASE}/products.php`)
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  };

  const fetchQueries = () => {
    fetch(`${API_BASE}/inquiries.php`)
      .then((res) => res.json())
      .then((data) => setQueries(data || []));
  };

  const fetchDealershipInquiries = (status = dealershipFilter, search = dealershipSearch) => {
    setDealershipLoading(true);
    const filterParam = status && status !== "all" ? `&status=${encodeURIComponent(status)}` : "";
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    fetch(`${API_BASE}/dealership.php?fetch=1${filterParam}${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        setDealershipLoading(false);
        if (data && data.status === "success") {
          setDealershipInquiries(data.data || []);
          if (data.stats) setDealershipStats(data.stats);
        }
      })
      .catch((err) => {
        setDealershipLoading(false);
        console.error("Error fetching dealership inquiries:", err);
      });
  };

  const handleUpdateDealershipStatus = (id, newStatus) => {
    fetch(`${API_BASE}/dealership.php?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === "success") {
          fetchDealershipInquiries(dealershipFilter, dealershipSearch);
          if (selectedDealership && selectedDealership.id === id) {
            setSelectedDealership((prev) => ({ ...prev, status: newStatus }));
          }
        } else {
          alert((data && data.message) || "Failed to update status");
        }
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleDeleteDealership = (id) => {
    if (window.confirm("Are you sure you want to delete this dealership inquiry? This cannot be undone.")) {
      fetch(`${API_BASE}/dealership.php?id=${id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.status === "success") {
            if (selectedDealership && selectedDealership.id === id) {
              setSelectedDealership(null);
            }
            fetchDealershipInquiries(dealershipFilter, dealershipSearch);
          } else {
            alert((data && data.message) || "Failed to delete inquiry");
          }
        })
        .catch((err) => alert("Error: " + err.message));
    }
  };


  const fetchOrders = () => {
    fetch(`${API_BASE}/orders.php?admin=true`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  };


  const handleUpdateOrderStatus = (id, newStatus) => {
    fetch(`${API_BASE}/orders.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: id, order_status: newStatus })
    }).then(() => fetchOrders());
  };

  const handleUpdateProductPrice = (id, newPrice) => {
    const p = prompt("Enter new price:", newPrice);
    if (p !== null && p !== newPrice) {
      fetch(`${API_BASE}/products.php?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: p })
      }).then(() => fetchProducts());
    }
  };

  const fetchUsers = () => {
    fetch(`${API_BASE}/admin.php?action=users`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setUsers(data.data || []);
        }
      })
      .catch(err => console.error(err));
  };


  const fetchAboutSettings = () => {
    fetch(`${API_BASE}/about.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === "success" && data.data) {
          setAboutSettings(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error(err));
  };

  const handleSaveAboutSettings = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/about.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aboutSettings)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("About Us content updated successfully!");
          fetchAboutSettings();
        } else {
          alert(data.message || "Failed to update About Us content.");
        }
      })
      .catch(err => alert("Server error: " + err.message));
  };

  const fetchFooterSettings = () => {
    fetch(`${API_BASE}/footer.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === "success" && data.data) {
          setFooterSettings(prev => ({
            ...prev,
            ...data.data,
            useful_links: Array.isArray(data.data.useful_links) ? data.data.useful_links : prev.useful_links,
            product_links: Array.isArray(data.data.product_links) ? data.data.product_links : prev.product_links
          }));
        }
      })
      .catch(err => console.error(err));
  };

  const handleSaveFooterSettings = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/footer.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(footerSettings)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("Footer settings updated successfully!");
          fetchFooterSettings();
        } else {
          alert(data.message || "Failed to update Footer settings.");
        }
      })
      .catch(err => alert("Server error: " + err.message));
  };

  const fetchContactSettings = () => {
    fetch(`${API_BASE}/contact.php`)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === "success" && data.data) {
          setContactSettings(prev => ({ ...prev, ...data.data }));
        }
      })
      .catch(err => console.error(err));
  };

  const handleSaveContactSettings = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/contact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactSettings)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("Contact Us page settings updated successfully!");
          fetchContactSettings();
        } else {
          alert(data.message || "Failed to update Contact settings.");
        }
      })
      .catch(err => alert("Server error: " + err.message));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
      fetchQueries();
      fetchSettings();
      fetchProfile();
      fetchOrders();
      fetchUsers();
      fetchAboutSettings();
      fetchFooterSettings();
      fetchContactSettings();
      fetchDealershipInquiries();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setAdminLoading(true);
    fetch(`${API_BASE}/auth.php?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    .then(res => res.json())
    .then(data => {
      setAdminLoading(false);
      if (data.status === "success") {
        setIsLoggedIn(true);
        localStorage.setItem("adminLoggedIn", "true");
      } else {
        setLoginError(data.message || "Invalid administrative credentials.");
      }
    })
    .catch(() => {
      setAdminLoading(false);
      setLoginError("Server connection error. Please verify backend is running.");
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/profile.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.status === "success") {
        setProfile({ ...profile, password: "" });
      }
    });
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('range', range);
    formData.append('description', description);
    formData.append('key_points', keyPoints);
    formData.append('category', category);
    
    if (editProductId) {
      formData.append('id', editProductId);
    }
    
    if (image instanceof File) {
      formData.append('image', image);
    } else {
      formData.append('image', image);
    }

    fetch(`${API_BASE}/products.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Product ${editProductId ? 'Updated' : 'Added'} Successfully!`);
          setName(""); setPrice(""); setRange(""); setImage(""); setDescription(""); setKeyPoints(""); setEditProductId(null); setShowProductForm(false);
          fetchProducts();
        }
      });
  };

  const handleEditProduct = (p) => {
    setEditProductId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setRange(p.range || "");
    setDescription(p.description || "");
    setKeyPoints(p.key_points || "");
    setImage(p.image || "");
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      fetch(`${API_BASE}/products.php?id=${id}`, { method: "DELETE" })
        .then(() => fetchProducts());
    }
  };


  const handleResolveQuery = (id) => {
    fetch(`${API_BASE}/inquiries.php?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "resolved" }),
    }).then(() => fetchQueries());
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/settings.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    }).then(() => alert("Page Images & Settings Saved Successfully!"));
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-auth-root">
        <style>{`
          .admin-auth-root {
            min-height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 20%, #1e293b 0%, #0b0f19 80%);
            padding: 24px;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            position: relative;
            overflow: hidden;
          }
          .admin-auth-root::before {
            content: '';
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(254, 166, 3, 0.12) 0%, transparent 70%);
            top: -150px;
            right: -150px;
            border-radius: 50%;
            pointer-events: none;
          }
          .admin-auth-root::after {
            content: '';
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
            bottom: -150px;
            left: -100px;
            border-radius: 50%;
            pointer-events: none;
          }
          .admin-auth-card {
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 440px;
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(254, 166, 3, 0.15);
            animation: cardAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes cardAppear {
            from { opacity: 0; transform: translateY(25px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .admin-auth-hero {
            position: relative;
            width: 100%;
            height: 170px;
            overflow: hidden;
          }
          .admin-auth-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            filter: brightness(0.88);
            transition: transform 0.8s ease;
          }
          .admin-auth-card:hover .admin-auth-hero img {
            transform: scale(1.04);
          }
          .admin-auth-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.85) 75%, #0f172a 100%);
          }
          .admin-auth-badge {
            position: absolute;
            top: 16px;
            left: 18px;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 6px 14px;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(254, 166, 3, 0.4);
            border-radius: 20px;
            color: #FEA603;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 1.2px;
            text-transform: uppercase;
          }
          .admin-auth-badge-dot {
            width: 7px;
            height: 7px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 8px #22c55e;
          }
          .admin-auth-body {
            padding: 24px 32px 32px;
          }
          .admin-auth-header {
            text-align: center;
            margin-bottom: 22px;
          }
          .admin-auth-logo-badge {
            width: 48px;
            height: 48px;
            margin: -48px auto 14px;
            background: #0f172a;
            border: 2px solid #FEA603;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px rgba(254, 166, 3, 0.35);
            position: relative;
            z-index: 3;
          }
          .admin-auth-logo-badge img {
            width: 28px;
            height: 28px;
            object-fit: contain;
          }
          .admin-auth-title {
            color: #ffffff;
            font-size: 1.45rem;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin: 0;
          }
          .admin-auth-error {
            background: rgba(239, 68, 68, 0.12);
            border: 1px solid rgba(239, 68, 68, 0.35);
            color: #fca5a5;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .admin-field-group {
            margin-bottom: 18px;
          }
          .admin-field-label {
            display: block;
            font-size: 0.78rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #94a3b8;
            margin-bottom: 7px;
          }
          .admin-field-input-box {
            position: relative;
            display: flex;
            align-items: center;
          }
          .admin-field-icon {
            position: absolute;
            left: 14px;
            color: #64748b;
            font-size: 0.95rem;
            pointer-events: none;
          }
          .admin-field-input {
            width: 100%;
            box-sizing: border-box;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #ffffff;
            padding: 12px 14px 12px 42px;
            border-radius: 12px;
            font-size: 0.92rem;
            transition: all 0.25s ease;
          }
          .admin-field-input:focus {
            outline: none;
            border-color: #FEA603;
            background: rgba(30, 41, 59, 0.95);
            box-shadow: 0 0 0 3px rgba(254, 166, 3, 0.2);
          }
          .admin-field-input::placeholder {
            color: #475569;
          }
          .admin-toggle-pwd {
            position: absolute;
            right: 12px;
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 0.95rem;
            cursor: pointer;
            padding: 4px;
          }
          .admin-toggle-pwd:hover {
            color: #FEA603;
          }
          .admin-submit-btn {
            width: 100%;
            padding: 13px;
            margin-top: 8px;
            background: linear-gradient(135deg, #FEA603 0%, #e65100 100%);
            border: none;
            border-radius: 12px;
            color: #ffffff;
            font-size: 0.98rem;
            font-weight: 700;
            letter-spacing: 0.3px;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 10px 25px rgba(254, 166, 3, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .admin-submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px rgba(254, 166, 3, 0.45);
          }
          .admin-submit-btn:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }
          .admin-back-link {
            display: block;
            text-align: center;
            margin-top: 18px;
            color: #64748b;
            text-decoration: none;
            font-size: 0.84rem;
            font-weight: 500;
            transition: color 0.2s;
          }
          .admin-back-link:hover {
            color: #FEA603;
          }
        `}</style>

        <div className="admin-auth-card">
          <div className="admin-auth-hero">
            <img src="/assets/slider-2.jpg" alt="MotoMax Control Center" />
            <div className="admin-auth-hero-overlay" />
            <div className="admin-auth-badge">
              <span className="admin-auth-badge-dot"></span>
              Admin Portal
            </div>
          </div>

          <div className="admin-auth-body">
            <div className="admin-auth-header">
              <div className="admin-auth-logo-badge">
                <img src="/Icon.png" alt="MotoMax" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
              </div>
              <h2 className="admin-auth-title">Admin Login</h2>
            </div>

            {loginError && (
              <div className="admin-auth-error">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-field-group">
                <label className="admin-field-label">Email</label>
                <div className="admin-field-input-box">
                  <span className="admin-field-icon">✉️</span>
                  <input
                    className="admin-field-input"
                    type="email"
                    placeholder="admin@test.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Password</label>
                <div className="admin-field-input-box">
                  <span className="admin-field-icon">🔒</span>
                  <input
                    className="admin-field-input"
                    type={showAdminPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="admin-toggle-pwd"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    title={showAdminPassword ? "Hide password" : "Show password"}
                  >
                    {showAdminPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <button className="admin-submit-btn" type="submit" disabled={adminLoading}>
                {adminLoading ? "Authenticating..." : "Login to Dashboard →"}
              </button>

              <a href="/" className="admin-back-link">
                ← Return to Store
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const pendingQueries = queries.filter(q => q.status === 'pending').length;

  return (
    <div className="admin-layout">
      <style>
        {`
          .admin-layout { display: flex; min-height: 100vh; background: #f4f7fb; font-family: 'Inter', sans-serif; color: #334155; overflow-x: hidden; }
          .admin-sidebar { width: 280px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color: #fff; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 24px rgba(0,0,0,0.1); }
          .sidebar-header { height: 75px; padding: 0 24px; font-size: 1.5rem; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); letter-spacing: 0.5px; box-sizing: border-box; }
          .sidebar-header span { color: #FEA603; }
          .close-sidebar { display: none; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; transition: transform 0.2s; }
          .close-sidebar:hover { transform: scale(1.1); color: #FEA603; }
          .sidebar-menu { display: flex; flex-direction: column; padding: 20px 12px; flex: 1; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; gap: 6px; }
          .sidebar-menu::-webkit-scrollbar { display: none; }
          .menu-item { padding: 14px 20px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s ease; border-radius: 12px; color: #94a3b8; display: flex; align-items: center; gap: 12px; }
          .menu-item:hover { background: rgba(255,255,255,0.06); color: #fff; transform: translateX(5px); }
          .menu-item.active { background: linear-gradient(90deg, rgba(254,166,3,0.15) 0%, rgba(254,166,3,0.05) 100%); color: #FEA603; border-left: 4px solid #FEA603; box-shadow: inset 0 0 20px rgba(254,166,3,0.05); transform: none; border-radius: 8px; }
          
          .admin-main { flex: 1; margin-left: 280px; display: flex; flex-direction: column; min-width: 0; min-height: 100vh; transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          
          .admin-topbar { height: 75px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); padding: 0 5%; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.03); position: sticky; top: 0; z-index: 90; border-bottom: 1px solid rgba(0,0,0,0.03); box-sizing: border-box; }
          .menu-toggle { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #1e293b; transition: color 0.2s; }
          .menu-toggle:hover { color: #FEA603; }
          
          .content-wrapper { padding: 40px 5%; flex: 1; animation: fadeIn 0.4s ease-out forwards; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          
          .admin-card { background: #fff; border-radius: 20px; padding: 32px; margin-bottom: 30px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04); border: 1px solid rgba(0,0,0,0.04); transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .admin-card:hover { box-shadow: 0 15px 50px rgba(0, 0, 0, 0.06); }
          .admin-card h3 { margin-top: 0; margin-bottom: 24px; font-size: 1.35rem; font-weight: 800; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
          
          .form-group { margin-bottom: 24px; }
          .form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; color: #475569; letter-spacing: 0.3px; }
          .form-input { width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 12px; box-sizing: border-box; font-size: 0.95rem; background: #f8fafc; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); color: #1e293b; }
          .form-input:focus { outline: none; border-color: #FEA603; background: #fff; box-shadow: 0 0 0 4px rgba(254,166,3,0.1); transform: translateY(-1px); }
          
          .btn-primary { background: linear-gradient(135deg, #FEA603 0%, #f97316 100%); color: #fff; padding: 14px 28px; border: none; border-radius: 12px; cursor: pointer; width: 100%; font-weight: 700; font-size: 1rem; letter-spacing: 0.5px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
          .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(254,166,3,0.25); filter: brightness(1.05); }
          .btn-primary:active { transform: translateY(-1px); box-shadow: 0 5px 10px rgba(254,166,3,0.2); }
          
          .admin-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; }
          .admin-table th { font-weight: 700; color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; padding: 16px 20px; text-align: left; background: #f8fafc; border-radius: 8px; }
          .admin-table td { padding: 20px; background: #fff; text-align: left; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
          .admin-table tr { box-shadow: 0 2px 10px rgba(0,0,0,0.01); transition: transform 0.2s, box-shadow 0.2s; }
          .admin-table tbody tr:hover { transform: translateY(-2px) scale(1.005); box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: relative; z-index: 1; }
          .admin-table td:first-child { border-left: 1px solid #f1f5f9; border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
          .admin-table td:last-child { border-right: 1px solid #f1f5f9; border-top-right-radius: 12px; border-bottom-right-radius: 12px; }
          
          .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
          .stat-card { background: #fff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: center; transition: all 0.3s ease; position: relative; overflow: hidden; }
          .stat-card::after { content: ''; position: absolute; right: -20px; bottom: -20px; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, rgba(254,166,3,0.1) 0%, transparent 100%); }
          .stat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
          .stat-card h4 { color: #64748b; font-weight: 700; font-size: 0.9rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; z-index: 1; }
          .stat-card h2 { font-size: 3rem; font-weight: 900; color: #0f172a; margin: 0; line-height: 1; background: linear-gradient(135deg, #0f172a 0%, #334155 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; z-index: 1; }
          
          .grid-2col { display: grid; grid-template-columns: 1.2fr 2fr; gap: 30px; align-items: start; }
          .grid-queries { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
          
          @media (max-width: 1024px) {
            .grid-2col { grid-template-columns: 1fr; }
          }
          @media (max-width: 768px) {
            .admin-sidebar { transform: translateX(-100%); }
            .admin-sidebar.open { transform: translateX(0); }
            .admin-main { margin-left: 0; }
            .menu-toggle { display: block; }
            .close-sidebar { display: block; }
            .stat-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 480px) {
            .stat-grid { grid-template-columns: 1fr; }
            .admin-card { padding: 20px; }
            .content-wrapper { padding: 20px 15px; }
            .admin-topbar { padding: 15px 20px; }
          }
        `}
      </style>

      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div>MotoMax<span>Admin</span></div>
          <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        <div className="sidebar-menu">
          <div className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}>Dashboard</div>
          <div className={`menu-item ${activeTab === "users" ? "active" : ""}`} onClick={() => { setActiveTab("users"); setIsSidebarOpen(false); }}>Users</div>
          <div className={`menu-item ${activeTab === "products" ? "active" : ""}`} onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }}>Products</div>
          <div className={`menu-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }}>Orders</div>
          <div className={`menu-item ${activeTab === "queries" ? "active" : ""}`} onClick={() => { setActiveTab("queries"); setIsSidebarOpen(false); }}>Inquiries</div>
          <div className={`menu-item ${activeTab === "dealership" ? "active" : ""}`} onClick={() => { setActiveTab("dealership"); setIsSidebarOpen(false); }}>
            <span>🤝 Dealership Inquiries</span>
            {parseInt(dealershipStats?.new_count || 0) > 0 && (
              <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", borderRadius: "10px", padding: "1px 7px", fontSize: "0.75rem", fontWeight: "bold" }}>
                {dealershipStats.new_count}
              </span>
            )}
          </div>
          <div className={`menu-item ${activeTab === "partners" ? "active" : ""}`} onClick={() => { setActiveTab("partners"); setIsSidebarOpen(false); }}>Partner Requests</div>
          <div className={`menu-item ${activeTab === "cms" ? "active" : ""}`} onClick={() => { setActiveTab("cms"); setIsSidebarOpen(false); }}>Page Images</div>
          <div className={`menu-item ${activeTab === "about" ? "active" : ""}`} onClick={() => { setActiveTab("about"); setIsSidebarOpen(false); }}>About Us</div>
          <div className={`menu-item ${activeTab === "contact" ? "active" : ""}`} onClick={() => { setActiveTab("contact"); setIsSidebarOpen(false); }}>Contact Us</div>
          <div className={`menu-item ${activeTab === "footer" ? "active" : ""}`} onClick={() => { setActiveTab("footer"); setIsSidebarOpen(false); }}>Footer Settings</div>
          <div className={`menu-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }}>My Profile</div>
        </div>
        <button style={{ margin: "auto 20px 20px", padding: "12px", background: "rgba(255,0,0,0.1)", color: "#ef4444", border: "1px solid rgba(255,0,0,0.2)", borderRadius: "10px", cursor: "pointer", fontWeight: "700"}} onClick={() => { setIsLoggedIn(false); localStorage.removeItem("adminLoggedIn"); }}>Log Out</button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <div style={{fontWeight: 700, fontSize: "1.2rem", textTransform: "capitalize"}}>{activeTab === "dealership" ? "Dealership Inquiries" : activeTab}</div>
          <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <div style={{width: "40px", height: "40px", borderRadius: "50%", background: "#FEA603", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>A</div>
          </div>
        </div>

        <div className="content-wrapper">
          {activeTab === "dashboard" && (
            <div>
              <div className="stat-grid" style={{marginBottom: "30px"}}>
                <div className="stat-card"><h4>Total Products</h4><h2>{products.length}</h2></div>
                <div className="stat-card"><h4>Total Users</h4><h2>{users.length}</h2></div>
                <div className="stat-card" style={{cursor: "pointer", borderBottom: parseInt(dealershipStats?.new_count || 0) > 0 ? "4px solid #FEA603" : "none"}} onClick={() => setActiveTab("dealership")}>
                  <h4>Dealership Inquiries</h4>
                  <div style={{display: "flex", alignItems: "baseline", gap: "10px"}}>
                    <h2>{dealershipStats?.total || dealershipInquiries.length}</h2>
                    {parseInt(dealershipStats?.new_count || 0) > 0 && (
                      <span style={{color: "#ef4444", fontWeight: 700, fontSize: "0.95rem"}}>({dealershipStats.new_count} New)</span>
                    )}
                  </div>
                </div>
                <div className="stat-card"><h4>Total Queries</h4><h2>{queries.length}</h2></div>
                <div className="stat-card" style={{borderBottom: pendingQueries > 0 ? "4px solid #ef4444" : "4px solid #22c55e"}}>
                  <h4>Pending Queries</h4><h2 style={{color: pendingQueries > 0 ? "#ef4444" : "#22c55e"}}>{pendingQueries}</h2>
                </div>
              </div>
              <div className="admin-card" style={{height: "400px"}}>
                <h3>Overview Metrics</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'Products', count: products.length },
                    { name: 'Users', count: users.length },
                    { name: 'Orders', count: orders.length },
                    { name: 'Dealerships', count: dealershipInquiries.length },
                    { name: 'Queries', count: queries.length },
                    { name: 'Pending', count: pendingQueries }
                  ]} margin={{top: 30, right: 30, left: 0, bottom: 5}}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FEA603" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FEA603" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 600}} dx={-10} />
                    <Tooltip 
                      cursor={{stroke: 'rgba(254,166,3,0.2)', strokeWidth: 2, strokeDasharray: '5 5'}} 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 600, color: '#1e293b'}} 
                      itemStyle={{color: '#FEA603', fontWeight: 800}}
                    />
                    <Area type="monotone" dataKey="count" stroke="#FEA603" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" activeDot={{r: 8, fill: "#fff", stroke: "#FEA603", strokeWidth: 3}} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div>
              {showProductForm || editProductId ? (
                <div className="admin-card" style={{maxWidth: "800px", margin: "0 auto"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <h3 style={{margin: 0}}>{editProductId ? "Update Product" : "Add New Product"}</h3>
                    <button onClick={() => { setEditProductId(null); setShowProductForm(false); setName(""); setPrice(""); setRange(""); setImage(""); setDescription(""); setKeyPoints(""); }} style={{padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "bold"}}>← Back to Products</button>
                  </div>
                  <form onSubmit={(e) => { handleAddOrUpdateProduct(e); setTimeout(() => setShowProductForm(false), 500); }}>
                    <div className="form-group"><label>Product Name</label><input className="form-input" placeholder="e.g. EV Fast Charger" value={name} onChange={e=>setName(e.target.value)} required /></div>
                    <div className="form-group"><label>Category</label>
                      <input className="form-input" list="category-options" placeholder="e.g. 2-Wheeler" value={category} onChange={e=>setCategory(e.target.value)} required />
                      <datalist id="category-options">
                        <option value="2-Wheeler" />
                        <option value="3-Wheeler" />
                        <option value="Golf Cart" />
                        <option value="E-Scooter" />
                        <option value="Lithium Inverter" />
                        <option value="Solar Storage" />
                        <option value="Solid State" />
                        <option value="Other" />
                      </datalist>
                    </div>
                    <div className="form-group"><label>Price</label><input className="form-input" placeholder="e.g. ₹35,000" value={price} onChange={e=>setPrice(e.target.value)} required /></div>
                    <div className="form-group"><label>Short Summary / Range</label><input className="form-input" placeholder="Short description" value={range} onChange={e=>setRange(e.target.value)} /></div>
                    <ImageUploadField
                      label="Product Image"
                      currentImage={typeof image === 'string' ? image : (image instanceof File ? URL.createObjectURL(image) : '')}
                      onImageUploaded={(url) => setImage(url)}
                    />
                    <div className="form-group"><label>Full Description Text</label>
                      <textarea className="form-input" style={{minHeight:"150px", fontFamily: "monospace", fontSize: "0.9rem"}} placeholder="Paste the complete page content, HTML, features, or specs here..." value={description} onChange={e=>setDescription(e.target.value)} />
                    </div>
                    <div className="form-group"><label>Key Points (Optional)</label>
                      <textarea className="form-input" style={{minHeight:"100px", fontFamily: "monospace", fontSize: "0.9rem"}} placeholder="Example:&#10;- Fast Charging&#10;- High Efficiency" value={keyPoints} onChange={e=>setKeyPoints(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary">{editProductId ? "Update Product" : "Save Product"}</button>
                  </form>
                </div>
              ) : (
                <div className="admin-card">
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <h3 style={{margin: 0}}>Live Products</h3>
                    <button onClick={() => setShowProductForm(true)} className="btn-primary" style={{width: "auto", padding: "8px 16px", fontSize: "0.9rem"}}>+ Add New Product</button>
                  </div>
                  <div style={{overflowX: "auto"}}>
                    <table className="admin-table">
                      <thead>
                        <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {products.slice((productPage - 1) * ITEMS_PER_PAGE, productPage * ITEMS_PER_PAGE).map(p => (
                          <tr key={p.id}>
                            <td>
                              <img src={p.image ? (p.image.startsWith('http') ? p.image : `${API_BASE}/../${p.image}`) : "/assets/1.png"} alt={p.name} style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px"}} />
                            </td>
                            <td style={{fontWeight: 600, color: "#1e293b"}}>{p.name}</td>
                            <td>
                              <span style={{background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontSize: "0.85rem", color: "#475569"}}>{p.category || 'General'}</span>
                            </td>
                            <td style={{color: "#16a34a", fontWeight: "bold"}}>{p.price}</td>
                            <td>
                              <div style={{display: 'flex', gap: '8px'}}>
                                <button onClick={() => handleEditProduct(p)} style={{color: "#2563eb", border: "none", background: "rgba(37,99,235,0.1)", padding: "6px 12px", fontSize: "0.85rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600}}>Edit</button>
                                <button onClick={() => handleDeleteProduct(p.id)} style={{color: "#ef4444", border: "none", background: "rgba(239,68,68,0.1)", padding: "6px 12px", fontSize: "0.85rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600}}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                          <tr><td colSpan="5" style={{textAlign: "center", padding: "30px", color: "#888"}}>No products live. Click 'Add New Product' to get started.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {renderPagination(productPage, products.length, setProductPage)}
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="admin-card">
              <h3>Customer Orders</h3>
              <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                {orders.slice((orderPage - 1) * ITEMS_PER_PAGE, orderPage * ITEMS_PER_PAGE).map(o => (
                  <div key={o.id} style={{padding: "20px", border: "1px solid #e2e8f0", borderRadius: "12px", background: "#f8fafc", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", alignItems: "start"}}>
                    
                    <div>
                      <div style={{fontWeight: 800, color: "#1e293b", fontSize: "1.1rem", marginBottom: "8px"}}>Order #{o.id}</div>
                      <span style={{
                        fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', 
                        background: o.order_status==='Delivered' ? '#dcfce7' : '#fef9c3', 
                        color: o.order_status==='Delivered' ? '#166534' : '#854d0e', 
                        fontWeight: 700, textTransform: 'uppercase'
                      }}>
                        {o.order_status}
                      </span>
                    </div>

                    <div>
                      <div style={{color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "5px"}}>Customer Details</div>
                      <div style={{fontWeight: "bold", color: "#1e293b"}}>{o.customer_name || `User ${o.user_id}`}</div>
                      {o.customer_email && <div style={{fontSize: "0.85rem", color: "#0284c7", wordBreak: "break-all", marginTop: "2px"}}>✉️ {o.customer_email}</div>}
                      {o.customer_phone && <div style={{fontSize: "0.88rem", color: "#475569", marginTop: "2px"}}>📞 {o.customer_phone}</div>}
                      {o.shipping_address && <div style={{fontSize: "0.85rem", marginTop: "5px", color: "#64748b", whiteSpace: "pre-wrap"}}>📍 {o.shipping_address}</div>}
                    </div>

                    <div>
                      <div style={{color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "5px"}}>Order Items</div>
                      <div style={{fontSize: "0.9rem", color: "#475569"}}>
                        {o.items && o.items.map((item, idx) => (
                          <div key={idx} style={{marginBottom: "4px"}}>
                            <strong>{item.name}</strong> <span style={{color: "#94a3b8"}}>x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div style={{color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "5px"}}>Payment & Status</div>
                      <div style={{color: "#166534", fontWeight: 800, fontSize: "1.1rem", marginBottom: "5px"}}>₹{o.total_amount}</div>
                      <div style={{fontSize: "0.9rem", color: "#475569", marginBottom: "15px"}}>Method: <strong>{o.payment_method}</strong></div>
                      
                      <select 
                        value={o.order_status} 
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        disabled={o.order_status === 'Delivered'}
                        style={{
                          padding: '8px 12px', 
                          borderRadius: '8px', 
                          border: '1px solid #cbd5e1', 
                          width: '100%', 
                          fontWeight: 600, 
                          color: o.order_status === 'Delivered' ? "#94a3b8" : "#1e293b", 
                          background: o.order_status === 'Delivered' ? "#f1f5f9" : "#fff",
                          cursor: o.order_status === 'Delivered' ? "not-allowed" : "pointer"
                        }}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                  </div>
                ))}
                {orders.length === 0 && (
                  <div style={{textAlign: "center", padding: "40px", color: "#888", border: "1px dashed #cbd5e1", borderRadius: "12px"}}>No orders yet.</div>
                )}
              </div>
              {renderPagination(orderPage, orders.length, setOrderPage)}
            </div>
          )}

          {activeTab === "users" && (
            <div className="admin-card">
              <h3>Registered Users</h3>
              <div style={{overflowX: 'auto'}}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice((userPage - 1) * ITEMS_PER_PAGE, userPage * ITEMS_PER_PAGE).map(u => (
                      <tr key={u.id}>
                        <td style={{fontWeight: 600}}>#{u.id}</td>
                        <td style={{fontWeight: "bold", color: "#1e293b"}}>{u.name}</td>
                        <td style={{color: "#64748b"}}>{u.email}</td>
                        <td style={{color: "#64748b"}}>Not Provided</td>
                        <td>
                          <span style={{
                            fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px', 
                            background: u.role==='admin' ? '#fee2e2' : '#e0e7ff', 
                            color: u.role==='admin' ? '#991b1b' : '#3730a3', 
                            fontWeight: 700, textTransform: 'uppercase'
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{color: "#475569"}}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan="6" style={{textAlign: "center", padding: "30px", color: "#888"}}>No users registered yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {renderPagination(userPage, users.length, setUserPage)}
            </div>
          )}


          {activeTab === "cms" && (
            <div className="admin-card" style={{maxWidth: "800px", margin: "0 auto"}}>
              <h3>Global Settings & Images</h3>
              <form onSubmit={handleSaveSettings}>
                <div className="form-group">
                  <label>Home Slider Configuration (JSON format)</label>
                  <textarea className="form-input" style={{fontFamily:"monospace", minHeight:"200px"}} value={settings.homepage_slider || ""} onChange={e=>setSettings({...settings, homepage_slider: e.target.value})} />
                </div>
                <ImageUploadField
                  label="Home Page - Hero Image"
                  currentImage={settings.heroImage || ""}
                  onImageUploaded={(url) => setSettings({ ...settings, heroImage: url })}
                />
                <div className="form-group">
                  <label>Home Page - Hero Title</label>
                  <input className="form-input" value={settings.heroTitle || ""} onChange={e=>setSettings({...settings, heroTitle: e.target.value})} required />
                </div>
                <ImageUploadField
                  label="About Us - Cover Image"
                  currentImage={settings.aboutImage || ""}
                  onImageUploaded={(url) => setSettings({ ...settings, aboutImage: url })}
                />
                <ImageUploadField
                  label="Contact Us - Cover Image"
                  currentImage={settings.contactImage || ""}
                  onImageUploaded={(url) => setSettings({ ...settings, contactImage: url })}
                />
                <button type="submit" className="btn-primary" style={{marginTop: "20px"}}>Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="admin-card" style={{maxWidth: "600px", margin: "0 auto"}}>
              <h3>Admin Profile Settings</h3>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-input" type="text" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address (Login ID)</label>
                  <input className="form-input" type="email" value={profile.email} onChange={e=>setProfile({...profile, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>New Password (leave blank to keep current)</label>
                  <input className="form-input" type="password" value={profile.password} onChange={e=>setProfile({...profile, password: e.target.value})} placeholder="••••••••" />
                </div>
                <button type="submit" className="btn-primary" style={{marginTop: "10px"}}>Update Profile</button>
              </form>
            </div>
          )}

          {activeTab === "queries" && (
            <div className="admin-card">
              <h3>Customer Inquiries</h3>
              <div style={{overflowX: "auto"}}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.filter(q => !q.message?.includes("[PARTNER PROPOSAL]")).map(q => (
                      <tr key={q.id} style={{background: q.status === 'pending' ? 'rgba(239,68,68,0.02)' : 'rgba(34,197,94,0.02)'}}>
                        <td style={{fontWeight: 600}}>{q.name}</td>
                        <td style={{color: '#64748b'}}>{q.email}</td>
                        <td style={{maxWidth: '300px', fontStyle: 'italic', color: '#475569'}}>{q.message?.replace("[GENERAL INQUIRY] ", "")}</td>
                        <td>
                          <span style={{
                            fontSize: '0.8rem', padding: '6px 12px', borderRadius: '20px', 
                            background: q.status==='resolved' ? '#dcfce7' : '#fee2e2', 
                            color: q.status==='resolved' ? '#166534' : '#991b1b', 
                            fontWeight: 700, textTransform: 'uppercase'
                          }}>
                            {q.status}
                          </span>
                        </td>
                        <td>
                          {q.status === 'pending' ? (
                            <button onClick={() => handleResolveQuery(q.id)} style={{
                              padding: '8px 16px', background: '#22c55e', color: '#fff', 
                              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                            }}>
                              Mark Resolved
                            </button>
                          ) : (
                            <span style={{color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600}}>✓ Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "partners" && (
            <div className="admin-card">
              <h3>Channel Partner Requests</h3>
              <div style={{overflowX: "auto"}}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name & Company</th>
                      <th>Email</th>
                      <th>Proposal Details</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queries.filter(q => q.message?.includes("[PARTNER PROPOSAL]")).map(q => (
                      <tr key={q.id} style={{background: q.status === 'pending' ? 'rgba(239,68,68,0.02)' : 'rgba(34,197,94,0.02)'}}>
                        <td style={{fontWeight: 600}}>{q.name}</td>
                        <td style={{color: '#64748b'}}>{q.email}</td>
                        <td style={{maxWidth: '300px', fontStyle: 'italic', color: '#475569'}}>
                          <div style={{whiteSpace: "pre-wrap", background: "rgba(254,166,3,0.05)", padding: "10px", borderRadius: "8px"}}>
                            {q.message?.replace("[PARTNER PROPOSAL] ", "")}
                          </div>
                        </td>
                        <td>
                          <span style={{
                            fontSize: '0.8rem', padding: '6px 12px', borderRadius: '20px', 
                            background: q.status==='resolved' ? '#dcfce7' : '#fee2e2', 
                            color: q.status==='resolved' ? '#166534' : '#991b1b', 
                            fontWeight: 700, textTransform: 'uppercase'
                          }}>
                            {q.status}
                          </span>
                        </td>
                        <td>
                          {q.status === 'pending' ? (
                            <button onClick={() => handleResolveQuery(q.id)} style={{
                              padding: '8px 16px', background: '#22c55e', color: '#fff', 
                              border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600
                            }}>
                              Mark Resolved
                            </button>
                          ) : (
                            <span style={{color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600}}>✓ Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {queries.filter(q => q.message?.includes("[PARTNER PROPOSAL]")).length === 0 && (
                      <tr><td colSpan="5" style={{textAlign: "center", padding: "30px", color: "#888"}}>No partner requests yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "dealership" && (
            <div>
              {/* Stat Cards for Dealership */}
              <div className="stat-grid" style={{ marginBottom: "25px" }}>
                <div className="stat-card" style={{ borderLeft: "4px solid #3b82f6" }}>
                  <h4>Total Applications</h4>
                  <h2>{dealershipStats?.total || dealershipInquiries.length}</h2>
                </div>
                <div className="stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
                  <h4>New / Unreviewed</h4>
                  <h2 style={{ color: "#ef4444" }}>{dealershipStats?.new_count || 0}</h2>
                </div>
                <div className="stat-card" style={{ borderLeft: "4px solid #f59e0b" }}>
                  <h4>Under Discussion</h4>
                  <h2 style={{ color: "#d97706" }}>{dealershipStats?.contacted_count || 0}</h2>
                </div>
                <div className="stat-card" style={{ borderLeft: "4px solid #22c55e" }}>
                  <h4>Approved Dealers</h4>
                  <h2 style={{ color: "#16a34a" }}>{dealershipStats?.approved_count || 0}</h2>
                </div>
              </div>

              <div className="admin-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "20px" }}>
                  <div>
                    <h3 style={{ margin: 0, padding: 0, border: "none" }}>🤝 Dealership & Franchise Inquiries</h3>
                    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.9rem" }}>
                      Manage dealer applications, verify GST, review territory demand, investment, and full proposals.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button
                      onClick={() => fetchDealershipInquiries(dealershipFilter, dealershipSearch)}
                      style={{
                        padding: "9px 18px",
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        color: "#334155",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span>🔄</span>
                      <span>{dealershipLoading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", background: "#f8fafc", padding: "16px 20px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[
                      { key: "all", label: "All Applications" },
                      { key: "new", label: "New" },
                      { key: "contacted", label: "Contacted" },
                      { key: "approved", label: "Approved" },
                      { key: "rejected", label: "Rejected" }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setDealershipFilter(tab.key);
                          fetchDealershipInquiries(tab.key, dealershipSearch);
                        }}
                        style={{
                          padding: "7px 16px",
                          borderRadius: "20px",
                          border: "none",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          background: dealershipFilter === tab.key ? "#FEA603" : "#fff",
                          color: dealershipFilter === tab.key ? "#fff" : "#475569",
                          boxShadow: dealershipFilter === tab.key ? "0 4px 12px rgba(254,166,3,0.3)" : "0 1px 3px rgba(0,0,0,0.05)",
                          transition: "all 0.2s"
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
                    <input
                      type="text"
                      placeholder="Search name, phone, city, GST..."
                      value={dealershipSearch}
                      onChange={(e) => setDealershipSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchDealershipInquiries(dealershipFilter, dealershipSearch);
                        }
                      }}
                      style={{
                        padding: "9px 14px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "0.88rem",
                        width: "100%",
                        outline: "none"
                      }}
                    />
                    <button
                      onClick={() => fetchDealershipInquiries(dealershipFilter, dealershipSearch)}
                      style={{
                        padding: "9px 14px",
                        background: "#0f172a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: 700,
                        fontSize: "0.85rem"
                      }}
                    >
                      Search
                    </button>
                    {dealershipSearch && (
                      <button
                        onClick={() => {
                          setDealershipSearch("");
                          fetchDealershipInquiries(dealershipFilter, "");
                        }}
                        style={{
                          padding: "9px 12px",
                          background: "#e2e8f0",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          color: "#475569"
                        }}
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Dealership Inquiries Table */}
                <div style={{ overflowX: "auto" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID & Date</th>
                        <th>Owner Name</th>
                        <th>Contact Number</th>
                        <th>GST Details</th>
                        <th>Location</th>
                        <th>Investment Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dealershipInquiries.map((d) => (
                        <tr key={d.id} style={{ background: d.status === "new" ? "rgba(254, 166, 3, 0.04)" : "#fff" }}>
                          <td style={{ fontSize: "0.85rem", color: "#64748b" }}>
                            <strong style={{ color: "#0f172a", display: "block" }}>#{d.id}</strong>
                            {d.created_at ? new Date(d.created_at).toLocaleDateString() : "Recent"}
                          </td>

                          <td>
                            <strong style={{ color: "#0f172a", fontSize: "0.95rem", display: "block" }}>{d.owner_name}</strong>
                          </td>

                          <td>
                            <a href={`tel:${d.phone}`} style={{ textDecoration: "none", color: "#2563eb", fontWeight: 700, fontSize: "0.92rem", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              📞 {d.phone}
                            </a>
                            {d.email ? (
                              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>
                                ✉️ {d.email}
                              </div>
                            ) : null}
                          </td>

                          <td>
                            {d.gst_registered === "Yes" ? (
                              <div>
                                <span style={{ background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700 }}>
                                  ✓ Registered
                                </span>
                                <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginTop: "3px", fontFamily: "monospace" }}>
                                  {d.gst_number || "Provided"}
                                </div>
                              </div>
                            ) : (
                              <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700 }}>
                                Not Registered
                              </span>
                            )}
                          </td>

                          <td>
                            <strong style={{ color: "#1e293b", fontSize: "0.9rem" }}>{d.city || "N/A"}</strong>
                            <div style={{ color: "#64748b", fontSize: "0.8rem" }}>{d.state || ""}</div>
                          </td>

                          <td>
                            <span style={{ background: "#eff6ff", color: "#1e40af", padding: "4px 10px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 700, display: "inline-block" }}>
                              {d.investment_capacity || "Not specified"}
                            </span>
                          </td>

                          <td>
                            <select
                              value={d.status || "new"}
                              onChange={(e) => handleUpdateDealershipStatus(d.id, e.target.value)}
                              style={{
                                padding: "6px 10px",
                                borderRadius: "8px",
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                border: "1px solid #cbd5e1",
                                cursor: "pointer",
                                background:
                                  d.status === "approved"
                                    ? "#dcfce7"
                                    : d.status === "contacted"
                                    ? "#fef3c7"
                                    : d.status === "rejected"
                                    ? "#fee2e2"
                                    : "#fff7ed",
                                color:
                                  d.status === "approved"
                                    ? "#166534"
                                    : d.status === "contacted"
                                    ? "#92400e"
                                    : d.status === "rejected"
                                    ? "#991b1b"
                                    : "#c2410c"
                              }}
                            >
                              <option value="new">🟡 New</option>
                              <option value="contacted">🔵 Contacted</option>
                              <option value="approved">🟢 Approved</option>
                              <option value="rejected">🔴 Rejected</option>
                            </select>
                          </td>

                          <td>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button
                                onClick={() => setSelectedDealership(d)}
                                style={{
                                  background: "#0f172a",
                                  color: "#fff",
                                  border: "none",
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                  fontSize: "0.82rem",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                                title="View full message & proposal"
                              >
                                <span>👁️</span>
                                <span>Details</span>
                              </button>
                              <button
                                onClick={() => handleDeleteDealership(d.id)}
                                style={{
                                  background: "#fee2e2",
                                  color: "#dc2626",
                                  border: "none",
                                  padding: "6px 10px",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                  fontSize: "0.82rem"
                                }}
                                title="Delete application"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {dealershipInquiries.length === 0 && (
                        <tr>
                          <td colSpan="8" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                            {dealershipLoading ? (
                              <span>Loading dealership inquiries...</span>
                            ) : (
                              <div>
                                <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🤝</div>
                                <div style={{ fontWeight: 600 }}>No dealership applications found.</div>
                                <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>New inquiries submitted via the Dealership page will appear here.</div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal for viewing complete inquiry & full proposal */}
              {selectedDealership && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(4px)",
                    zIndex: 999999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                  }}
                  onClick={() => setSelectedDealership(null)}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      width: "100%",
                      maxWidth: "760px",
                      maxHeight: "90vh",
                      overflowY: "auto",
                      padding: "36px",
                      position: "relative",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedDealership(null)}
                      style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        fontSize: "1.1rem",
                        cursor: "pointer",
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ✕
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ background: "#FEA603", color: "#fff", padding: "3px 10px", borderRadius: "12px", fontSize: "0.78rem", fontWeight: 800 }}>
                        Application #{selectedDealership.id}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        Submitted on: {selectedDealership.created_at || "Recent"}
                      </span>
                    </div>

                    <h2 style={{ margin: "4px 0 20px", fontSize: "1.7rem", fontWeight: 800, color: "#0f172a" }}>
                      {selectedDealership.owner_name}
                    </h2>

                    {/* Status updater in modal */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "#f8fafc", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#475569" }}>Application Status:</span>
                      <select
                        value={selectedDealership.status || "new"}
                        onChange={(e) => handleUpdateDealershipStatus(selectedDealership.id, e.target.value)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          border: "1.5px solid #cbd5e1",
                          cursor: "pointer"
                        }}
                      >
                        <option value="new">🟡 New / Unreviewed</option>
                        <option value="contacted">🔵 Contacted / In Discussion</option>
                        <option value="approved">🟢 Approved Dealership</option>
                        <option value="rejected">🔴 Rejected</option>
                      </select>

                      <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                        <a
                          href={`tel:${selectedDealership.phone}`}
                          style={{
                            background: "#22c55e",
                            color: "#fff",
                            textDecoration: "none",
                            padding: "8px 14px",
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          📞 Call {selectedDealership.phone}
                        </a>
                      </div>
                    </div>

                    {/* Key Details Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Owner / Applicant Name</span>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>{selectedDealership.owner_name}</div>
                      </div>

                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Contact Number</span>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>{selectedDealership.phone}</div>
                      </div>

                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>GST Registered</span>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                          {selectedDealership.gst_registered === "Yes" ? "✅ Yes" : "❌ No"}
                        </div>
                      </div>

                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>GST Number</span>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "2px", fontFamily: "monospace" }}>
                          {selectedDealership.gst_number || "None / Not Registered"}
                        </div>
                      </div>

                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Target Location</span>
                        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginTop: "2px" }}>
                          {selectedDealership.city}, {selectedDealership.state}
                        </div>
                      </div>

                      <div style={{ background: "#fff", padding: "14px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <span style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Proposed Investment Amount</span>
                        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#d97706", marginTop: "2px" }}>
                          {selectedDealership.investment_capacity || "Not specified"}
                        </div>
                      </div>
                    </div>

                    {/* Proposal / Message Box with NO character limit */}
                    <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "20px", border: "1px solid #cbd5e1" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          📝 Applicant's Detailed Proposal / Message (Unlimited Text)
                        </span>
                        <button
                          onClick={() => {
                            if (selectedDealership.message) {
                              navigator.clipboard.writeText(selectedDealership.message);
                              alert("Message copied to clipboard!");
                            }
                          }}
                          style={{
                            background: "#fff",
                            border: "1px solid #cbd5e1",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.78rem",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                        >
                          📋 Copy Text
                        </button>
                      </div>

                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          lineHeight: 1.6,
                          color: "#1e293b",
                          fontSize: "0.95rem",
                          background: "#fff",
                          padding: "16px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          maxHeight: "350px",
                          overflowY: "auto",
                          fontFamily: "inherit"
                        }}
                      >
                        {selectedDealership.message || "No detailed message provided by the applicant."}
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px" }}>
                      <button
                        onClick={() => handleDeleteDealership(selectedDealership.id)}
                        style={{
                          background: "#fee2e2",
                          color: "#b91c1c",
                          border: "none",
                          padding: "10px 18px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.9rem"
                        }}
                      >
                        🗑️ Delete Inquiry
                      </button>

                      <button
                        onClick={() => setSelectedDealership(null)}
                        style={{
                          background: "#0f172a",
                          color: "#fff",
                          border: "none",
                          padding: "10px 24px",
                          borderRadius: "10px",
                          fontWeight: 700,
                          cursor: "pointer",
                          fontSize: "0.9rem"
                        }}
                      >
                        Done / Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="admin-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "25px", borderBottom: "2px solid #f1f5f9", paddingBottom: "16px" }}>
                <div>
                  <h3 style={{ margin: 0, border: "none", padding: 0 }}>About Us Page Editor</h3>
                  <p style={{ margin: "5px 0 0", color: "#64748b", fontSize: "0.9rem" }}>
                    Update all text, mission, stats counters, images, and leadership quotes for the /about-us page in real time.
                  </p>
                </div>
                <button
                  onClick={handleSaveAboutSettings}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    border: "none",
                    padding: "12px 28px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "0.95rem",
                    boxShadow: "0 6px 20px rgba(254,166,3,0.35)"
                  }}
                >
                  💾 Save All Changes
                </button>
              </div>

              <form onSubmit={handleSaveAboutSettings} style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {/* 1. HERO SECTION */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    🎯 1. Hero Banner
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Hero Badge</label>
                      <input
                        type="text"
                        value={aboutSettings.hero_badge || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, hero_badge: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Hero Main Title</label>
                      <input
                        type="text"
                        value={aboutSettings.hero_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, hero_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Hero Subtitle</label>
                      <textarea
                        rows={2}
                        value={aboutSettings.hero_subtitle || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, hero_subtitle: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <ImageUploadField
                        label="Hero Cover Image"
                        currentImage={aboutSettings.hero_image || ""}
                        onImageUploaded={(url) => setAboutSettings({ ...aboutSettings, hero_image: url })}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. OUR LEGACY & HERITAGE */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    🏛️ 2. Heritage & Our Story
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Section Tag</label>
                      <input
                        type="text"
                        value={aboutSettings.story_tag || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_tag: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Story Heading</label>
                      <input
                        type="text"
                        value={aboutSettings.story_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Floating Badge Number</label>
                      <input
                        type="text"
                        placeholder="20+ Years"
                        value={aboutSettings.story_badge_number || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_badge_number: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Floating Badge Label</label>
                      <input
                        type="text"
                        placeholder="Clean Tech Innovation"
                        value={aboutSettings.story_badge_text || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_badge_text: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <ImageUploadField
                        label="Story Heritage Image"
                        currentImage={aboutSettings.story_image || ""}
                        onImageUploaded={(url) => setAboutSettings({ ...aboutSettings, story_image: url })}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Story Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.story_para1 || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_para1: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Story Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.story_para2 || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, story_para2: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Founder Quote</label>
                      <textarea
                        rows={2}
                        value={aboutSettings.founder_quote || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, founder_quote: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Founder Name & Title</label>
                      <input
                        type="text"
                        value={aboutSettings.founder_name || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, founder_name: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. NATIONWIDE IMPACT METRICS */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    📊 3. Nationwide Impact Counters (4 Stats)
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Stat 1 Number</label>
                      <input
                        type="text"
                        value={aboutSettings.stat1_number || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat1_number: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", margin: "6px 0 4px" }}>Stat 1 Label</label>
                      <input
                        type="text"
                        value={aboutSettings.stat1_label || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat1_label: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Stat 2 Number</label>
                      <input
                        type="text"
                        value={aboutSettings.stat2_number || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat2_number: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", margin: "6px 0 4px" }}>Stat 2 Label</label>
                      <input
                        type="text"
                        value={aboutSettings.stat2_label || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat2_label: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Stat 3 Number</label>
                      <input
                        type="text"
                        value={aboutSettings.stat3_number || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat3_number: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", margin: "6px 0 4px" }}>Stat 3 Label</label>
                      <input
                        type="text"
                        value={aboutSettings.stat3_label || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat3_label: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Stat 4 Number</label>
                      <input
                        type="text"
                        value={aboutSettings.stat4_number || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat4_number: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <label style={{ display: "block", fontSize: "0.8rem", color: "#64748b", margin: "6px 0 4px" }}>Stat 4 Label</label>
                      <input
                        type="text"
                        value={aboutSettings.stat4_label || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, stat4_label: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. INFRASTRUCTURE & FACILITIES */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    🏭 4. Infrastructure & R&D Excellence
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Infra Tag</label>
                      <input
                        type="text"
                        value={aboutSettings.infra_tag || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_tag: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Infra Title</label>
                      <input
                        type="text"
                        value={aboutSettings.infra_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Infra Description</label>
                      <textarea
                        rows={2}
                        value={aboutSettings.infra_desc || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_desc: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <ImageUploadField
                        label="Infrastructure Lab / Plant Image"
                        currentImage={aboutSettings.infra_image || ""}
                        onImageUploaded={(url) => setAboutSettings({ ...aboutSettings, infra_image: url })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Feature 1 Title</label>
                      <input
                        type="text"
                        value={aboutSettings.infra_f1_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f1_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <textarea
                        rows={2}
                        style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginTop: "6px" }}
                        value={aboutSettings.infra_f1_text || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f1_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Feature 2 Title</label>
                      <input
                        type="text"
                        value={aboutSettings.infra_f2_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f2_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <textarea
                        rows={2}
                        style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginTop: "6px" }}
                        value={aboutSettings.infra_f2_text || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f2_text: e.target.value })}
                      />
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Feature 3 Title</label>
                      <input
                        type="text"
                        value={aboutSettings.infra_f3_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f3_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                      <textarea
                        rows={2}
                        style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginTop: "6px" }}
                        value={aboutSettings.infra_f3_text || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, infra_f3_text: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. CALL TO ACTION (CTA) */}
                <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
                    🚀 5. Bottom Call-To-Action (CTA) Banner
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>CTA Headline</label>
                      <input
                        type="text"
                        value={aboutSettings.cta_title || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, cta_title: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>CTA Supporting Description</label>
                      <textarea
                        rows={2}
                        value={aboutSettings.cta_text || ""}
                        onChange={(e) => setAboutSettings({ ...aboutSettings, cta_text: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    type="submit"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 34px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "800",
                      fontSize: "1rem",
                      boxShadow: "0 8px 25px rgba(254,166,3,0.35)"
                    }}
                  >
                    💾 Save About Us Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="admin-card" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>⚙️ Footer Customizer & Settings</h3>
                  <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
                    Update contact details, company brand logo (upload direct image), social handles, call-to-action text, and links.
                  </p>
                </div>
                <button
                  onClick={handleSaveFooterSettings}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 15px rgba(254,166,3,0.3)"
                  }}
                >
                  💾 Save Footer
                </button>
              </div>

              <form onSubmit={handleSaveFooterSettings}>
                {/* 1. Branding & Contact Details */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>🏢 1. Brand Logo & Contact Information</h4>
                  
                  <ImageUploadField
                    label="Footer Brand Logo"
                    currentImage={footerSettings.logo_url || ""}
                    onImageUploaded={(url) => setFooterSettings({ ...footerSettings, logo_url: url })}
                  />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Company / Brand Name</label>
                      <input
                        className="form-input"
                        value={footerSettings.company_name || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, company_name: e.target.value })}
                        placeholder="MotoMax EV"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Phone Number</label>
                      <input
                        className="form-input"
                        value={footerSettings.phone || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, phone: e.target.value })}
                        placeholder="+91-11-48224444"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Email Address</label>
                      <input
                        className="form-input"
                        value={footerSettings.email || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, email: e.target.value })}
                        placeholder="info@motomaxev.com"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Website URL / Domain</label>
                      <input
                        className="form-input"
                        value={footerSettings.website || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, website: e.target.value })}
                        placeholder="www.motomaxev.com"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: "16px" }}>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Office / Factory Address</label>
                    <textarea
                      rows={3}
                      value={footerSettings.address || ""}
                      onChange={(e) => setFooterSettings({ ...footerSettings, address: e.target.value })}
                      placeholder="A-53, Naraina Industrial Area Phase-1..."
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                {/* 2. CTA Box & Social Links */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>📣 2. Call To Action & Social Media Links</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Footer CTA Headline (Lines separated by Enter)</label>
                      <textarea
                        rows={3}
                        value={footerSettings.cta_title || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, cta_title: e.target.value })}
                        placeholder="Let's energize&#10;our spaces with&#10;clean power"
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Button Text</label>
                      <input
                        className="form-input"
                        value={footerSettings.cta_btn_text || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, cta_btn_text: e.target.value })}
                        placeholder="ENQUIRE NOW"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Button Link (e.g. /contact-us)</label>
                      <input
                        className="form-input"
                        value={footerSettings.cta_btn_link || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, cta_btn_link: e.target.value })}
                        placeholder="/contact-us"
                      />
                    </div>
                  </div>

                  <h5 style={{ margin: "20px 0 10px", color: "#334155", fontSize: "0.95rem" }}>Social Media Profiles</h5>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>Facebook URL</label>
                      <input
                        className="form-input"
                        value={footerSettings.facebook_url || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, facebook_url: e.target.value })}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>Instagram URL</label>
                      <input
                        className="form-input"
                        value={footerSettings.instagram_url || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, instagram_url: e.target.value })}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>LinkedIn URL</label>
                      <input
                        className="form-input"
                        value={footerSettings.linkedin_url || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>Twitter / X URL</label>
                      <input
                        className="form-input"
                        value={footerSettings.twitter_url || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, twitter_url: e.target.value })}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>YouTube Channel URL (Optional)</label>
                      <input
                        className="form-input"
                        value={footerSettings.youtube_url || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, youtube_url: e.target.value })}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>Copyright Text</label>
                      <input
                        className="form-input"
                        value={footerSettings.copyright_text || ""}
                        onChange={(e) => setFooterSettings({ ...footerSettings, copyright_text: e.target.value })}
                        placeholder="© 2026 MotoMax EV. All Rights Reserved."
                      />
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "24px" }}>
                  <button
                    type="submit"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 36px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "800",
                      fontSize: "1rem",
                      boxShadow: "0 8px 25px rgba(254,166,3,0.35)"
                    }}
                  >
                    💾 Save Footer Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="admin-card" style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>📞 Contact Us Page Editor</h3>
                  <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.85rem" }}>
                    Manage headline texts, registered office address, phone numbers, email addresses, working hours, and Google Map embed link.
                  </p>
                </div>
                <button
                  onClick={handleSaveContactSettings}
                  style={{
                    background: "var(--primary)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 15px rgba(254,166,3,0.3)"
                  }}
                >
                  💾 Save Contact Page
                </button>
              </div>

              <form onSubmit={handleSaveContactSettings}>
                {/* 1. Hero Header Area */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>✨ 1. Hero Header & Banner Texts</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Top Badge / Tagline</label>
                      <input
                        className="form-input"
                        value={contactSettings.hero_badge || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, hero_badge: e.target.value })}
                        placeholder="Get In Touch"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Main Title / Heading</label>
                      <input
                        className="form-input"
                        value={contactSettings.hero_title || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, hero_title: e.target.value })}
                        placeholder="Contact MotoMax EV"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Subtitle / Supporting Paragraph</label>
                    <textarea
                      rows={2}
                      value={contactSettings.hero_subtitle || ""}
                      onChange={(e) => setContactSettings({ ...contactSettings, hero_subtitle: e.target.value })}
                      placeholder="We're here to help and answer any questions you might have..."
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                {/* 2. Registered Office & CIN */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>📍 2. Registered Office Information</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Company Registered Name</label>
                      <input
                        className="form-input"
                        value={contactSettings.office_company || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, office_company: e.target.value })}
                        placeholder="MotoMax EV Limited"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>CIN Registration Number</label>
                      <input
                        className="form-input"
                        value={contactSettings.office_cin || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, office_cin: e.target.value })}
                        placeholder="CIN: U27101DL2006PLC154820"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Full Street Address (Enter for new lines)</label>
                    <textarea
                      rows={3}
                      value={contactSettings.office_address || ""}
                      onChange={(e) => setContactSettings({ ...contactSettings, office_address: e.target.value })}
                      placeholder="A-53, Naraina Industrial Area&#10;Phase-1, Naraina, Delhi-110028"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                {/* 3. Phone, Hours & Email */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>📞 3. Phone Numbers, Timings & Emails</h4>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Primary Phone</label>
                      <input
                        className="form-input"
                        value={contactSettings.phone_primary || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, phone_primary: e.target.value })}
                        placeholder="+91-11-48224444"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Secondary / Support Phone</label>
                      <input
                        className="form-input"
                        value={contactSettings.phone_secondary || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, phone_secondary: e.target.value })}
                        placeholder="+91-11-48022444"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Office Working Hours</label>
                      <input
                        className="form-input"
                        value={contactSettings.working_hours || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, working_hours: e.target.value })}
                        placeholder="Mon - Fri: 9:00 AM - 6:00 PM"
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Primary Email (General)</label>
                      <input
                        className="form-input"
                        value={contactSettings.email_primary || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, email_primary: e.target.value })}
                        placeholder="info@motomaxev.com"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>Support / Tech Email</label>
                      <input
                        className="form-input"
                        value={contactSettings.email_secondary || ""}
                        onChange={(e) => setContactSettings({ ...contactSettings, email_secondary: e.target.value })}
                        placeholder="support@motomaxev.com"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Google Maps Embed URL */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ margin: "0 0 15px", color: "#1e293b", fontSize: "1.05rem" }}>🗺️ 4. Google Maps Embed Link</h4>
                  
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", marginBottom: "6px" }}>
                      Google Map Embed URL (Paste the "src" from Google Maps Embed iframe)
                    </label>
                    <input
                      className="form-input"
                      value={contactSettings.map_embed_url || ""}
                      onChange={(e) => setContactSettings({ ...contactSettings, map_embed_url: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <small style={{ color: "#64748b", display: "block", marginTop: "6px" }}>
                      Tip: Open Google Maps &gt; Share &gt; Embed a map &gt; Copy only the URL inside <code>src="..."</code>
                    </small>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    type="submit"
                    style={{
                      background: "var(--primary)",
                      color: "#fff",
                      border: "none",
                      padding: "14px 36px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "800",
                      fontSize: "1rem",
                      boxShadow: "0 8px 25px rgba(254,166,3,0.35)"
                    }}
                  >
                    💾 Save Contact Page Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
