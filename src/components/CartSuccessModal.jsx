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

  // Auto close after 2 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);
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
        backgroundColor: "rgba(0, 0, 0, 0.4)",
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
          borderRadius: "18px",
          padding: "28px 24px",
          maxWidth: "340px",
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
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#ffffff",
            fontSize: "2rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px auto",
            boxShadow: "0 10px 20px rgba(34, 197, 94, 0.25)"
          }}
        >
          ✓
        </div>

        {/* Message */}
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            color: "#0f172a",
            margin: 0,
            lineHeight: "1.4"
          }}
        >
          {message}
        </h3>
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
