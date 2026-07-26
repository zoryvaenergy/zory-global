import "../../styles/dashboard/header.css";

function Header() {
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

            <h4>Welcome</h4>

            <p>ZORY Member</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;