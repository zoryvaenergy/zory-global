

function DashboardHeader({ user }) {
  const copyWallet = () => {

  if (!user?.wallet?.address) return;

  navigator.clipboard.writeText(user.wallet.address);

  alert("Wallet Address Copied");

};
  

  return (
    <div className="dashboard-card dashboard-header">
      <h2>
    👤 {user?.profile?.fullName || "Member"}
</h2>
<div className="wallet-row">

  <p className="wallet-address">
    👛{" "}
    {user?.wallet?.address
      ? `${user.wallet.address.slice(0, 8)}...${user.wallet.address.slice(-6)}`
      : "Wallet Not Connected"}
  </p>

  {user?.wallet?.address && (

    <button
      className="copy-wallet-btn"
      onClick={copyWallet}
    >
      📋
    </button>

  )}

</div>
     <small className="wallet-network">
  🌐 {user?.wallet?.network || "Unknown Network"}
</small>
      <div className="dashboard-header-right">

  <div className="header-id-box">
    <div className="header-badge">ID</div>
    <div className="header-value">
      {user?.profile?.userId || "--"}
    </div>
  </div>

  <div className="header-divider"></div>

  <div className="header-id-box">
    <div className="header-badge">SPONSOR</div>
    <div className="header-value">
      {user?.profile?.sponsorId || "--"}
    </div>
  </div>

</div>
    </div>
  );
}

export default DashboardHeader;