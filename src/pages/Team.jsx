import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { getLevelTeam } from "../services/team/getLevelTeam";

function Team() {
  const [currentUser, setCurrentUser] = useState(null);
  const [directTeam, setDirectTeam] = useState([]);
  const [levelTeam, setLevelTeam] = useState([]);

  // Current User Load
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Team Load
  useEffect(() => {
    if (!currentUser) return;

    loadDirectTeam();
    loadLevelTeam();
  }, [currentUser]);

  const loadLevelTeam = async () => {
    try {
      const data = await getLevelTeam(currentUser.profile.userId);
      setLevelTeam(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Firebase Se Direct Team
  const loadDirectTeam = async () => {
    try {
      const snapshot = await get(ref(database, "users"));

      if (!snapshot.exists()) {
        setDirectTeam([]);
        return;
      }

      const users = snapshot.val();

      const team = [];

      Object.values(users).forEach((user) => {
        if (user.profile?.sponsorId === currentUser.profile?.userId) {
          team.push(user);
        }
      });

      setDirectTeam(team);
    } catch (error) {
      console.error("Direct Team Error :", error);
    }
  };

  // Copy Referral Link
  const copyReferralLink = () => {
    const referralLink = `https://zoryglobal.com/register?ref=${
      currentUser?.profile?.userId || ""
    }`;

    navigator.clipboard.writeText(referralLink);

    alert("Referral Link Copied Successfully");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b25",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>My Team</h1>

      {/* Summary Cards */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Direct Team</h3>
          <h2>{currentUser?.team?.directCount || 0}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Level Team</h3>

          <h2>
            {(currentUser?.team?.level1Count || 0) +
              (currentUser?.team?.level2Count || 0) +
              (currentUser?.team?.level3Count || 0) +
              (currentUser?.team?.level4Count || 0) +
              (currentUser?.team?.level5Count || 0) +
              (currentUser?.team?.level6Count || 0) +
              (currentUser?.team?.level7Count || 0) +
              (currentUser?.team?.level8Count || 0) +
              (currentUser?.team?.level9Count || 0) +
              (currentUser?.team?.level10Count || 0)}
          </h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Team</h3>
          <h2>{currentUser?.team?.totalTeam || 0}</h2>
        </div>
      </div>

      {/* Referral Link */}

      <div
        style={{
          background: "#101935",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <h2>Your Referral Link</h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            value={`https://zoryglobal.com/register?ref=${
              currentUser?.profile?.userId || ""
            }`}
            readOnly
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <button
            onClick={copyReferralLink}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Copy
          </button>
        </div>
      </div>
            {/* Direct Team List */}

      <div
        style={{
          background: "#101935",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <h2>Direct Team List</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>
                User ID
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Name
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Sponsor ID
              </th>
            </tr>
          </thead>

          <tbody>
            {directTeam.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Direct Team Found
                </td>
              </tr>
            ) : (
              directTeam.map((member) => (
                <tr key={member.profile.userId}>
                  <td style={{ padding: "12px" }}>
                    {member.profile.userId}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {member.profile.fullName}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {member.profile.sponsorId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Level Team List */}

      <div
        style={{
          background: "#101935",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px",
        }}
      >
        <h2>Level Team List</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>
                User ID
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Name
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Sponsor ID
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Level
              </th>
            </tr>
          </thead>

          <tbody>
            {levelTeam.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No Level Team Found
                </td>
              </tr>
            ) : (
              levelTeam.map((member) => (
                <tr key={member.userId}>
                  <td style={{ padding: "12px" }}>
                    {member.userId}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {member.fullName}
                  </td>

                  <td style={{ padding: "12px" }}>
                    {member.sponsorId}
                  </td>

                  <td style={{ padding: "12px" }}>
                    Level {member.level}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#101935",
  padding: "20px",
  borderRadius: "15px",
  minWidth: "200px",
  textAlign: "center",
};

export default Team;