import React, { useState } from "react";
import "../../styles/admin/adminLayout.css";
import Members from "./Members";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import SearchUser from "./SearchUser";
import DummyUserGenerator from "./DummyUserGenerator";
import AdminTeam from "./AdminTeam";
import AdminPool from "./AdminPool";
function AdminLayout() {

  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <>
      <TopBar />

      <div className="admin-body">

        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="admin-content">

          {activeSection === "dashboard" && (
            <>
              <DashboardCards />
              <SearchUser />
              <DummyUserGenerator />
            </>
          )}

          {activeSection === "members" && <Members />}
          {activeSection === "team" && <AdminTeam />}
          {activeSection === "pool" && <AdminPool />}
        </main>

      </div>
    </>
  );
}

export default AdminLayout;