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

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>ZORY</h2>
        <span>GLOBAL</span>
      </div>

      <nav className="sidebar-menu">

        <div className="menu-item active">
          <MdDashboard />
          <span>Dashboard</span>
        </div>

        <div className="menu-item">
          <FaUsers />
          <span>Members</span>
        </div>

        <div className="menu-item">
          <MdAccountTree />
          <span>Team</span>
        </div>

        <div className="menu-item">
          <GiPoolDive />
          <span>Pool</span>
        </div>

        <div className="menu-item">
          <MdPeople />
          <span>Income</span>
        </div>

        <div className="menu-item">
          <MdAccountBalanceWallet />
          <span>Wallet</span>
        </div>

        <div className="menu-item">
          <MdBugReport />
          <span>Debug</span>
        </div>

        <div className="menu-item">
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