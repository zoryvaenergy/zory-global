function LevelTeam({ levelTeam, searchTerm }) {
  const filteredTeam = levelTeam.filter((user) => {
    const search = (searchTerm || "").toLowerCase();

    return (
      user.profile?.userId?.toLowerCase().includes(search) ||
      user.profile?.fullName?.toLowerCase().includes(search) ||
      user.profile?.mobile?.includes(search)
    );
  });

  return (
    <div className="partners-table">
      <table className="partners-data-table">
        <thead className="partners-table-head">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Level</th>
            <th>Join Date</th>
          </tr>
        </thead>

        <tbody className="partners-table-body">
          {filteredTeam.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Level Partner Found
              </td>
            </tr>
          ) : (
            filteredTeam.map((user) => (
              <tr key={user.profile.userId}>
                <td>{user.profile.userId}</td>
                <td>{user.profile.fullName}</td>
                <td>{user.profile.mobile}</td>
                <td>{user.level}</td>
                <td>{user.profile.joinDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LevelTeam;