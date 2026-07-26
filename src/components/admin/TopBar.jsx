import React from "react";
import "../../styles/admin/topbar.css";
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>ZORY GLOBAL ADMIN</h2>
      </div>

      <div className="topbar-right">
        <span>Developer Mode</span>
      </div>
    </div>
  );
}

export default TopBar;