import { useNavigate } from "react-router-dom";
import WalletSummary from "../components/dashboard/WalletSummary";
import IncomeHistory from "../components/dashboard/IncomeHistory";
import "../styles/dashboard/dashboard.css";

function Wallet() {
  const navigate = useNavigate();

  return (
    <div className="partners-page">
      <button
        className="partners-back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Dashboard
      </button>

      <h1 className="partners-title">My Wallet</h1>

      <WalletSummary />
       <IncomeHistory />
    </div>
  );
}

export default Wallet;