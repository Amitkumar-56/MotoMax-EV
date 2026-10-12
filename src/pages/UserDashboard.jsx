import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";

import Overview from './dashboard/Overview';
import Profile from './dashboard/Profile';
import Orders from './dashboard/Orders';

import Wishlist from './dashboard/Wishlist';
import Cart from './dashboard/Cart';
import Addresses from './dashboard/Addresses';

import Password from './dashboard/Password';

const API_BASE = "http://localhost/assinment/php-backend/api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("authUser")));

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const urlParams = new URLSearchParams(location.search);
  const initialTab = urlParams.get('tab') || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [profileData, setProfileData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email, password: "" });
      fetch(`${API_BASE}/user.php?user_id=${user.id}&action=inquiries`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setInquiries(data.data || []);
          }
        });
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/user.php?user_id=${user.id}&action=update_profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.status === "success") {
          const updatedUser = { ...user, name: data.user.name, email: data.user.email };
          setUser(updatedUser);
          localStorage.setItem("authUser", JSON.stringify(updatedUser));
          setProfileData({ ...profileData, password: "" });
        }
      });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const action = isLoginMode ? "login" : "register";

    fetch(`${API_BASE}/auth.php?action=${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          if (isLoginMode) {
            if (data.user.role === 'admin') {
              // Admin shouldn't log in here usually, but if they do, redirect to admin
              localStorage.setItem("adminLoggedIn", "true");
              navigate("/admin");
            } else {
              localStorage.setItem("authUser", JSON.stringify(data.user));
              setUser(data.user);
              window.dispatchEvent(new Event("authUpdated"));
            }
          } else {
            alert("Registration successful! Please login.");
            setIsLoginMode(true);
          }
        } else {
          alert(data.message);
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    window.dispatchEvent(new Event("authUpdated"));
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background Image & Overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.6) blur(3px)", zIndex: -2 }}></div>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(254,166,3,0.3) 0%, rgba(0,0,0,0.7) 100%)", zIndex: -1 }}></div>

        <style>
          {`
            .glass-auth-card {
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(25px);
              border-radius: 30px;
              padding: 50px;
              width: 100%;
              max-width: 450px;
              box-shadow: 0 30px 60px rgba(0,0,0,0.2);
              border: 1px solid rgba(255,255,255,0.4);
              margin: 20px;
              animation: fadeInUp 0.6s ease-out;
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .glass-input {
              width: 100%; padding: 16px 20px; border-radius: 14px;
              border: 1px solid rgba(0,0,0,0.1); margin-bottom: 20px; font-size: 1.05rem;
              background: #fff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
              transition: all 0.3s ease; color: #333;
            }
            .glass-input:focus {
              border-color: #FEA603; outline: none; box-shadow: 0 0 0 4px rgba(254,166,3,0.15);
            }
            .glass-btn {
              width: 100%; background: #FEA603; color: #fff; padding: 16px; border-radius: 14px;
              border: none; font-size: 1.15rem; font-weight: 800; cursor: pointer;
              transition: all 0.3s; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;
            }
            .glass-btn:hover {
              background: #e65c00; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(254,166,3,0.4);
            }
            .glass-switch {
              text-align: center; margin-top: 25px; color: #666; font-size: 1rem; cursor: pointer;
            }
            .glass-switch span { color: #FEA603; font-weight: 800; text-decoration: none; transition: color 0.3s; }
            .glass-switch span:hover { color: #cc5200; text-decoration: underline; }
          `}
        </style>

        <div className="glass-auth-card">
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div style={{ display: "inline-block", padding: "15px", background: "rgba(254,166,3,0.1)", borderRadius: "20px", marginBottom: "15px" }}>
              <span style={{ fontSize: "2.5rem" }}>⚡</span>
            </div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#111", margin: "0 0 5px 0" }}>{isLoginMode ? "Welcome Back" : "Join MotoMax"}</h2>
            <p style={{ color: "#666", fontSize: "1.05rem", margin: 0 }}>Access your personalized EV portal</p>
          </div>

          <form onSubmit={handleAuth}>
            {!isLoginMode && (
              <input type="text" className="glass-input" placeholder="Your Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            )}
            <input type="email" className="glass-input" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" className="glass-input" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />

            <button type="submit" className="glass-btn">{isLoginMode ? "Sign In" : "Register"}</button>
          </form>

          <div className="glass-switch" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? <>Don't have an account? <span>Sign up</span></> : <>Already have an account? <span>Sign in</span></>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex" }}>
      <style>
        {`
          .dash-sidebar {
            width: 280px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); min-height: 100vh;
            border-right: 1px solid rgba(0,0,0,0.05); padding: 40px 0;
            display: flex; flex-direction: column; color: #fff;
            position: sticky; top: 0; box-shadow: 4px 0 20px rgba(0,0,0,0.02);
            z-index: 10;
          }
          .sidebar-header { padding: 32px 24px; font-size: 1.3rem; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); letter-spacing: 0.5px; position: sticky; top: 0; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); z-index: 20; }
          .sidebar-header span { color: #FEA603; margin-left: 5px; font-size: 0.9rem; vertical-align: middle; }
          .close-sidebar { display: none; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; transition: transform 0.2s; }
          .close-sidebar:hover { transform: scale(1.1); color: #FEA603; }
          .dash-main {
            flex: 1; padding: 50px; max-width: 1400px; margin: 0 auto;
          }
          .sidebar-nav {
            display: flex; flex-direction: column; padding: 20px 15px; gap: 8px;
          }
          .sidebar-item {
            padding: 14px 20px; border-radius: 12px; color: #94a3b8;
            font-weight: 600; font-size: 0.95rem; cursor: pointer;
            display: flex; alignItems: center; gap: 12px; transition: all 0.3s ease;
          }
          .sidebar-item:hover { background: rgba(255,255,255,0.06); color: #fff; transform: translateX(5px); }
          .sidebar-item.active { background: linear-gradient(90deg, rgba(254,166,3,0.15) 0%, rgba(254,166,3,0.05) 100%); color: #FEA603; border-left: 4px solid #FEA603; box-shadow: inset 0 0 20px rgba(254,166,3,0.05); transform: none; border-radius: 8px; }
            
            .dash-header {
              background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px);
              border-radius: 24px; padding: 30px 40px; margin-bottom: 40px;
              display: flex; justify-content: space-between; alignItems: center;
              box-shadow: 0 10px 40px rgba(0,0,0,0.04); border: 1px solid rgba(255,255,255,0.5);
              position: sticky; top: 20px; z-index: 100;
            }
            
            .dash-card {
              background: #fff; border-radius: 24px; padding: 40px;
              box-shadow: 0 15px 50px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.02);
              margin-bottom: 40px; transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .dash-card:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.06); }
            
            .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; margin-bottom: 40px; }
            
            .mobile-dash-topbar { display: none; }
            .sidebar-mobile-header { display: none; }
            .sidebar-close-btn { display: none; }
            
            @media (max-width: 900px) {
              .dash-sidebar {
                position: fixed;
                left: -100%;
                top: 0;
                height: 100vh;
                padding: 0;
                overflow-y: auto;
                z-index: 1000;
                transition: left 0.3s ease;
                box-shadow: 10px 0 30px rgba(0,0,0,0.1);
              }
              .sidebar-header { padding-top: 50px; }
              .dash-sidebar.open { left: 0; }
              .dash-main { padding: 20px; margin-left: 0; }
              .mobile-dash-topbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                padding: 20px 5%;
                box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                position: sticky;
                top: 0;
                z-index: 90;
                border-bottom: 1px solid rgba(0,0,0,0.03);
              }
              .close-sidebar { display: block; }
              .dash-header { display: none; }
            }
            .stat-box { 
              background: #fff; padding: 30px; border-radius: 20px; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); 
              display: flex; align-items: center; justify-content: space-between; 
              transition: all 0.3s ease; position: relative; overflow: hidden;
            }
            .stat-box::after { content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle, rgba(254,166,3,0.1) 0%, transparent 70%); border-radius: 50%; transform: translate(30%, -30%); }
            .stat-box:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(254,166,3,0.08); border-color: rgba(254,166,3,0.2); }
            .stat-box h4 { color: #64748b; font-size: 0.95rem; margin-bottom: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
            .stat-box h2 { color: #1e293b; font-size: 2.2rem; font-weight: 900; margin: 0; letter-spacing: -1px; }
            .stat-icon { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; background: rgba(254,166,3,0.1); color: #FEA603; }
            
            .dash-input { width: 100%; padding: 16px 24px; border-radius: 16px; border: 1px solid #e2e8f0; margin-bottom: 24px; font-size: 1rem; transition: all 0.3s; background: #f8fafc; color: #1e293b; }
            .dash-input:focus { outline: none; border-color: #FEA603; background: #fff; box-shadow: 0 0 0 4px rgba(254,166,3,0.15); transform: translateY(-2px); }
            .dash-btn { background: linear-gradient(135deg, #FEA603 0%, #ff7b00 100%); color: #fff; padding: 16px 32px; border-radius: 16px; border: none; font-weight: 800; font-size: 1.05rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); display: inline-block; text-decoration: none; box-shadow: 0 8px 20px rgba(254,166,3,0.3); }
            .dash-btn:hover { background: linear-gradient(135deg, #ff9900 0%, #e65c00 100%); transform: translateY(-3px); box-shadow: 0 12px 25px rgba(254,166,3,0.4); }
            
            .empty-state { text-align: center; padding: 80px 20px; background: rgba(248, 250, 252, 0.5); border-radius: 24px; border: 2px dashed #e2e8f0; }
            .empty-state-icon { font-size: 5rem; color: #cbd5e1; margin-bottom: 25px; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.05)); }
            .empty-state h3 { font-size: 1.8rem; font-weight: 900; color: #1e293b; margin-bottom: 12px; letter-spacing: -0.5px; }
            .empty-state p { color: #64748b; max-width: 450px; margin: 0 auto 35px; line-height: 1.7; font-size: 1.05rem; }
          `}
        </style>

        <div className={`dash-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div>{user.name.split(' ')[0]}<span>User</span></div>
            <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>

          <div className="sidebar-nav">
          {[
            { id: 'overview', icon: '🏠', label: 'Dashboard' },
            { id: 'profile', icon: '👤', label: 'My Profile' },
            { id: 'orders', icon: '📦', label: 'My Orders' },

            { id: 'wishlist', icon: '❤️', label: 'My Wishlist' },
            { id: 'cart', icon: '🛒', label: 'My Cart' },
            { id: 'addresses', icon: '🗺️', label: 'My Addresses' },



            { id: 'password', icon: '🔒', label: 'Change Password' }
          ].map(item => (
            <div key={item.id} className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}>
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span> {item.label}
            </div>
          ))}

          <div className="sidebar-item" style={{ color: "#ef4444", marginTop: "20px" }} onClick={handleLogout}>
            <span style={{ fontSize: "1.2rem" }}>🚪</span> Logout
          </div>
        </div>
      </div>

      <div className="dash-main">
        {/* Mobile Topbar */}
        <div className="mobile-dash-topbar">
          <button onClick={() => setIsSidebarOpen(true)} style={{ background: "none", border: "none", fontSize: "1.8rem", cursor: "pointer", color: "#333" }}>☰</button>
          <div style={{ fontWeight: 800, fontSize: "1.2rem", textTransform: "capitalize", color: "#FEA603" }}>{activeTab}</div>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#FEA603", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
            {user.name.charAt(0)}
          </div>
        </div>

        <div className="dash-header">
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
          </h1>
        </div>

        {activeTab === 'overview' && <Overview user={user} inquiries={inquiries} />}
        {activeTab === 'profile' && <Profile profileData={profileData} setProfileData={setProfileData} handleUpdateProfile={handleUpdateProfile} />}
        {activeTab === 'orders' && <Orders />}

        {activeTab === 'wishlist' && <Wishlist />}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'addresses' && <Addresses />}



        {activeTab === 'password' && <Password profileData={profileData} setProfileData={setProfileData} handleUpdateProfile={handleUpdateProfile} />}

      </div>
    </div>
  );
};

export default UserDashboard;
