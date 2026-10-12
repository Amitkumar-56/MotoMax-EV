import React from 'react';

const Profile = ({ profileData, setProfileData, handleUpdateProfile }) => {
  return (
    <div className="dash-card">
      <h3 style={{fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px"}}>Personal Information</h3>
      <style>
        {`
          .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          @media (max-width: 768px) {
            .profile-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>
      <form onSubmit={handleUpdateProfile}>
        <div className="profile-grid">
          <div>
            <label style={{display:"block", marginBottom:"5px", color:"#64748b", fontWeight:600, fontSize:"0.9rem"}}>Full Name</label>
            <input type="text" className="dash-input" value={profileData.name} onChange={e=>setProfileData({...profileData, name: e.target.value})} required />
          </div>
          <div>
            <label style={{display:"block", marginBottom:"5px", color:"#64748b", fontWeight:600, fontSize:"0.9rem"}}>Email Address</label>
            <input type="email" className="dash-input" value={profileData.email} onChange={e=>setProfileData({...profileData, email: e.target.value})} required />
          </div>
        </div>
        <button type="submit" className="dash-btn" style={{marginTop: "10px"}}>Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
