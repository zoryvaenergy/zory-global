import React, { useState } from "react";
import "../../styles/admin/searchUser.css";
import { getUserDetails } from "../../services/admin/getUserDetails";
import { verifyDirectCount } from "../../services/team/verifyDirectCount";
import { verifyTotalTeam } from "../../services/team/verifyTotalTeam";
import UserDebugCard from "./UserDebugCard";
import VerifyPanel from "./VerifyPanel";
function SearchUser() {

  const [userId, setUserId] = useState("");

 const handleSearch = async () => {

  if (!userId.trim()) {

    setError("Please enter User ID");

    setUserData(null);

    return;

  }

  const user = await getUserDetails(userId.trim());

  if (!user) {

    setError("User Not Found");

    setUserData(null);

    return;

  }

  setError("");

const directCount = await verifyDirectCount(userId.trim());
const totalTeam = await verifyTotalTeam(userId.trim());

setActualDirect(directCount);
setActualTotalTeam(totalTeam);

setUserData(user);

};
const [userData, setUserData] = useState(null);
const [actualDirect, setActualDirect] = useState(0);
const [actualTotalTeam, setActualTotalTeam] = useState(0);
const [error, setError] = useState("");
  return (

  <div className="search-user-card">

    <h3>Search User</h3>

    <div className="search-box">

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

    </div>

    {error && (
      <p className="search-error">
        {error}
      </p>
    )}

    <UserDebugCard userData={userData} />
<VerifyPanel
    savedDirect={userData?.team?.directCount || 0}
    actualDirect={actualDirect}
    savedTotalTeam={userData?.team?.totalTeam || 0}
    actualTotalTeam={actualTotalTeam}
/>
  </div>

);

}

export default SearchUser;