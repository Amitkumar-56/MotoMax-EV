import React, { useState, useEffect } from 'react';

const API_BASE = "http://localhost/assinment/php-backend/api";

const Overview = ({ user, inquiries }) => {
  const [stats, setStats] = useState({ orders: 0, wishlist: 0 });

  useEffect(() => {
    if (!user || !user.id) return;

    // Fetch Orders count
    fetch(`${API_BASE}/orders.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const orderCount = Array.isArray(data) ? data.length : 0;
        setStats(prev => ({ ...prev, orders: orderCount }));
      });

    // Fetch Wishlist count
    fetch(`${API_BASE}/wishlist.php?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const wishlistCount = Array.isArray(data) ? data.length : 0;
        setStats(prev => ({ ...prev, wishlist: wishlistCount }));
      });

  }, [user]);

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', paddingBottom: '20px', fontFamily: 'Roboto, Arial, sans-serif' }}>
      <div style={{ padding: '20px', background: '#fff', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Hey, {user.name.split(' ')[0]}</h2>
        <button style={{ background: 'none', border: '1px solid #c2c2c2', padding: '8px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
          🎧 Help
        </button>
      </div>

      <div style={{ padding: '15px' }}>
        {/* MotoMax Rewards Banner */}
        <div style={{ background: 'linear-gradient(90deg, #f0f8ff, #e6f2ff)', border: '1px solid #d4e9ff', borderRadius: '8px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Your Reward Points</div>
          <div style={{ background: '#fff', border: '1px solid #c2c2c2', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: '#fb641b' }}>★</span> 0
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <div onClick={() => window.location.search = '?tab=orders'} style={{ flex: 1, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '1.5rem', color: '#2874f0' }}>📦</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Orders ({stats.orders})</span>
          </div>
          <div onClick={() => window.location.search = '?tab=wishlist'} style={{ flex: 1, background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '1.5rem', color: '#2874f0' }}>❤️</span>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Wishlist ({stats.wishlist})</span>
          </div>
        </div>

        {/* Finance Options - UI Layout */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Account Settings</h3>
        <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <div onClick={() => window.location.search = '?tab=profile'} style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '1.5rem', color: '#2874f0' }}>👤</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Profile Information</div>
                <div style={{ color: '#878787', fontSize: '0.85rem', marginTop: '2px' }}>Update your personal details</div>
              </div>
            </div>
            <span style={{ color: '#c2c2c2', fontSize: '1.2rem' }}>›</span>
          </div>
          
          <div onClick={() => window.location.search = '?tab=addresses'} style={{ padding: '15px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '1.5rem', color: '#2874f0' }}>📍</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Saved Addresses</div>
                <div style={{ color: '#878787', fontSize: '0.85rem', marginTop: '2px' }}>Manage your delivery locations</div>
              </div>
            </div>
            <span style={{ color: '#c2c2c2', fontSize: '1.2rem' }}>›</span>
          </div>
          
          <div onClick={() => window.location.search = '?tab=password'} style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '1.5rem', color: '#2874f0' }}>🔒</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Change Password</div>
                <div style={{ color: '#878787', fontSize: '0.85rem', marginTop: '2px' }}>Secure your account</div>
              </div>
            </div>
            <span style={{ color: '#c2c2c2', fontSize: '1.2rem' }}>›</span>
          </div>
        </div>

        {/* Recently Viewed - Dynamic Mock */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Support & Activity</h3>
        <div style={{ background: '#fff', borderRadius: '8px', padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {inquiries.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#388e3c' }}>Latest Support Ticket:</div>
              <div style={{ color: '#212121', fontSize: '0.9rem', lineHeight: '1.5' }}>"{inquiries[0].message}"</div>
              <div style={{ color: '#878787', fontSize: '0.8rem' }}>Submitted on {new Date(inquiries[0].created_at).toLocaleDateString()}</div>
            </div>
          ) : (
            <div style={{ color: '#878787', fontSize: '0.9rem', textAlign: 'center', padding: '10px' }}>No recent activity. Need help? Contact Support.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Overview;
