import { useEffect, useState } from "react";
import "../styles/profile/profile.css";
import ProfileCard from "../components/profile/ProfileCard";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div className="profile-loading">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="profile-page">

      <ProfileCard userData={userData} />

      <div className="profile-info-card">

        <h2 className="profile-section-title">
          Personal Information
        </h2>
<div className="profile-wallet-card">

  <h2 className="profile-section-title">
    Wallet Address
  </h2>

  <div className="profile-divider"></div>

  <div className="wallet-address-box">

    <span className="wallet-address">
      {userData?.wallet?.address || "Wallet Not Connected"}
    </span>

    <button
      className="copy-wallet-btn"
      onClick={() => {
        if (!userData?.wallet?.address) return;

        navigator.clipboard.writeText(
          userData.wallet.address
        );

        alert("Wallet Address Copied");
      }}
    >
      📋 Copy Address
    </button>

  </div>

</div>
        <div className="profile-divider"></div>

        <div className="profile-info-grid">

          <div className="profile-info-item">
            <span>Full Name</span>
            <strong>{userData.profile?.fullName}</strong>
          </div>

          <div className="profile-info-item">
            <span>User ID</span>
            <strong>{userData.profile?.userId}</strong>
          </div>

          <div className="profile-info-item">
            <span>Sponsor ID</span>
            <strong>
              {userData.profile?.sponsorId || "ROOT USER"}
            </strong>
          </div>

          <div className="profile-info-item">
            <span>Mobile</span>
            <strong>{userData.profile?.mobile}</strong>
          </div>

          <div className="profile-info-item">
            <span>Email:</span>
            <strong>{userData.auth?.email}</strong>
          </div>

        </div>

        <h2 className="profile-section-title">
          Account Information
        </h2> 
        <div className="profile-divider"></div>
<h2 className="profile-section-title">
  Referral Statistics
</h2>

<div className="profile-divider"></div>

<div className="profile-info-grid">

  <div className="profile-info-item">
    <span>👥 Direct Partner</span>
    <strong>
      {userData?.team?.directCount || 0}
    </strong>
  </div>

  <div className="profile-info-item">
    <span>🌐 Total Team</span>
    <strong>
      {userData?.team?.totalTeam || 0}
    </strong>
  </div>

  <div className="profile-info-item">
    <span>💰 Lifetime Income</span>
    <strong>
      £{Number(userData?.wallet?.totalIncome || 0).toFixed(2)}
    </strong>
  </div>

  <div className="profile-info-item">
    <span>🪙 Token Balance</span>
    <strong>
      {userData?.token?.balance || 0}
    </strong>
  </div>

</div>
        <div className="profile-divider"></div>

        <div className="profile-info-grid">

          <div className="profile-info-item">
            <span>Join Date</span>
            <strong>{userData.profile?.joinDate}</strong>
          </div>

          <div className="profile-info-item">
            <span>Join Time</span>
            <strong>{userData.profile?.joinTime}</strong>
          </div>

          <div className="profile-info-item">
            <span>Status</span>
            <strong>{userData.auth?.status}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;