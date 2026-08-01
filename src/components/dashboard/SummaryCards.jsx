import { GiTwoCoins } from "react-icons/gi";
function SummaryCards({ user }) {
  return (
    <div className="summary-grid">

      {/* Total Income */}
      <div className="summary-card">
        <span className="summary-icon">💰</span>

        <h3>Total Income</h3>

        <h2>
          £{Number(user?.wallet?.totalIncome || 0).toFixed(2)}
        </h2>

        <small>Lifetime Earnings</small>
      </div>

      

     

      {/* ZORY Token */}
      <div className="summary-card">
        <span className="summary-icon">
    <GiTwoCoins />
</span>

        <h3>ZORY Token</h3>

        <h2>
          {user?.token?.balance || 0}
        </h2>

        <small>Current Balance</small>
      </div>

      {/* Direct Partner */}
      <div className="summary-card">
        <span className="summary-icon">👥</span>

        <h3>Direct Partner</h3>

        <h2>
          {user?.team?.directCount || 0}
        </h2>

        <small>Personally Referred</small>
      </div>

      {/* Total Team */}
      <div className="summary-card">
        <span className="summary-icon">🌐</span>

        <h3>Total Team</h3>

        <h2>
          {user?.team?.totalTeam || 0}
        </h2>

        <small>Total Network</small>
      </div>

    </div>
  );
}

export default SummaryCards;