import React from "react";
import "../../styles/admin/sidebar.css";

import {
  MdDashboard,
  MdPeople,
  MdAccountTree,
  MdAccountBalanceWallet,
  MdBugReport,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { FaUsers } from "react-icons/fa";
import { GiPoolDive } from "react-icons/gi";

function Sidebar({ activeSection, setActiveSection }) {

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>ZORY</h2>
        <span>GLOBAL</span>
      </div>

      <nav className="sidebar-menu">

        <div
          className={`menu-item ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActiveSection("dashboard")}
        >
          <MdDashboard />
          <span>Dashboard</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "members" ? "active" : ""
          }`}
          onClick={() => setActiveSection("members")}
        >
          <FaUsers />
          <span>Members</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "team" ? "active" : ""
          }`}
          onClick={() => setActiveSection("team")}
        >
          <MdAccountTree />
          <span>Team</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "pool" ? "active" : ""
          }`}
          onClick={() => setActiveSection("pool")}
        >
          <GiPoolDive />
          <span>Pool</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "income" ? "active" : ""
          }`}
          onClick={() => setActiveSection("income")}
        >
          <MdPeople />
          <span>Income</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "wallet" ? "active" : ""
          }`}
          onClick={() => setActiveSection("wallet")}
        >
          <MdAccountBalanceWallet />
          <span>Wallet</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "debug" ? "active" : ""
          }`}
          onClick={() => setActiveSection("debug")}
        >
          <MdBugReport />
          <span>Debug</span>
        </div>

        <div
          className={`menu-item ${
            activeSection === "settings" ? "active" : ""
          }`}
          onClick={() => setActiveSection("settings")}
        >
          <MdSettings />
          <span>Settings</span>
        </div>

      </nav>

      <div className="sidebar-footer">

        <div className="menu-item logout">
          <MdLogout />
          <span>Logout</span>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;