import React, { useState, useEffect } from "react";
import "../index.css";

const Admin = () => {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, queries, homepage, blog
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Product State
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [range, setRange] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [editId, setEditId] = useState(null);

  // Queries State (Mocked)
  const [queries] = useState([
    { id: 1, name: "Rahul Kumar", email: "rahul@test.com", message: "I want to bulk order EV chargers for my fleet.", status: "pending", date: "2023-10-04" },
    { id: 2, name: "Sneha Patel", email: "sneha.p@business.in", message: "Quotation needed for 50 Lithium Inverter batteries.", status: "resolved", date: "2023-10-02" },
    { id: 3, name: "Vikram Singh", email: "vikram@logistics.com", message: "Need solar storage batteries for warehouse.", status: "pending", date: "2023-10-05" }
  ]);

  // Home Page Settings State (Mocked)
  const [heroTitle, setHeroTitle] = useState("Powering the Future of Mobility");
  const [heroSub, setHeroSub] = useState("Discover high-performance electric vehicles designed for the modern world.");

  // Blog State (Mocked)
  const [blogs, setBlogs] = useState([
    { id: 1, title: "The Future of Solid-State Batteries in India", category: "Technology", author: "Admin", date: "Oct 01, 2023" },
    { id: 2, title: "MotoMax Unveils New High-Speed EV Charger", category: "Company News", author: "Admin", date: "Sep 28, 2023" }
  ]);

  // Chart Data (Mocked)
  const chartData = [
    { day: "Mon", traffic: 45 },
    { day: "Tue", traffic: 80 },
    { day: "Wed", traffic: 65 },
    { day: "Thu", traffic: 100 }, // Peak
    { day: "Fri", traffic: 85 },
    { day: "Sat", traffic: 40 },
    { day: "Sun", traffic: 60 }
  ];

  const fetchProducts = () => {
    fetch("http://localhost/php-backend/api/products.php")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success") {
          setProducts(json.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    const productData = { name, price, range, image, video };
    const method = editId ? "PUT" : "POST";
    const body = editId ? { id: editId, ...productData } : productData;

    fetch("http://localhost/php-backend/api/products.php", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert(`Product ${editId ? "Updated" : "Added"} Successfully!`);
          resetForm();
          fetchProducts();
        }
      });
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setRange("");
    setImage("");
    setVideo("");
  };

  const handleEditClick = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setRange(p.range || "");
    setImage(p.image);
    setVideo(p.video || "");
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost/php-backend/api/products.php?id=${id}`, {
        method: "DELETE",
      }).then(() => fetchProducts());
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="premium-login-wrap">
        <style>
          {`
            .premium-login-wrap {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
              font-family: 'Inter', sans-serif;
              padding: 20px;
            }
            .premium-login-card {
              background: #ffffff;
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
              width: 100%;
              max-width: 400px;
              text-align: center;
              animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes slideUp {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .premium-login-card h2 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
            .premium-input { width: 100%; padding: 14px 16px; margin-bottom: 20px; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 10px; font-size: 1rem; transition: all 0.3s ease; box-sizing: border-box; }
            .premium-input:focus { background: #fff; border-color: #ff6600; box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1); outline: none; }
            .premium-btn { width: 100%; padding: 14px; background: #ff6600; color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; }
            .premium-btn:hover { background: #e65c00; }
          `}
        </style>
        <div className="premium-login-card">
          <h2>Admin Portal</h2>
          <p style={{ color: "#64748b", marginBottom: "30px", fontWeight: 500 }}>Sign in to manage MotoMax</p>
          <form onSubmit={handleLogin}>
            <input className="premium-input" type="text" placeholder="Username" required />
            <input className="premium-input" type="password" placeholder="Password" required />
            <button className="premium-btn" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const pendingQueries = queries.filter(q => q.status === 'pending').length;

  return (
    <div className="admin-layout">
      <style>
        {`
          .admin-layout { display: flex; min-height: 100vh; background: #f1f5f9; font-family: 'Inter', sans-serif; color: #0f172a; }
          
          /* SIDEBAR */
          .admin-sidebar { width: 260px; background: #0f172a; color: #fff; display: flex; flex-direction: column; position: fixed; height: 100vh; z-index: 100; transition: transform 0.3s ease; }
          .sidebar-header { padding: 24px; font-size: 1.5rem; font-weight: 900; border-bottom: 1px solid rgba(255,255,255,0.1); color: #ff6600; letter-spacing: 0.5px; }
          .sidebar-menu { display: flex; flex-direction: column; padding: 20px 0; flex: 1; }
          .menu-item { padding: 16px 24px; display: flex; align-items: center; gap: 12px; font-size: 1rem; font-weight: 500; color: #94a3b8; cursor: pointer; transition: all 0.2s; border-left: 4px solid transparent; }
          .menu-item:hover { color: #fff; background: rgba(255,255,255,0.05); }
          .menu-item.active { color: #fff; background: rgba(255,102,0,0.1); border-left-color: #ff6600; }
          .sidebar-footer { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.1); }
          .logout-btn { width: 100%; padding: 12px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
          .logout-btn:hover { background: #ef4444; color: #fff; }

          /* MAIN CONTENT */
          .admin-main { flex: 1; margin-left: 260px; display: flex; flex-direction: column; min-height: 100vh; }
          .top-header { background: #fff; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 40; }
          .page-title { font-size: 1.2rem; font-weight: 700; color: #1e293b; }
          .mobile-toggle { display: none; background: transparent; border: none; cursor: pointer; color: #0f172a; }
          .content-wrapper { padding: 30px 5%; flex: 1; }

          /* CARDS */
          .admin-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03); border: 1px solid #e2e8f0; margin-bottom: 24px; }
          .card-title { font-size: 1.15rem; font-weight: 700; color: #0f172a; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }

          /* DASHBOARD STATS */
          .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; transition: transform 0.3s ease; }
          .stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.06); }
          .stat-icon { width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
          .icon-orange { background: #fff7ed; color: #ff6600; }
          .icon-green { background: #f0fdf4; color: #16a34a; }
          .icon-blue { background: #eff6ff; color: #2563eb; }
          .icon-purple { background: #faf5ff; color: #9333ea; }
          .stat-details h4 { color: #64748b; font-size: 0.9rem; font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
          .stat-details .value { color: #0f172a; font-size: 1.8rem; font-weight: 800; }

          /* CSS BAR CHART */
          .css-chart-container { display: flex; align-items: flex-end; gap: 15px; height: 250px; padding: 20px 0; border-bottom: 2px solid #f1f5f9; }
          .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 10px; }
          .bar { width: 100%; max-width: 40px; background: linear-gradient(180deg, #ff6600 0%, #ff984d 100%); border-radius: 6px 6px 0 0; transition: height 0.5s ease; cursor: pointer; position: relative; }
          .bar:hover { filter: brightness(1.1); }
          .bar:hover::after { content: attr(data-val); position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: #1e293b; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
          .bar-label { font-size: 0.85rem; font-weight: 600; color: #64748b; }

          /* FORMS */
          .form-group { margin-bottom: 16px; }
          .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: #475569; margin-bottom: 8px; }
          .form-input { width: 100%; padding: 12px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; font-size: 0.95rem; transition: border-color 0.2s; box-sizing: border-box; }
          .form-input:focus { border-color: #ff6600; outline: none; box-shadow: 0 0 0 3px rgba(255,102,0,0.1); }
          .btn-primary { background: #ff6600; color: #fff; padding: 12px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; transition: all 0.2s; }
          .btn-primary:hover { background: #e65c00; }
          .btn-secondary { background: transparent; color: #64748b; padding: 12px 20px; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; margin-top: 10px; }

          /* TABLE */
          .table-container { overflow-x: auto; }
          .admin-table { width: 100%; border-collapse: collapse; min-width: 600px; }
          .admin-table th { background: #f8fafc; padding: 14px; text-align: left; font-size: 0.85rem; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0; }
          .admin-table td { padding: 14px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; font-size: 0.95rem; }
          .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
          .badge.resolved { background: #dcfce7; color: #166534; }
          .badge.pending { background: #fef9c3; color: #854d0e; }

          /* GRIDS */
          .grid-2col { display: grid; grid-template-columns: 1fr 2fr; gap: 24px; align-items: start; }
          .grid-cms { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .grid-queries { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

          /* RESPONSIVE */
          @media (max-width: 1024px) { .grid-2col { grid-template-columns: 1fr 1fr; } }
          @media (max-width: 800px) {
            .admin-sidebar { transform: translateX(-100%); }
            .admin-sidebar.open { transform: translateX(0); }
            .admin-main { margin-left: 0; }
            .mobile-toggle { display: block; }
            .grid-2col, .grid-cms { grid-template-columns: 1fr !important; }
            .content-wrapper { padding: 20px; }
          }
        `}
      </style>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">MotoMax Admin</div>
        <div className="sidebar-menu">
          <div className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </div>
          <div className={`menu-item ${activeTab === "products" ? "active" : ""}`} onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 16V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v9a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 20 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Inventory
          </div>
          <div className={`menu-item ${activeTab === "queries" ? "active" : ""}`} onClick={() => { setActiveTab("queries"); setIsSidebarOpen(false); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Inquiries
            {pendingQueries > 0 && <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>{pendingQueries}</span>}
          </div>
          <div className={`menu-item ${activeTab === "blog" ? "active" : ""}`} onClick={() => { setActiveTab("blog"); setIsSidebarOpen(false); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            Blog & News
          </div>
          <div className={`menu-item ${activeTab === "homepage" ? "active" : ""}`} onClick={() => { setActiveTab("homepage"); setIsSidebarOpen(false); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Site Content
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Sign Out</button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 90 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <header className="top-header">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="page-title" style={{ textTransform: "capitalize" }}>
              {activeTab === 'homepage' ? 'Website Configuration' : activeTab === 'blog' ? 'Blog Manager' : activeTab}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: "#ff6600", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>A</div>
          </div>
        </header>

        <div className="content-wrapper">

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div>
              <h2 style={{ fontSize: "1.8rem", color: "#0f172a", marginBottom: "25px", fontWeight: 800 }}>Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon icon-orange">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 16V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v9a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 20 16z"></path></svg>
                  </div>
                  <div className="stat-details">
                    <h4>Total Products</h4>
                    <div className="value">{totalProducts}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-purple">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                  <div className="stat-details">
                    <h4>Total Inquiries</h4>
                    <div className="value">{queries.length}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-blue">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <div className="stat-details">
                    <h4>Pending Action</h4>
                    <div className="value" style={{ color: pendingQueries > 0 ? "#ef4444" : "#0f172a" }}>{pendingQueries}</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-green">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  </div>
                  <div className="stat-details">
                    <h4>Web Traffic</h4>
                    <div className="value">14.2K</div>
                  </div>
                </div>
              </div>

              {/* ANALYTICS CHART */}
              <div className="admin-card">
                <h3 className="card-title">Weekly Website Traffic</h3>
                <div className="css-chart-container">
                  {chartData.map((data, index) => (
                    <div className="bar-wrapper" key={index}>
                      <div className="bar" style={{ height: `${data.traffic}%` }} data-val={data.traffic + 'k'}></div>
                      <span className="bar-label">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BLOG TAB (NEW) */}
          {activeTab === "blog" && (
            <div className="grid-2col">
              <div className="admin-card" style={{ position: "sticky", top: "100px" }}>
                <h3 className="card-title">Publish New Post</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Blog post published!"); }}>
                  <div className="form-group">
                    <label className="form-label">Article Title</label>
                    <input className="form-input" type="text" placeholder="e.g. Future of EV in India" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input">
                      <option>Company News</option>
                      <option>Technology</option>
                      <option>Sustainability</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cover Image URL</label>
                    <input className="form-input" type="url" placeholder="https://..." required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Article Content (Markdown)</label>
                    <textarea className="form-input" style={{ minHeight: "150px" }} placeholder="Write your article here..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Publish Article</button>
                </form>
              </div>

              <div className="admin-card">
                <h3 className="card-title">Published Articles</h3>
                <div className="table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id}>
                          <td style={{ fontWeight: 600 }}>{b.title}</td>
                          <td><span className="badge resolved" style={{ background: "#f1f5f9", color: "#475569" }}>{b.category}</span></td>
                          <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{b.date}</td>
                          <td>
                            <button style={{ background: "transparent", border: "none", color: "#3b82f6", fontWeight: 600, cursor: "pointer", marginRight: "10px" }}>Edit</button>
                            <button style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* INVENTORY TAB */}
          {activeTab === "products" && (
            <div className="grid-2col">
              <div className="admin-card" style={{ position: "sticky", top: "100px" }}>
                <h3 className="card-title">{editId ? "Update Product" : "Add New Product"}</h3>
                <form onSubmit={handleAddOrUpdateProduct}>
                  <div className="form-group"><label className="form-label">Product Name</label><input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Price</label><input className="form-input" type="text" value={price} onChange={(e) => setPrice(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Specifications / Range</label><input className="form-input" type="text" value={range} onChange={(e) => setRange(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Image URL</label><input className="form-input" type="url" value={image} onChange={(e) => setImage(e.target.value)} required /></div>
                  <div className="form-group"><label className="form-label">Video URL (Optional)</label><input className="form-input" type="url" value={video} onChange={(e) => setVideo(e.target.value)} /></div>
                  <button type="submit" className="btn-primary">{editId ? "Save Changes" : "Add Product"}</button>
                  {editId && <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>}
                </form>
              </div>

              <div className="admin-card">
                <h3 className="card-title">Live Directory</h3>
                <div className="table-container">
                  <table className="admin-table">
                    <thead><tr><th>Product</th><th>Price</th><th>Actions</th></tr></thead>
                    <tbody>
                      {products.length > 0 ? products.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <img src={p.image} alt="" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                              <div><div style={{ fontWeight: 600, color: "#1e293b" }}>{p.name}</div><div style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.range}</div></div>
                            </div>
                          </td>
                          <td style={{ fontWeight: 600 }}>{p.price}</td>
                          <td>
                            <button onClick={() => handleEditClick(p)} style={{ background: "transparent", border: "none", color: "#3b82f6", fontWeight: 600, cursor: "pointer", marginRight: "10px" }}>Edit</button>
                            <button onClick={() => handleDelete(p.id)} style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: 600, cursor: "pointer" }}>Delete</button>
                          </td>
                        </tr>
                      )) : <tr><td colSpan="3" style={{ textAlign: "center", padding: "20px", color: "#94a3b8" }}>No products found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* INQUIRIES TAB */}
          {activeTab === "queries" && (
            <div className="grid-queries">
              {queries.map((q) => (
                <div key={q.id} className="admin-card" style={{ position: "relative" }}>
                  <span className={`badge ${q.status}`} style={{ position: "absolute", top: "24px", right: "24px" }}>{q.status}</span>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{q.name}</h4>
                  <a href={`mailto:${q.email}`} style={{ color: "#ff6600", textDecoration: "none", fontSize: "0.9rem" }}>{q.email}</a>
                  <p style={{ margin: "15px 0", color: "#475569", lineHeight: "1.5" }}>"{q.message}"</p>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Date: {q.date}</div>
                </div>
              ))}
            </div>
          )}

          {/* CMS TAB */}
          {activeTab === "homepage" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="admin-card"><h3 className="card-title">Home Page Hero</h3><div className="grid-cms"><div className="form-group"><label className="form-label">Hero Title</label><input className="form-input" type="text" defaultValue={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} /></div><div className="form-group"><label className="form-label">Background Image URL</label><input className="form-input" type="text" defaultValue="/assets/scooter-hero-bg.jpg" /></div><div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Hero Subtitle</label><textarea className="form-input" defaultValue={heroSub} onChange={(e) => setHeroSub(e.target.value)} style={{ minHeight: "80px" }} /></div></div></div>
              <div className="admin-card"><h3 className="card-title">About Us Section</h3><div className="grid-cms"><div className="form-group" style={{ gridColumn: "1 / -1" }}><label className="form-label">Company Description</label><textarea className="form-input" defaultValue="MotoMax EV is pioneering sustainable energy..." style={{ minHeight: "100px" }} /></div><div className="form-group"><label className="form-label">Mission Statement</label><input className="form-input" type="text" defaultValue="Accelerating the transition to sustainable energy." /></div><div className="form-group"><label className="form-label">Primary Image URL</label><input className="form-input" type="url" defaultValue="/assets/sustainable_ev_fleet.jpg" /></div></div></div>
              <div className="admin-card"><h3 className="card-title">Global Settings</h3><div className="grid-cms"><div className="form-group"><label className="form-label">Support Email</label><input className="form-input" type="email" defaultValue="info@motomaxev.com" /></div><div className="form-group"><label className="form-label">Contact Number</label><input className="form-input" type="text" defaultValue="+91 98765 43210" /></div></div><button className="btn-primary" style={{ marginTop: "10px", width: "auto", padding: "12px 30px" }} onClick={() => alert("CMS settings saved!")}>Save All Changes</button></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
