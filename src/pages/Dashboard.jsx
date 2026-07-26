import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import "../styles/dashboard/dashboard.css";
import { signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import UserCard from "../components/dashboard/UserCard";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logout successful");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      {/* Main */}

      <div className="dashboard-main">

        <Header />

        <div className="dashboard-card-container">

          <UserCard />
         <StatCard
    title="Wallet Balance"
    value="0 ZORY"
/>

          <StatCard
    title="Referral Team"
    value="0 Members"
/>

          <StatCard
    title="Status"
    value="Active"
/>

          

          <StatCard
    title="Rewards"
    value="0"
/>
          <div className="dashboard-card">

            <h3>Sponsor & Referral</h3>

            <input
              type="text"
              value="https://zoryglobal.com/register?ref=ZG61D259"
              readOnly
              style={inputStyle}
            />

            <div style={buttonContainer}>

              <button style={buttonStyle}>
                📋 Copy
              </button>

              <button style={buttonStyle}>
                📤 Share
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}





const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
};

const buttonContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const buttonStyle = {
  flex: 1,
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;