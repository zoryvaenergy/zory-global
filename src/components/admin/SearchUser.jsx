import React, { useState } from "react";
import "../../styles/admin/searchUser.css";
import { getUserDetails } from "../../services/admin/getUserDetails";
import { verifyDirectCount } from "../../services/team/verifyDirectCount";
import { verifyTotalTeam } from "../../services/team/verifyTotalTeam";
import UserDebugCard from "./UserDebugCard";
import VerifyPanel from "./VerifyPanel";

function SearchUser() {

  const [userId, setUserId] = useState("");

  const [userData, setUserData] =
    useState(null);

  const [actualDirect, setActualDirect] =
    useState(0);

  const [actualTotalTeam, setActualTotalTeam] =
    useState(0);

  const [error, setError] =
    useState("");

  // ==========================
  // SEARCH USER
  // ==========================

  const handleSearch = async () => {

    if (!userId.trim()) {

      setError("Please enter User ID");

      setUserData(null);

      return;
    }

    try {

      const searchId =
        userId.trim();

      const user =
        await getUserDetails(searchId);

      if (!user) {

        setError("User Not Found");

        setUserData(null);

        return;
      }

      setError("");

      const directCount =
        await verifyDirectCount(searchId);

      const totalTeam =
        await verifyTotalTeam(searchId);

      setActualDirect(directCount);

      setActualTotalTeam(totalTeam);

      setUserData(user);

    } catch (error) {

      console.error(
        "Search User Error :",
        error
      );

      setError(
        "Unable to load user data"
      );

    }

  };

  return (

    <>

      {/* ==========================
          SEARCH USER
      ========================== */}

      <h3>
        Search User
      </h3>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              handleSearch();
            }

          }}
        />

        <button
          onClick={handleSearch}
        >
          Search
        </button>

      </div>


      {/* ==========================
          SEARCH ERROR
      ========================== */}

      {error && (
        <p className="search-error">
          {error}
        </p>
      )}


      {/* ==========================
          USER DEBUG CARD
      ========================== */}

      <UserDebugCard
        userData={userData}
      />


      {/* ==========================
          TEAM VERIFICATION
      ========================== */}

      <VerifyPanel

        savedDirect={
          userData?.team?.directCount || 0
        }

        actualDirect={
          actualDirect
        }

        savedTotalTeam={
          userData?.team?.totalTeam || 0
        }

        actualTotalTeam={
          actualTotalTeam
        }

      />

    </>

  );
}

export default SearchUser;