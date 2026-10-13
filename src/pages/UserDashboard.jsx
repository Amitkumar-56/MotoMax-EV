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
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccessMsg, setAuthSuccessMsg] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

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
    setAuthError("");
    setAuthSuccessMsg("");
    setAuthLoading(true);
    const action = isLoginMode ? "user_login" : "register";

    fetch(`${API_BASE}/auth.php?action=${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        expected_role: isLoginMode ? "user" : undefined
      })
    })
      .then(res => res.json())
      .then(data => {
        setAuthLoading(false);
        if (data.status === "success") {
          if (isLoginMode) {
            // Strict role check: user portal is for 'user' role only
            if (data.user && data.user.role !== 'user') {
              setAuthError("Is account ka role 'admin' hai. User panel me sirf 'user' role wale login kar sakte hain. Kripya Admin Portal (/admin) par jayein.");
              return;
            }
            localStorage.setItem("authUser", JSON.stringify(data.user));
            setUser(data.user);
            window.dispatchEvent(new Event("authUpdated"));
          } else {
            setAuthSuccessMsg("Account created successfully! Please sign in.");
            setIsLoginMode(true);
            setFormData({ name: "", email: formData.email, password: "" });
          }
        } else {
          setAuthError(data.message || "Authentication failed. Please check your credentials.");
        }
      })
      .catch(err => {
        setAuthLoading(false);
        setAuthError("Unable to connect to the server. Please check your internet connection.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    window.dispatchEvent(new Event("authUpdated"));
  };

  if (!user) {
    return (
      <div className="login-screen-wrapper">
        <style>
          {`
            .login-screen-wrapper {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #070a12;
              padding: 24px 16px;
              position: relative;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              overflow-x: hidden;
            }
            .login-mesh-bg {
              position: absolute;
              inset: 0;
              background: 
                radial-gradient(circle at 15% 20%, rgba(254, 166, 3, 0.15) 0%, transparent 45%),
                radial-gradient(circle at 85% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 60%);
              pointer-events: none;
            }
            .login-grid-overlay {
              position: absolute;
              inset: 0;
              background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
              background-size: 40px 40px;
              pointer-events: none;
            }
            .login-container-card {
              display: flex;
              width: 100%;
              max-width: 1120px;
              min-height: 680px;
              background: rgba(15, 23, 42, 0.85);
              border-radius: 28px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(20px);
              overflow: hidden;
              box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(254, 166, 3, 0.1);
              z-index: 2;
            }
            /* Left Brand Side - Pure Full Image (50% Equal Half) */
            .login-brand-panel {
              flex: 1 1 50%;
              width: 50%;
              max-width: 50%;
              padding: 0;
              margin: 0;
              position: relative;
              overflow: hidden;
              background: #090e17;
              display: flex;
              border-right: 1px solid rgba(255, 255, 255, 0.08);
            }
            .login-brand-full-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
              transition: transform 0.6s ease;
            }
            .login-brand-panel:hover .login-brand-full-img {
              transform: scale(1.03);
            }
            /* Right Form Side (50% Equal Half) */
            .login-form-panel {
              flex: 1 1 50%;
              width: 50%;
              max-width: 50%;
              background: #ffffff;
              padding: 44px 50px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-sizing: border-box;
            }
            .auth-tab-switch {
              display: flex;
              background: #f1f5f9;
              padding: 4px;
              border-radius: 14px;
              margin-bottom: 24px;
            }
            .auth-tab-btn {
              flex: 1;
              padding: 11px 0;
              border: none;
              background: transparent;
              font-size: 0.95rem;
              font-weight: 700;
              color: #64748b;
              border-radius: 10px;
              cursor: pointer;
              transition: all 0.25s ease;
            }
            .auth-tab-btn.active {
              background: #ffffff;
              color: #0f172a;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
            }
            .social-auth-btn {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              padding: 12px 16px;
              border: 1.5px solid #e2e8f0;
              border-radius: 12px;
              background: #ffffff;
              color: #1e293b;
              font-size: 0.92rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .social-auth-btn:hover {
              background: #f8fafc;
              border-color: #cbd5e1;
              transform: translateY(-1px);
            }
            .auth-divider {
              display: flex;
              align-items: center;
              margin: 20px 0;
              color: #94a3b8;
              font-size: 0.8rem;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .auth-divider::before, .auth-divider::after {
              content: '';
              flex: 1;
              height: 1px;
              background: #e2e8f0;
            }
            .auth-divider span {
              padding: 0 12px;
            }
            .form-input-group {
              margin-bottom: 16px;
            }
            .form-input-label {
              display: block;
              font-size: 0.84rem;
              font-weight: 600;
              color: #334155;
              margin-bottom: 6px;
            }
            .form-input-wrapper {
              position: relative;
              display: flex;
              align-items: center;
            }
            .form-input-icon {
              position: absolute;
              left: 14px;
              font-size: 1.05rem;
              color: #94a3b8;
              pointer-events: none;
            }
            .modern-auth-input {
              width: 100%;
              padding: 13px 14px 13px 44px;
              font-size: 0.95rem;
              color: #0f172a;
              background: #f8fafc;
              border: 1.5px solid #e2e8f0;
              border-radius: 12px;
              transition: all 0.2s ease;
              box-sizing: border-box;
            }
            .modern-auth-input:focus {
              outline: none;
              background: #ffffff;
              border-color: #fea603;
              box-shadow: 0 0 0 4px rgba(254, 166, 3, 0.15);
            }
            .pw-toggle-btn {
              position: absolute;
              right: 12px;
              background: none;
              border: none;
              cursor: pointer;
              font-size: 1.1rem;
              color: #94a3b8;
              padding: 4px;
            }
            .submit-auth-btn {
              width: 100%;
              padding: 14px;
              background: linear-gradient(135deg, #fea603 0%, #f59e0b 50%, #e65c00 100%);
              color: #ffffff;
              border: none;
              border-radius: 12px;
              font-size: 1.02rem;
              font-weight: 700;
              letter-spacing: 0.3px;
              cursor: pointer;
              box-shadow: 0 8px 22px rgba(254, 166, 3, 0.35);
              transition: all 0.25s ease;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              margin-top: 14px;
            }
            .submit-auth-btn:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 12px 28px rgba(254, 166, 3, 0.45);
            }
            .submit-auth-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            .auth-back-link {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              color: #64748b;
              font-size: 0.85rem;
              font-weight: 600;
              text-decoration: none;
              transition: color 0.2s;
            }
            .auth-back-link:hover {
              color: #fea603;
            }
            @media (max-width: 960px) {
              .login-container-card {
                flex-direction: column;
                max-width: 500px;
              }
              .login-brand-panel {
                flex: none;
                width: 100%;
                max-width: 100%;
                height: 250px;
                border-right: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              }
              .login-form-panel {
                flex: none;
                width: 100%;
                max-width: 100%;
                padding: 32px 24px;
              }
            }
          `}
        </style>

        {/* Ambient Decorative Background */}
        <div className="login-mesh-bg"></div>
        <div className="login-grid-overlay"></div>

        <div className="login-container-card">
          {/* Left / Pure Full Image Side */}
          <div className="login-brand-panel">
            <img
              src="/assets/login-hero.jpg"
              alt="MotoMax EV Mobility"
              className="login-brand-full-img"
              onError={(e) => {
                e.target.src = "/assets/slider-1.jpg";
              }}
            />
          </div>

          {/* Right / Authentication Form Side */}
          <div className="login-form-panel">
            <div style={{ marginBottom: "20px" }}>
              <a href="/" className="auth-back-link">
                ← Return to Store
              </a>
            </div>

            {/* Segmented Switcher */}
            <div className="auth-tab-switch">
              <button
                type="button"
                className={`auth-tab-btn ${isLoginMode ? "active" : ""}`}
                onClick={() => {
                  setIsLoginMode(true);
                  setAuthError("");
                  setAuthSuccessMsg("");
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${!isLoginMode ? "active" : ""}`}
                onClick={() => {
                  setIsLoginMode(false);
                  setAuthError("");
                  setAuthSuccessMsg("");
                }}
              >
                Create Account
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 800, color: "#0f172a", margin: "0 0 5px 0", letterSpacing: "-0.5px" }}>
                {isLoginMode ? "Welcome Back" : "Create Member Account"}
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.88rem", margin: 0 }}>
                {isLoginMode
                  ? "Sign in to track orders, manage addresses & checkout faster."
                  : "Join MotoMax today for instant access to member-only pricing."}
              </p>
            </div>

            {/* Inline Error Banner */}
            {authError && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#b91c1c",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span>⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Inline Success Banner */}
            {authSuccessMsg && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#15803d",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontSize: "0.85rem",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span>✓</span>
                <span>{authSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAuth}>
              {!isLoginMode && (
                <div className="form-input-group">
                  <label className="form-input-label">Full Name</label>
                  <div className="form-input-wrapper">
                    <span className="form-input-icon">👤</span>
                    <input
                      type="text"
                      className="modern-auth-input"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-input-group">
                <label className="form-input-label">Email Address</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">✉️</span>
                  <input
                    type={isLoginMode ? "text" : "email"}
                    className="modern-auth-input"
                    placeholder={isLoginMode ? "Email address or Admin ID" : "name@example.com"}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-input-group">
                <label className="form-input-label">Password</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="modern-auth-input"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="pw-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {isLoginMode && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                  <input type="checkbox" id="rememberMe" style={{ accentColor: "#fea603", cursor: "pointer" }} defaultChecked />
                  <label htmlFor="rememberMe" style={{ fontSize: "0.82rem", color: "#64748b", cursor: "pointer" }}>
                    Remember me on this device
                  </label>
                </div>
              )}

              <button type="submit" className="submit-auth-btn" disabled={authLoading}>
                {authLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>{isLoginMode ? "Sign In to MotoMax Portal" : "Complete Registration"}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "20px", fontSize: "0.88rem", color: "#64748b" }}>
              {isLoginMode ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      setIsLoginMode(false);
                      setAuthError("");
                      setAuthSuccessMsg("");
                    }}
                    style={{ color: "#fea603", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
                  >
                    Sign up now
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span
                    onClick={() => {
                      setIsLoginMode(true);
                      setAuthError("");
                      setAuthSuccessMsg("");
                    }}
                    style={{ color: "#fea603", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
                  >
                    Sign in here
                  </span>
                </>
              )}
            </div>

            <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", color: "#94a3b8", fontSize: "0.72rem" }}>
              <span>🔒 256-Bit SSL Encrypted</span>
              <span>•</span>
              <span>100% Data Privacy</span>
            </div>
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
