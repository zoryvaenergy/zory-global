import React, { useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { getLevelTeam } from "../../services/team/getLevelTeam";
import "../../styles/admin/adminTeam.css";

function AdminTeam() {
  const [searchUserId, setSearchUserId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  const [directTeam, setDirectTeam] = useState([]);
  const [levelTeam, setLevelTeam] = useState([]);

  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // SEARCH USER
  // ==============================

  const handleSearch = async () => {
    const enteredId = searchUserId.trim();

    if (!enteredId) {
      setSearchError("Please enter User ID");
      setSearchedUser(null);
      setDirectTeam([]);
      setLevelTeam([]);
      return;
    }

    try {
      setLoading(true);
      setSearchError("");

      // ==============================
      // LOAD ALL USERS
      // ==============================

      const snapshot = await get(ref(database, "users"));

      if (!snapshot.exists()) {
        setSearchError("No users found");
        setSearchedUser(null);
        setDirectTeam([]);
        setLevelTeam([]);
        return;
      }

      const users = snapshot.val();

      // ==============================
      // FIND SEARCHED USER
      // ==============================

      const foundUser = Object.values(users).find(
        (user) =>
          user.profile?.userId?.toLowerCase() ===
          enteredId.toLowerCase()
      );

      if (!foundUser) {
        setSearchError("User Not Found");
        setSearchedUser(null);
        setDirectTeam([]);
        setLevelTeam([]);
        return;
      }

      // ==============================
      // DIRECT TEAM
      // Sponsor Based
      // ==============================

      const directMembers = Object.values(users).filter(
        (user) =>
          user.profile?.sponsorId ===
          foundUser.profile?.userId
      );

      // ==============================
      // LEVEL TEAM
      // Level 1 - 10
      // ==============================

      const levelMembers = await getLevelTeam(
        foundUser.profile.userId
      );

      // ==============================
      // SAVE DATA
      // ==============================

      setSearchedUser(foundUser);
      setDirectTeam(directMembers);
      setLevelTeam(levelMembers);

    } catch (error) {
      console.error("Admin Team User Search Error:", error);

      setSearchError("Unable to search user");
      setSearchedUser(null);
      setDirectTeam([]);
      setLevelTeam([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // USER TEAM DATA
  // ==============================

  const savedTotalTeam =
    searchedUser?.team?.totalTeam || 0;

  const savedDirectTeam =
    searchedUser?.team?.directCount || 0;

  const actualDirectTeam =
    directTeam.length;

  const actualLevelTeam =
    levelTeam.length;

    
const levelGroups = {};

levelTeam.forEach((user) => {
  if (!levelGroups[user.level]) {
    levelGroups[user.level] = [];
  }

  levelGroups[user.level].push(user);
});
  return (
    <div className="admin-team-container">

      {/* ==============================
          TITLE
      ============================== */}

      <h1 className="admin-team-title">
        Team Management
      </h1>

      {/* ==============================
          SEARCH
      ============================== */}

      <div className="admin-team-search">

        <input
          type="text"
          placeholder="Enter User ID"
          value={searchUserId}
          onChange={(e) =>
            setSearchUserId(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

      {/* ==============================
          ERROR
      ============================== */}

      {searchError && (
        <p className="admin-team-error">
          {searchError}
        </p>
      )}

      {/* ==============================
          SEARCHED USER
      ============================== */}

      {searchedUser && (
        <>
          <div className="admin-team-user-card">

            <h2>User Selected</h2>

            <p>
              User ID:{" "}
              <strong>
                {searchedUser.profile?.userId}
              </strong>
            </p>

            <p>
              Name:{" "}
              <strong>
                {searchedUser.profile?.fullName}
              </strong>
            </p>

          </div>

          {/* ==============================
              TEAM SUMMARY
          ============================== */}

          <div className="admin-team-summary">

            {/* TOTAL TEAM */}

            <div className="admin-team-stat-card">

              <span>Total Team</span>

              <strong>
                {savedTotalTeam}
              </strong>

            </div>

            {/* DIRECT TEAM */}

            <div className="admin-team-stat-card">

              <span>Direct Team</span>

              <strong>
                {actualDirectTeam}
              </strong>

            </div>

            {/* LEVEL TEAM */}

            <div className="admin-team-stat-card">

              <span>Level Team</span>

              <strong>
                {actualLevelTeam}
              </strong>

            </div>

          </div>

          {/* ==============================
              TEAM OVERVIEW
          ============================== */}

          <div className="admin-team-card">

            <h3>
              Team Overview
            </h3>

            <p>
              Team data for{" "}
              <strong>
                {searchedUser.profile?.userId}
              </strong>
            </p>

            <div className="admin-team-details">

              <p>
                Saved Direct Count:{" "}
                <strong>
                  {savedDirectTeam}
                </strong>
              </p>

              <p>
                Actual Direct Count:{" "}
                <strong>
                  {actualDirectTeam}
                </strong>
              </p>

              <p>
                Level 1–10 Members:{" "}
                <strong>
                  {actualLevelTeam}
                </strong>
              </p>

            </div>

          </div>
                {/* ==============================
          DIRECT TEAM MEMBERS
      ============================== */}

      <div className="admin-team-card">

        <h3>
          Direct Team Members
        </h3>

        {directTeam.length === 0 ? (

          <p className="admin-team-empty">
            No Direct Team Found
          </p>

        ) : (

          <div className="admin-team-table-wrapper">

            <table className="admin-team-table">

              <thead>
  <tr>
    <th>User ID</th>
    <th>Wallet Address</th>
    <th>Sponsor ID</th>
    <th>Join Date</th>
  </tr>
</thead>

              <tbody>

                {directTeam.map((user) => (

                 <tr key={user.profile?.userId}>

  <td>
    {user.profile?.userId || "-"}
  </td>

  <td>
    {user.wallet?.address || "-"}
  </td>

  <td>
    {user.profile?.sponsorId || "-"}
  </td>

  <td>
    {user.profile?.joinDate || "-"}
  </td>

</tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
      {/* ==============================
    LEVEL TEAM
============================== */}

<div className="admin-team-card">

  <h3>
    Level Team
  </h3>

  {Object.keys(levelGroups).length === 0 ? (

    <p className="admin-team-empty">
      No Level Team Found
    </p>

  ) : (

    Object.keys(levelGroups)
      .sort((a, b) => Number(a) - Number(b))
      .map((level) => (

        <div
          className="admin-team-level"
          key={level}
        >

          <div className="admin-team-level-header">

            <h4>
              Level {level}
            </h4>

            <span>
              {levelGroups[level].length} Members
            </span>

          </div>

          <div className="admin-team-table-wrapper">

            <table className="admin-team-table">

              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Wallet Address</th>
                  <th>Sponsor ID</th>
                  <th>Join Date</th>
                </tr>
              </thead>

              <tbody>

                {levelGroups[level].map((user) => (

                  <tr
                    key={user.profile?.userId}
                  >

                    <td>
                      {user.profile?.userId || "-"}
                    </td>

                    <td>
                      {user.wallet?.address || "-"}
                    </td>

                    <td>
                      {user.profile?.sponsorId || "-"}
                    </td>

                    <td>
                      {user.profile?.joinDate || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      ))

  )}

</div>
        </>
      )}

    </div>
  );
}

export default AdminTeam;