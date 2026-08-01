import "../../styles/dashboard/header.css";

function Header({ user }) {
  return (
    <header className="dashboard-header">

      <div className="header-left">
        <h1>Dashboard</h1>
        <p>Welcome to ZORY Global</p>
      </div>

      <div className="header-right">

        <div className="header-user">

          <div className="user-avatar">
            K
          </div>

          <div>

           <h4>
  {user?.profile?.fullName || "Welcome"}
</h4>

<p>
  {user?.profile?.userId || "ZORY Member"}
</p>

<small>
  {user?.wallet?.address
    ? `${user.wallet.address.slice(0, 8)}...${user.wallet.address.slice(-6)}`
    : "Wallet Not Connected"}
</small>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;