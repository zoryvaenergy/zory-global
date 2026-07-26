import { useEffect, useState } from "react";
import "../../styles/dashboard/cards.css";

function UserCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );

    console.log("CURRENT USER :", currentUser);

    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="dashboard-card">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h3>User Details</h3>

      <p>
        <strong>Name :</strong>{" "}
        {user.profile?.fullName || "N/A"}
      </p>

      <p>
        <strong>User ID :</strong>{" "}
        {user.profile?.userId || "N/A"}
      </p>

      <p>
  <strong>Sponsor ID :</strong>{" "}
  {user.profile?.sponsorId
    ? user.profile.sponsorId
    : "ROOT USER"}
</p>

      <p>
        <strong>Status :</strong>{" "}
        {user.auth?.status || "N/A"}
      </p>
    </div>
  );
}

export default UserCard;