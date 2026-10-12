import React, { useState, useEffect } from "react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

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

  const [productPage, setProductPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
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

  // Blogs
  const [blogs, setBlogs] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("Company News");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Settings (Images and Text)
  const [settings, setSettings] = useState({
    heroImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7",
    aboutImage: "https://images.unsplash.com/photo-1620802051779-11f4d1dd4b2a",
    contactImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
    heroTitle: "Powering the Future of Mobility",
    homepage_slider: JSON.stringify([
      { type: "video", src: "/assets/home-video.mp4" },
      { type: "image", src: "/assets/1.png", title: "INDIA'S LEADING ENERGY TECHNOLOGY COMPANY", subtitle: "Pioneering the EV Revolution Across the Globe" }
    ], null, 2)
  });

  // Gallery
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("General");
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);

  // Profile
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  const fetchBlogs = () => {
    fetch(`${API_BASE}/blogs.php`)
      .then((res) => res.json())
      .then((data) => setBlogs(data || []));
  };

  const fetchOrders = () => {
    fetch(`${API_BASE}/orders.php?admin=true`)
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  };

  const fetchGallery = () => {
    fetch(`${API_BASE}/gallery.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGalleryImages(data);
      });
  };

  const handleGallerySubmit = (e) => {
    e.preventDefault();
    if (!galleryImageFile) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("title", galleryTitle);
    formData.append("category", galleryCategory);
    formData.append("image", galleryImageFile);

    fetch(`${API_BASE}/gallery.php`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          alert("Image uploaded to gallery!");
          setGalleryTitle("");
          setGalleryCategory("General");
          setGalleryImageFile(null);
          setShowGalleryForm(false);
          fetchGallery();
        } else {
          alert(data.message || "Upload failed");
        }
      });
  };

  const handleDeleteGallery = (id) => {
    if (window.confirm("Delete this gallery image?")) {
      fetch(`${API_BASE}/gallery.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      }).then(() => fetchGallery());
    }
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

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
      fetchQueries();
      fetchBlogs();
      fetchSettings();
      fetchProfile();
      fetchOrders();
      fetchUsers();
      fetchGallery();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/auth.php?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        setIsLoggedIn(true);
        localStorage.setItem("adminLoggedIn", "true");
      } else {
        alert(data.message || "Invalid credentials");
      }
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

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE}/blogs.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: blogTitle, category: blogCategory, image_url: blogImage, content: blogContent }),
    }).then(() => {
      alert("Blog Published!");
      setBlogTitle(""); setBlogCategory("Company News"); setBlogImage(""); setBlogContent("");
      setShowBlogForm(false);
      fetchBlogs();
    });
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm("Delete this blog?")) {
      fetch(`${API_BASE}/blogs.php?id=${id}`, { method: "DELETE" })
        .then(() => fetchBlogs());
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
      <div className="premium-login-wrap">
        <style>
          {`
            .premium-login-wrap {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1920') no-repeat center center/cover;
              position: relative;
              padding: 20px;
              font-family: 'Inter', sans-serif;
            }
            .premium-login-wrap::before {
              content: '';
              position: absolute;
              top: 0; left: 0; width: 100%; height: 100%;
              background: rgba(15, 23, 42, 0.7);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }
            .premium-login-card {
              position: relative;
              background: rgba(255, 255, 255, 0.1);
              padding: 50px 40px;
              border-radius: 24px;
              box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
              width: 100%;
              max-width: 420px;
              text-align: center;
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: #fff;
              animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .premium-login-card h2 {
              font-size: 2rem;
              font-weight: 800;
              margin-bottom: 10px;
              letter-spacing: -0.5px;
            }
            .premium-login-card p {
              color: rgba(255, 255, 255, 0.7);
              margin-bottom: 30px;
              font-size: 0.95rem;
            }
            .premium-input-group {
              text-align: left;
              margin-bottom: 20px;
            }
            .premium-input-group label {
              display: block;
              font-size: 0.85rem;
              font-weight: 600;
              margin-bottom: 8px;
              color: rgba(255, 255, 255, 0.9);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .premium-input {
              width: 100%;
              padding: 14px 16px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              background: rgba(0, 0, 0, 0.2);
              border-radius: 12px;
              box-sizing: border-box;
              color: #fff;
              font-size: 1rem;
              transition: all 0.3s ease;
            }
            .premium-input:focus {
              outline: none;
              border-color: #FEA603;
              background: rgba(0, 0, 0, 0.4);
              box-shadow: 0 0 15px rgba(255, 102, 0, 0.3);
            }
            .premium-input::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }
            .premium-btn {
              width: 100%;
              padding: 16px;
              background: linear-gradient(135deg, #FEA603 0%, #ff8c00 100%);
              color: white;
              border: none;
              border-radius: 12px;
              font-size: 1.05rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 10px 20px rgba(255, 102, 0, 0.3);
              margin-top: 10px;
            }
            .premium-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 15px 25px rgba(255, 102, 0, 0.4);
            }
            .logo-placeholder {
              width: 60px;
              height: 60px;
              background: #FEA603;
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.8rem;
              font-weight: 900;
              color: #fff;
              margin: 0 auto 20px;
              box-shadow: 0 10px 20px rgba(255, 102, 0, 0.3);
            }
          `}
        </style>
        <div className="premium-login-card">
          <div className="logo-placeholder">M</div>
          <h2>Welcome Back</h2>
          <p>Sign in to MotoMax Admin Portal</p>
          <form onSubmit={handleLogin}>
            <div className="premium-input-group">
              <label>Email Address</label>
              <input className="premium-input" type="email" placeholder="admin@test.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} required />
            </div>
            <div className="premium-input-group">
              <label>Password</label>
              <input className="premium-input" type="password" placeholder="••••••••" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required />
            </div>
            <button className="premium-btn" type="submit">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  const pendingQueries = queries.filter(q => q.status === 'pending').length;

  return (
    <div className="admin-layout">
      <style>
        {`
          .admin-layout { display: flex; min-height: calc(100vh - 75px); background: #f4f7fb; font-family: 'Inter', sans-serif; color: #334155; overflow-x: hidden; }
          .admin-sidebar { width: 280px; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color: #fff; display: flex; flex-direction: column; position: fixed; top: 75px; height: calc(100vh - 75px); z-index: 100; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 4px 0 24px rgba(0,0,0,0.1); }
          .sidebar-header { padding: 32px 24px; font-size: 1.5rem; font-weight: 800; color: #fff; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); letter-spacing: 0.5px; }
          .sidebar-header span { color: #FEA603; }
          .close-sidebar { display: none; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; transition: transform 0.2s; }
          .close-sidebar:hover { transform: scale(1.1); color: #FEA603; }
          .sidebar-menu { display: flex; flex-direction: column; padding: 20px 12px; flex: 1; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; gap: 6px; }
          .sidebar-menu::-webkit-scrollbar { display: none; }
          .menu-item { padding: 14px 20px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: all 0.3s ease; border-radius: 12px; color: #94a3b8; display: flex; align-items: center; gap: 12px; }
          .menu-item:hover { background: rgba(255,255,255,0.06); color: #fff; transform: translateX(5px); }
          .menu-item.active { background: linear-gradient(90deg, rgba(254,166,3,0.15) 0%, rgba(254,166,3,0.05) 100%); color: #FEA603; border-left: 4px solid #FEA603; box-shadow: inset 0 0 20px rgba(254,166,3,0.05); transform: none; border-radius: 8px; }
          
          .admin-main { flex: 1; margin-left: 280px; display: flex; flex-direction: column; min-width: 0; transition: margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          
          .admin-topbar { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); padding: 20px 5%; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 20px rgba(0,0,0,0.03); position: sticky; top: 0; z-index: 90; border-bottom: 1px solid rgba(0,0,0,0.03); }
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
          <div className={`menu-item ${activeTab === "partners" ? "active" : ""}`} onClick={() => { setActiveTab("partners"); setIsSidebarOpen(false); }}>Partner Requests</div>
          <div className={`menu-item ${activeTab === "blog" ? "active" : ""}`} onClick={() => { setActiveTab("blog"); setIsSidebarOpen(false); }}>Blog</div>
          <div className={`menu-item ${activeTab === "gallery" ? "active" : ""}`} onClick={() => { setActiveTab("gallery"); setIsSidebarOpen(false); }}>Gallery</div>
          <div className={`menu-item ${activeTab === "cms" ? "active" : ""}`} onClick={() => { setActiveTab("cms"); setIsSidebarOpen(false); }}>Page Images</div>
          <div className={`menu-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => { setActiveTab("profile"); setIsSidebarOpen(false); }}>My Profile</div>
        </div>
        <button style={{ margin: "auto 20px 20px", padding: "12px", background: "rgba(255,0,0,0.1)", color: "#ef4444", border: "1px solid rgba(255,0,0,0.2)", borderRadius: "10px", cursor: "pointer", fontWeight: "700"}} onClick={() => { setIsLoggedIn(false); localStorage.removeItem("adminLoggedIn"); }}>Log Out</button>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <div style={{fontWeight: 700, fontSize: "1.2rem", textTransform: "capitalize"}}>{activeTab}</div>
          <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <div style={{width: "40px", height: "40px", borderRadius: "50%", background: "#FEA603", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold"}}>A</div>
          </div>
        </div>

        <div className="content-wrapper">
          {activeTab === "dashboard" && (
            <div>
              <div className="stat-grid" style={{marginBottom: "30px"}}>
                <div className="stat-card"><h4>Total Products</h4><h2>{products.length}</h2></div>
                <div className="stat-card"><h4>Published Blogs</h4><h2>{blogs.length}</h2></div>
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
                    { name: 'Blogs', count: blogs.length },
                    { name: 'Orders', count: orders.length },
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
                    <div className="form-group"><label>Product Image (File or URL)</label>
                      <input className="form-input" type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
                      <input className="form-input" style={{marginTop: '10px'}} placeholder="Or enter image URL" type="text" value={typeof image === 'string' ? image : ''} onChange={e=>setImage(e.target.value)} />
                    </div>
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
                      {o.customer_phone && <div style={{fontSize: "0.9rem", color: "#475569"}}>📞 {o.customer_phone}</div>}
                      {o.shipping_address && <div style={{fontSize: "0.85rem", marginTop: "5px", color: "#64748b", whiteSpace: "pre-wrap"}}>{o.shipping_address}</div>}
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

          {activeTab === "blog" && (
            <div>
              {showBlogForm ? (
                <div className="admin-card" style={{maxWidth: "800px", margin: "0 auto"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <h3 style={{margin: 0}}>Publish New Article</h3>
                    <button onClick={() => { setShowBlogForm(false); setBlogTitle(""); setBlogCategory("Company News"); setBlogImage(""); setBlogContent(""); }} style={{padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "bold"}}>← Back to Articles</button>
                  </div>
                  <form onSubmit={handleBlogSubmit}>
                    <div className="form-group"><label>Article Title</label><input className="form-input" placeholder="Title" value={blogTitle} onChange={e=>setBlogTitle(e.target.value)} required /></div>
                    <div className="form-group"><label>Category</label><input className="form-input" placeholder="e.g. Industry News" value={blogCategory} onChange={e=>setBlogCategory(e.target.value)} /></div>
                    <div className="form-group"><label>Cover Image URL</label><input className="form-input" placeholder="https://..." value={blogImage} onChange={e=>setBlogImage(e.target.value)} /></div>
                    <div className="form-group"><label>Content</label>
                      <textarea className="form-input" style={{minHeight:"200px", fontFamily: "monospace", fontSize: "0.9rem"}} placeholder="Write your article HTML or text here..." value={blogContent} onChange={e=>setBlogContent(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary">Publish Article</button>
                  </form>
                </div>
              ) : (
                <div className="admin-card">
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <h3 style={{margin: 0}}>Published Articles</h3>
                    <button onClick={() => setShowBlogForm(true)} className="btn-primary" style={{width: "auto", padding: "8px 16px", fontSize: "0.9rem"}}>+ Add New Article</button>
                  </div>
                  <div style={{overflowX: "auto"}}>
                    <table className="admin-table">
                      <thead>
                        <tr><th>Image</th><th>Title</th><th>Action</th></tr>
                      </thead>
                      <tbody>
                        {blogs.slice((blogPage - 1) * ITEMS_PER_PAGE, blogPage * ITEMS_PER_PAGE).map(b => (
                          <tr key={b.id}>
                            <td>
                              <img src={b.image_url ? (b.image_url.startsWith('http') ? b.image_url : `${API_BASE}/../${b.image_url}`) : "/assets/1.png"} alt={b.title} style={{width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px"}} />
                            </td>
                            <td style={{fontWeight: 600, color: "#1e293b"}}>{b.title}</td>
                            <td><button onClick={() => handleDeleteBlog(b.id)} style={{color: "#ef4444", border: "none", background: "rgba(239,68,68,0.1)", padding: "6px 12px", fontSize: "0.85rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600}}>Delete</button></td>
                          </tr>
                        ))}
                        {blogs.length === 0 && (
                          <tr><td colSpan="3" style={{textAlign: "center", padding: "30px", color: "#888"}}>No articles published yet. Click 'Add New Article' to get started.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {renderPagination(blogPage, blogs.length, setBlogPage)}
                </div>
              )}
            </div>
          )}

          {activeTab === "gallery" && (
            <div>
              {showGalleryForm ? (
                <div className="admin-card" style={{maxWidth: "800px", margin: "0 auto"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <h3 style={{margin: 0}}>Upload Gallery Image</h3>
                    <button onClick={() => { setShowGalleryForm(false); setGalleryTitle(""); setGalleryCategory("General"); setGalleryImageFile(null); }} style={{padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "bold"}}>← Back to Gallery</button>
                  </div>
                  <form onSubmit={handleGallerySubmit}>
                    <div className="form-group"><label>Image Title</label><input className="form-input" placeholder="e.g. Lithium Power Station" value={galleryTitle} onChange={e=>setGalleryTitle(e.target.value)} required /></div>
                    <div className="form-group"><label>Category</label><input className="form-input" placeholder="e.g. Batteries, Chargers, 2-Wheeler" value={galleryCategory} onChange={e=>setGalleryCategory(e.target.value)} required /></div>
                    <div className="form-group"><label>Upload Image</label><input className="form-input" type="file" accept="image/*" onChange={e=>setGalleryImageFile(e.target.files[0])} required /></div>
                    <button type="submit" className="btn-primary">Upload Image</button>
                  </form>
                </div>
              ) : (
                <div className="admin-card">
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "2px solid #f1f5f9", paddingBottom: "16px"}}>
                    <h3 style={{margin: 0, border: "none", padding: 0}}>Manage Gallery</h3>
                    <button className="btn-primary" style={{width: "auto", padding: "10px 20px"}} onClick={() => setShowGalleryForm(true)}>+ Upload Image</button>
                  </div>
                  
                  {galleryImages.length === 0 ? (
                    <div style={{textAlign: "center", padding: "40px", color: "#64748b"}}>No gallery images found. Upload your first image!</div>
                  ) : (
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px"}}>
                      {galleryImages.slice((galleryPage - 1) * 8, galleryPage * 8).map(img => (
                        <div key={img.id} style={{border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden"}}>
                          <img src={img.image_url.startsWith('http') ? img.image_url : `http://localhost/assinment/my-react-app/public${img.image_url}`} alt={img.title} style={{width: "100%", height: "150px", objectFit: "cover"}} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7"; }} />
                          <div style={{padding: "15px"}}>
                            <h4 style={{margin: "0 0 5px 0", fontSize: "0.95rem", color: "#1e293b"}}>{img.title}</h4>
                            <p style={{margin: "0 0 10px 0", fontSize: "0.8rem", color: "#64748b"}}>{img.category}</p>
                            <button onClick={() => handleDeleteGallery(img.id)} style={{width: "100%", padding: "8px", background: "#fee2e2", color: "#ef4444", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold"}}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {renderPagination(galleryPage, galleryImages.length, setGalleryPage)}
                </div>
              )}
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
                <div className="form-group">
                  <label>Home Page - Hero Image URL</label>
                  <input className="form-input" value={settings.heroImage || ""} onChange={e=>setSettings({...settings, heroImage: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Home Page - Hero Title</label>
                  <input className="form-input" value={settings.heroTitle || ""} onChange={e=>setSettings({...settings, heroTitle: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>About Us - Cover Image URL</label>
                  <input className="form-input" value={settings.aboutImage || ""} onChange={e=>setSettings({...settings, aboutImage: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Contact Us - Cover Image URL</label>
                  <input className="form-input" value={settings.contactImage || ""} onChange={e=>setSettings({...settings, contactImage: e.target.value})} required />
                </div>
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
        </div>
      </main>
    </div>
  );
};

export default Admin;
