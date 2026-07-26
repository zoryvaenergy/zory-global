import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase/auth";

import "../../styles/dashboard/sidebar.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }
  };

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <h2>ZORY Global</h2>

      </div>

      <nav className="sidebar-menu">

        <button onClick={() => navigate("/dashboard")}>
          🏠 Dashboard
        </button>

        <button onClick={() => navigate("/profile")}>
          👤 Profile
        </button>

        <button onClick={() => navigate("/team")}>
          👥 Team
        </button>

        <button>
          💰 Wallet
        </button>

        <button>
          🎁 Rewards
        </button>

        <button>
          ⚙️ Settings
        </button>

        <button onClick={handleLogout}>
          🚪 Logout
        </button>

      </nav>

    </aside>

  );

}

export default Sidebar;