import RecentIncome from "../components/dashboard/RecentIncome";
import IncomeBreakdown from "../components/dashboard/IncomeBreakdown";
import TopNavbar from "../components/dashboard/TopNavbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SummaryCards from "../components/dashboard/SummaryCards";
import QuickActions from "../components/dashboard/QuickActions";
import "../styles/dashboard/dashboard.css";
import StatusCard from "../components/dashboard/StatusCard";
import { signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReferralCard from "../components/dashboard/ReferralCard";
import RightMenu from "../components/dashboard/RightMenu";
import { getUserById } from "../services/user/getUserById";
import { verifyCurrentWallet } from "../services/web3/walletService";
function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

useEffect(() => {
  async function loadUser() {
    const rawUser = localStorage.getItem("currentUser");

console.log("RAW =", rawUser);

if (!rawUser) {
  console.log("No currentUser found");
  return;
}

const savedUser = JSON.parse(rawUser);

console.log("PARSED =", savedUser);
console.log("PROFILE =", savedUser?.profile);

if (!savedUser?.profile?.userId) {
  console.log("userId missing");
  return;
}

const latestUser = await getUserById(savedUser.profile.userId);
const verify = await verifyCurrentWallet(
  latestUser.wallet.address
);

console.log("Wallet Verify :", verify);

if (!verify.success) {

  localStorage.removeItem("currentUser");

  alert("Wallet Changed. Please connect again.");

  navigate("/auth");

  return;

}
console.log("Latest User :", latestUser);
console.log("Wallet :", latestUser?.wallet);
    if (latestUser) {
      setCurrentUser(latestUser);
    }
  }

  loadUser();
}, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("currentUser");
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-layout">
      

      <div className="dashboard-main">
        
     <TopNavbar
  onMenuClick={() => setMenuOpen(true)}
/>

        {/* Dashboard Header */}
        <DashboardHeader user={currentUser} />

        {/* Summary Cards */}
        <SummaryCards user={currentUser} />

<IncomeBreakdown user={currentUser} />

<RecentIncome user={currentUser} />

<StatusCard />

<ReferralCard user={currentUser} />

<QuickActions /> 

        <RightMenu
  open={menuOpen}
  onClose={() => setMenuOpen(false)}
/>
        {/*
        =====================================================
        OLD DASHBOARD (TEMPORARILY DISABLED)
        =====================================================

        <div className="dashboard-card-container">

          <UserCard />

          <WalletSummary />

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

        =====================================================
        */}
      </div>
    </div>
  );
}

export default Dashboard;