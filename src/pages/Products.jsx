import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistedItems, setWishlistedItems] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  
  const handleAction = (e, productId, actionType, redirect = false) => {
    e.preventDefault();
    e.stopPropagation();
    
    const userStr = localStorage.getItem("authUser");
    if (!userStr) {
      if (actionType === 'cart') {
        try {
          let guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
          const existingItem = guestCart.find(item => (typeof item === 'object' ? item.product_id === productId : item === productId));
          if (existingItem) {
            if (typeof existingItem === 'object') {
              existingItem.quantity = (existingItem.quantity || 1) + 1;
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Cart quantity updated successfully!" } }));
          } else {
            guestCart.push({ product_id: productId, quantity: 1 });
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            window.dispatchEvent(new Event('cartUpdated'));
            window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: "Product added to cart successfully!" } }));
          }
        } catch (err) {
          console.error(err);
        }
        return;
      }
      alert("Please login first to add items to your wishlist!");
      window.location.href = "/dashboard?tab=wishlist";
      return;
    }
    
    const user = JSON.parse(userStr);
    const endpoint = actionType === 'cart' ? 'cart.php' : 'wishlist.php';
    
    fetch(`${API_BASE}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId })
    })
    .then(res => res.json())
    .then(data => {
      if (redirect) {
        window.location.href = "/dashboard?tab=cart";
      } else {
        if (actionType === 'cart') {
          window.dispatchEvent(new CustomEvent('cartSuccess', { detail: { message: data.message || "Product added to cart successfully!" } }));
          window.dispatchEvent(new Event('cartUpdated'));
        } else {
          alert(data.message);
        }
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/products.php`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const dynamicCategories = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))];
  const displayedProducts = category ? allProducts.filter(p => p.category === category) : allProducts;

  return (
    <div style={{ padding: "100px 20px", background: "var(--bg-main)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "var(--text-main)", textAlign: "center", marginBottom: "15px" }}>
          {category ? `${category} Products` : "All Products"}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", textAlign: "center", marginBottom: "50px", maxWidth: "700px", margin: "0 auto 50px" }}>
          {category ? `Explore our complete range of ${category} solutions.` : "Explore our complete range of EV and energy solutions directly from our live inventory."}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
          {dynamicCategories.map(cat => (
            <Link 
              key={cat}
              to={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                background: (category === cat) || (!category && cat === 'All') ? 'var(--primary)' : '#f1f5f9',
                color: (category === cat) || (!category && cat === 'All') ? '#fff' : '#475569',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {loading ? (
          <h2 style={{textAlign: "center"}}>Loading live products...</h2>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px"
          }}>
            {displayedProducts.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px", color: "#666" }}>
                <h3>No products found in this category.</h3>
              </div>
            ) : displayedProducts.map((prod, idx) => (
              <Link
                key={idx}
                to={`/products/${prod.id}`}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "25px 20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid rgba(0,0,0,0.02)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(254,166,3,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  position: "relative",
                  overflow: "hidden",
                  background: "#f9f9f9"
                }}>
                  <img
                    src={prod.image || "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500"}
                    alt={prod.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                      background: "#fff",
                      zIndex: 2,
                    }}
                  />
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setWishlistedItems(prev => ({ ...prev, [prod.id]: true }));
                      handleAction(e, prod.id, 'wishlist');
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '35px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      color: wishlistedItems[prod.id] ? '#ef4444' : '#ccc',
                      fontSize: '1.2rem',
                      transition: 'color 0.3s'
                    }}
                  >
                    ❤
                  </button>
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "10px", textAlign: "center" }}>
                  {prod.name}
                </h3>
                <h4 style={{ fontSize: "1.1rem", color: "#FEA603", marginBottom: "10px", textAlign: "center" }}>
                  ₹{prod.price}
                </h4>
                <p style={{ fontSize: "0.95rem", color: "#666", textAlign: "center", flexGrow: 1, margin: 0 }}>
                  {prod.range}
                </p>
                <div
                  className="card-arrow-btn"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(254,166,3,0.1)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    fontSize: "1.2rem"
                  }}
                >
                  &#8594;
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', width: '100%' }}>
                  <button 
                    onClick={(e) => handleAction(e, prod.id, 'cart', false)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      background: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 166, 3, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
