import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig";
import { getLevelTeam } from "../services/team/getLevelTeam";
import { getCurrentUser } from "../services/user/getCurrentUser";
import MatrixList from "../components/partners/MatrixList";
import MatrixDetails from "../components/partners/MatrixDetails";
import DirectTeam from "../components/partners/DirectTeam";
import LevelTeam from "../components/partners/LevelTeam";
import "../styles/partners/partners.css";
import PartnersTabs from "../components/partners/PartnersTabs";
import { useNavigate } from "react-router-dom";
function Team() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [directTeam, setDirectTeam] = useState([]);
  const [levelTeam, setLevelTeam] = useState([]);
const [activeTab, setActiveTab] = useState("direct");
  const [selectedMatrix, setSelectedMatrix] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
  // Current User Load
  useEffect(() => {
  async function loadCurrentUser() {
    const savedUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (!savedUser) return;

    const latestUser = await getCurrentUser(
      savedUser.profile.userId
    );

    if (latestUser) {
      setCurrentUser(latestUser);
    }
  }

  loadCurrentUser();
}, []);
  // Team Load
  useEffect(() => {
    if (!currentUser) return;

    loadDirectTeam();
    loadLevelTeam();
  }, [currentUser]);

  // Level Team
  const loadLevelTeam = async () => {
    try {
      const data = await getLevelTeam(currentUser.profile.userId);
      setLevelTeam(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Direct Team
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
if (!currentUser) {
  return (
    <div className="partners-page">
      <h2>Loading...</h2>
    </div>
  );
}
const directPartners = directTeam.length;

const levelPartners = levelTeam.length;

const totalPartners = currentUser?.team?.totalTeam || 0;
  console.log("Current User Team:", currentUser?.team);
  return (
    
    <div className="partners-page">
      <button
  className="partners-back-btn"
  onClick={() => navigate("/dashboard")}
>
  ← Dashboard
</button>
      <h1 className="partners-title">My Partners</h1>

      {!selectedMatrix ? (
        <>
          <div className="partner-summary">
            <div className="partner-card">
              <h3>Direct Partners</h3>
              <h2>{directPartners}</h2>
            </div>

            <div className="partner-card">
              <h3>Level Partners</h3>
              <h2>{levelPartners}</h2>
            </div>

            <div className="partner-card">
              <h3>Total Partners</h3>
              <h2>{totalPartners}</h2>
            </div>
          </div>

          <>
 <PartnersTabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

{activeTab !== "matrix" && (
  <div className="partners-search">
    <input
      type="text"
      placeholder="Search by User ID, Name or Mobile..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="partners-search-input"
    />
  </div>
)}
 {activeTab === "direct" && (
  <DirectTeam
  directTeam={directTeam}
  searchTerm={searchTerm}
/>
)}

{activeTab === "level" && (
  <LevelTeam
    levelTeam={levelTeam}
    searchTerm={searchTerm}
  />
)}

  {activeTab === "matrix" && (
    <MatrixList
      onSelectMatrix={setSelectedMatrix}
    />
  )}
</>
        </>
      ) : (
        <MatrixDetails
          onBack={() => setSelectedMatrix(null)}
          userPool={currentUser?.pools?.pool1}
        />
      )}
    </div>
  );
}

export default Team;