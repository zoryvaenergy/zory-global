import React from "react";
import "../../styles/admin/adminLayout.css";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import SearchUser from "./SearchUser";
function AdminLayout() {
  return (
  <div className="admin-layout">

    <TopBar />

    <div className="admin-body">

      <Sidebar />

      <main className="admin-content">
        <DashboardCards />
        <SearchUser />
      </main>

    </div>

  </div>
);
}

export default AdminLayout;