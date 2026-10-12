import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Product added to cart successfully!");
  const navigate = useNavigate();

  useEffect(() => {
    const handleCartSuccess = (e) => {
      if (e.detail && e.detail.message) {
        setMessage(e.detail.message);
      } else {
        setMessage("Product added to cart successfully!");
      }
      setIsOpen(true);
    };

    window.addEventListener("cartSuccess", handleCartSuccess);
    return () => window.removeEventListener("cartSuccess", handleCartSuccess);
  }, []);

  // Auto close after 3 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px 28px",
          maxWidth: "380px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          animation: "cartPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {/* Close icon */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            fontSize: "1.3rem",
            color: "#94a3b8",
            cursor: "pointer",
            padding: "4px"
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Checkmark icon */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
            color: "#16a34a",
            fontSize: "2.4rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            boxShadow: "0 10px 20px rgba(22, 163, 74, 0.18)"
          }}
        >
          ✓
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "8px"
          }}
        >
          Added to Cart!
        </h3>

        {/* Message */}
        <p
          style={{
            fontSize: "0.95rem",
            color: "#475569",
            marginBottom: "24px",
            lineHeight: "1.5"
          }}
        >
          {message}
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              flex: 1,
              padding: "11px 16px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              background: "#f8fafc",
              color: "#334155",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer"
            }}
          >
            Continue
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/dashboard?tab=cart");
            }}
            style={{
              flex: 1,
              padding: "11px 16px",
              borderRadius: "10px",
              border: "none",
              background: "var(--primary, #fea603)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(254, 166, 3, 0.35)"
            }}
          >
            Go to Cart 🛒
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cartPopIn {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartSuccessModal;
