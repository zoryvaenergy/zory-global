import {
  FaUserCircle,
  FaCheckCircle,
} from "react-icons/fa";

function ProfileCard({ userData }) {
  return (
    <div className="profile-card">

      <div className="profile-avatar">
        <FaUserCircle />
      </div>

      <h2 className="profile-name">
        {userData?.profile?.fullName}
      </h2>

      <p className="profile-subtitle">
        Founder Member
      </p>

     <div className="profile-id-row">

  <div className="profile-id-box">
    <strong>ID</strong>
    <span>{userData?.profile?.userId}</span>
  </div>

  <div className="profile-id-box">
    <strong>Sponsor</strong>
    <span>
      {userData?.profile?.sponsorId || "ROOT"}
    </span>
  </div>

</div>

      <div className="profile-status">
        <FaCheckCircle />

        <span>
          {userData?.auth?.status || "ACTIVE"}
        </span>
      </div>

      <p className="profile-chain">
        🌐 BNB Smart Chain
      </p>

    </div>
  );
}

export default ProfileCard;