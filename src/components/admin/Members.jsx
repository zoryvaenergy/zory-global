import React, { useEffect, useState } from "react";
import "../../styles/admin/members.css";
import { getAllUsers } from "../../services/admin/getAllUsers";
import MemberDetails from "./MemberDetails";

function Members() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);

    const data = await getAllUsers();

    setUsers(data);
    setLoading(false);
  }

  const filteredUsers = users.filter(
    (user) =>
      user.userId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.profile?.sponsorId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.wallet?.address
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const activeMembers = users.filter(
    (user) => user.auth?.status === "ACTIVE"
  ).length;

  return (
    <div className="members-page">

      {/* ================= HEADER ================= */}

      <div className="members-header">

        <div>
          <h2>Members</h2>
          <p>ZORY GLOBAL registered members</p>
        </div>

        <button onClick={loadUsers}>
          Refresh
        </button>

      </div>


      {/* ================= STATS ================= */}

      <div className="members-stats">

        <div className="member-stat-card">
          <span>Total Members</span>
          <strong>{users.length}</strong>
        </div>

        <div className="member-stat-card">
          <span>Active Members</span>
          <strong>{activeMembers}</strong>
        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="members-search">

        <input
          type="text"
          placeholder="Search User ID, Sponsor ID or Wallet"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      {/* ================= MEMBER DETAILS ================= */}

      {selectedUser && (
        <MemberDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}


      {/* ================= MEMBERS TABLE ================= */}

      <div className="members-table-card">

        {loading ? (

          <p className="members-loading">
            Loading members...
          </p>

        ) : filteredUsers.length === 0 ? (

          <p className="members-empty">
            No members found.
          </p>

        ) : (

          <div className="members-table-wrapper">

            <table className="members-table">

              <thead>

                <tr>
                  <th>User ID</th>
                  <th>Wallet</th>
                  <th>Sponsor</th>
                  <th>Status</th>
                  <th>Pool</th>
                </tr>

              </thead>


              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user.userId}
                    onClick={() => setSelectedUser(user)}
                    className="member-row"
                  >

                    <td>
                      <strong className="member-user-id">
                        {user.userId}
                      </strong>
                    </td>

                    <td>
                      {user.wallet?.address
                        ? `${user.wallet.address.slice(
                            0,
                            6
                          )}...${user.wallet.address.slice(-4)}`
                        : "-"}
                    </td>

                    <td>
                      {user.profile?.sponsorId || "-"}
                    </td>

                    <td>

                      <span
                        className={
                          user.auth?.status === "ACTIVE"
                            ? "member-status active"
                            : "member-status"
                        }
                      >
                        {user.auth?.status || "UNKNOWN"}
                      </span>

                    </td>

                    <td>
                      {user.pools?.currentPool || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Members;