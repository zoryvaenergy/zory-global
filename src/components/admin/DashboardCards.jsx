import React from "react";
import "../../styles/admin/dashboardCards.css";

import {
  MdPeople,
  MdGroups,
  MdAccountTree,
  MdDashboard,
} from "react-icons/md";

function DashboardCards() {
  return (
    <div className="dashboard-cards">

      <div className="dashboard-card">
        <div className="card-icon">
          <MdPeople />
        </div>

        <div className="card-info">
          <h4>Total Members</h4>
          <h2>0</h2>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">
          <MdGroups />
        </div>

        <div className="card-info">
          <h4>Active Members</h4>
          <h2>0</h2>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">
          <MdAccountTree />
        </div>

        <div className="card-info">
          <h4>Total Team</h4>
          <h2>0</h2>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-icon">
          <MdDashboard />
        </div>

        <div className="card-info">
          <h4>Pool Members</h4>
          <h2>0</h2>
        </div>
      </div>

    </div>
  );
}

export default DashboardCards;