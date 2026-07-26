import React from "react";
import "../../styles/admin/userDebugCard.css";

function UserDebugCard({ userData }) {

  if (!userData) return null;

  return (

    <div className="user-debug-card">

      <div className="debug-section">

        <h3>User Profile</h3>

        <div className="debug-grid">

          <p><strong>User ID</strong></p>
          <p>{userData.profile.userId}</p>

          <p><strong>Full Name</strong></p>
          <p>{userData.profile.fullName}</p>

          <p><strong>Mobile</strong></p>
          <p>{userData.profile.mobile}</p>

          <p><strong>Sponsor ID</strong></p>
          <p>{userData.profile.sponsorId}</p>

          <p><strong>Status</strong></p>
          <p>{userData.auth.status}</p>

        </div>

      </div>

      <div className="debug-section">

        <h3>Pool Details</h3>

        <div className="debug-grid">

          <p><strong>Current Pool</strong></p>
          <p>{userData.pools.currentPool}</p>

          <p><strong>Sequence</strong></p>
          <p>{userData.pools.pool1.sequence}</p>

          <p><strong>Parent Sequence</strong></p>
          <p>{userData.pools.pool1.parentSequence}</p>

          <p><strong>Current Step</strong></p>
          <p>{userData.pools.pool1.currentStep}</p>

        </div>

      </div>

      <div className="debug-section">

        <h3>Team Details</h3>

        <div className="debug-grid">

          <p><strong>Direct Count</strong></p>
          <p>{userData.team.directCount}</p>

          <p><strong>Total Team</strong></p>
          <p>{userData.team.totalTeam}</p>

          <p><strong>Level 1</strong></p>
          <p>{userData.team.level1Count}</p>

          <p><strong>Level 2</strong></p>
          <p>{userData.team.level2Count}</p>

          <p><strong>Level 3</strong></p>
          <p>{userData.team.level3Count}</p>

          <p><strong>Level 4</strong></p>
          <p>{userData.team.level4Count}</p>

          <p><strong>Level 5</strong></p>
          <p>{userData.team.level5Count}</p>

          <p><strong>Level 6</strong></p>
          <p>{userData.team.level6Count}</p>

          <p><strong>Level 7</strong></p>
          <p>{userData.team.level7Count}</p>

          <p><strong>Level 8</strong></p>
          <p>{userData.team.level8Count}</p>

          <p><strong>Level 9</strong></p>
          <p>{userData.team.level9Count}</p>

          <p><strong>Level 10</strong></p>
          <p>{userData.team.level10Count}</p>

        </div>

      </div>

    </div>

  );

}

export default UserDebugCard;