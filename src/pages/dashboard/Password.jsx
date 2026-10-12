import React from 'react';

const Password = ({ profileData, setProfileData, handleUpdateProfile }) => {
  return (
    <div className="dash-card">
      <h3 style={{fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>Change Password</h3>
      <form onSubmit={handleUpdateProfile}>
        <label style={{display:"block", marginBottom:"5px", color:"#64748b", fontWeight:600, fontSize:"0.9rem"}}>New Password</label>
        <input type="password" className="dash-input" placeholder="Enter new password" value={profileData.password} onChange={e=>setProfileData({...profileData, password: e.target.value})} required />
        <button type="submit" className="dash-btn" style={{marginTop: "10px"}}>Save Password</button>
      </form>
    </div>
  );
};

export default Password;
