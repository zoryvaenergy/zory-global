import {
  FaUser,
  FaHome,
  FaUsers,
  FaWallet,
  FaCoins,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase/auth";

function RightMenu({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  return (
    <>
      {open && (
        <div
          className="menu-overlay"
          onClick={onClose}
        ></div>
      )}

      <div className={`right-menu ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="menu-header">
          <span>
            {currentUser?.profile?.fullName || "Member"}
          </span>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Dashboard */}
        <div
          className={`menu-item ${
            location.pathname === "/dashboard"
              ? "active-menu"
              : ""
          }`}
          onClick={() => {
            navigate("/dashboard");
            onClose();
          }}
        >
          <FaHome />
          <span>Dashboard</span>
        </div>

        {/* Profile */}
        <div
          className={`menu-item ${
            location.pathname === "/profile"
              ? "active-menu"
              : ""
          }`}
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
        >
          <FaUser />
          <span>Profile</span>
        </div>

       {/* My Partners */}
<div
  className={`menu-item ${
    location.pathname === "/team"
      ? "active-menu"
      : ""
  }`}
  onClick={() => {
    navigate("/team");
    onClose();
  }}
>
  <FaUsers />
  <span>My Partners</span>
</div>

        {/* Wallet (Coming Soon) */}
        {/* Wallet */}
<div
  className={`menu-item ${
    location.pathname === "/wallet"
      ? "active-menu"
      : ""
  }`}
  onClick={() => {
    navigate("/wallet");
    onClose();
  }}
>
  <FaWallet />
  <span>Wallet</span>
</div>

        {/* Token (Coming Soon) */}
        {/* Token */}
<div
  className={`menu-item ${
    location.pathname === "/token"
      ? "active-menu"
      : ""
  }`}
  onClick={() => {
    navigate("/token");
    onClose();
  }}
>
  <FaCoins />
  <span>Token</span>
</div>

        {/* Settings (Coming Soon) */}
        {/* Settings */}
<div
  className={`menu-item ${
    location.pathname === "/settings"
      ? "active-menu"
      : ""
  }`}
  onClick={() => {
    navigate("/settings");
    onClose();
  }}
>
  <FaCog />
  <span>Settings</span>
</div>

        {/* Logout */}
        <div
          className="menu-item logout"
          onClick={async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error("Logout Error:", error);
            }

            localStorage.removeItem("currentUser");
            onClose();
            navigate("/login");
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </>
  );
}

export default RightMenu;