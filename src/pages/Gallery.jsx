import React, { useState, useEffect } from "react";
import "../index.css";

const API_BASE = "http://localhost/assinment/php-backend/api";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Attempt to fetch from backend, fallback to default dynamic images if it fails or returns empty
    fetch(`${API_BASE}/gallery.php`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setImages(data);
        } else {
          loadFallbackImages();
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch gallery:", err);
        loadFallbackImages();
        setLoading(false);
      });
  }, []);

  const loadFallbackImages = () => {
    // Dynamic placeholder images with vibrant aesthetic
    setImages([
      { id: 1, title: "EV Scooter Alpha", url: "https://images.unsplash.com/photo-1621345946115-46b7a9749df8?w=800&auto=format&fit=crop", category: "2-Wheeler" },
      { id: 2, title: "Lithium Power Bank", url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop", category: "Batteries" },
      { id: 3, title: "Eco-Friendly Rickshaw", url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?w=800&auto=format&fit=crop", category: "3-Wheeler" },
      { id: 4, title: "Fast Charging Station", url: "https://images.unsplash.com/photo-1620802051783-6900f68d9fde?w=800&auto=format&fit=crop", category: "Chargers" },
      { id: 5, title: "Smart Inverter Setup", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop", category: "Inverters" },
      { id: 6, title: "Modern Golf Cart", url: "https://images.unsplash.com/photo-1593361108253-e99d458c62fa?w=800&auto=format&fit=crop", category: "Golf Cart" }
    ]);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <h2 style={{ color: "var(--primary)" }}>Loading Gallery...</h2>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <style>
        {`
          .gallery-page { padding: 60px 20px; background: #f8fafc; min-height: 80vh; }
          .gallery-title { font-size: 3rem; font-weight: 800; color: #1e293b; margin-bottom: 15px; }
          .gallery-desc { font-size: 1.1rem; color: #64748b; max-width: 600px; margin: 0 auto; }
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            padding: 20px;
          }
          .lightbox-close { top: -40px; right: -40px; }
          
          @media (max-width: 768px) {
            .gallery-page { padding: 40px 15px; }
            .gallery-title { font-size: 2.2rem; }
            .gallery-desc { font-size: 0.95rem; }
            .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 15px; padding: 10px; }
            .lightbox-close { top: -45px; right: 0px; font-size: 2.5rem; }
          }
          @media (max-width: 480px) {
            .gallery-title { font-size: 1.8rem; }
            .gallery-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 className="gallery-title">Our Gallery</h1>
          <p className="gallery-desc">
            Explore our cutting-edge electric vehicles, battery technologies, and charging infrastructure.
          </p>
          <div style={{ width: "60px", height: "4px", background: "var(--primary)", margin: "20px auto", borderRadius: "2px" }}></div>
        </div>

        {/* Dynamic CSS Grid for masonry-style gallery */}
        <div className="gallery-grid">
          {images.map((img) => (
            <div 
              key={img.id} 
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                cursor: "pointer",
                aspectRatio: "4/3",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (window.innerWidth > 768) {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth > 768) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                }
              }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.url || (img.image_url.startsWith('http') ? img.image_url : `http://localhost/assinment/my-react-app/public${img.image_url}`)} 
                alt={img.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => { if (window.innerWidth > 768) e.target.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { if (window.innerWidth > 768) e.target.style.transform = "scale(1)"; }}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                color: "white"
              }}>
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--primary)", fontWeight: "bold" }}>{img.category}</span>
                <h3 style={{ margin: "5px 0 0 0", fontSize: "1.2rem", fontWeight: "600" }}>{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox for viewing images */}
        {selectedImage && (
          <div 
            style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(15, 23, 42, 0.95)", zIndex: 9999,
              display: "flex", justifyContent: "center", alignItems: "center",
              backdropFilter: "blur(5px)", padding: "20px", boxSizing: "border-box"
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div style={{ position: "relative", maxWidth: "100%", maxHeight: "90%" }} onClick={(e) => e.stopPropagation()}>
              <button 
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                style={{
                  position: "absolute",
                  background: "none", border: "none", color: "white",
                  fontSize: "2.5rem", cursor: "pointer", transition: "color 0.2s",
                  lineHeight: 1
                }}
                onMouseEnter={(e) => e.target.style.color = "var(--primary)"}
                onMouseLeave={(e) => e.target.style.color = "white"}
              >
                &times;
              </button>
              <img 
                src={selectedImage.url || (selectedImage.image_url.startsWith('http') ? selectedImage.image_url : `http://localhost/assinment/my-react-app/public${selectedImage.image_url}`)} 
                alt={selectedImage.title} 
                style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: "12px", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }} 
              />
              <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
                <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "700" }}>{selectedImage.title}</h2>
                <p style={{ color: "#cbd5e1", margin: "5px 0 0 0" }}>{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
