import { HiOutlineBars3 } from "react-icons/hi2";

function TopNavbar({ onMenuClick }) {
  return (
    <div className="top-navbar">

      <div className="top-navbar-logo">
        ZORY <span>Global</span>
      </div>

      <button
  className="menu-btn"
  onClick={onMenuClick}
>
        <HiOutlineBars3 size={28} />
      </button>

    </div>
  );
}

export default TopNavbar;