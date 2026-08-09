import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import "../../styles/admin/adminPool.css";
import { getUserDetails } from "../../services/admin/getUserDetails";

function AdminPool() {

  const [poolData, setPoolData] = useState({
    lastSequence: 0,
  });

  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState("");

  const [userData, setUserData] = useState(null);

  const [searchError, setSearchError] = useState("");

  const [searching, setSearching] = useState(false);


  // ========================================
  // POOL 1 FINANCIAL CALCULATION
  // ========================================

  const pool1 = userData?.pools?.pool1 || {};

  const directCount =
    userData?.team?.directCount || 0;

  const requiredDirect = 2;
const pool1Completed = pool1.completed === true;
  const directQualified =
    directCount >= requiredDirect;

  const step4Income = 81;

  const pool2Entry = 10;

  const netIncome =
    step4Income - pool2Entry;


  // ========================================
  // USER POOL SEARCH
  // ========================================

  const handlePoolUserSearch = async () => {

    const searchId = userId.trim();

    if (!searchId) {

      setSearchError("Please enter User ID");

      setUserData(null);

      return;
    }

    setSearching(true);

    setSearchError("");

    setUserData(null);

    try {

      const user =
        await getUserDetails(searchId);

      if (!user) {

        setSearchError("User Not Found");

        return;
      }

      if (!user.pools?.pool1) {

        setSearchError(
          "Pool 1 data not found for this user"
        );

        return;
      }

      setUserData(user);

    } catch (error) {

      console.error(
        "Pool User Search Error :",
        error
      );

      setSearchError(
        "Unable to load user Pool 1 data"
      );

    } finally {

      setSearching(false);

    }

  };
  useEffect(() => {

    const poolRef = ref(
      database,
      "poolSystem/pool1"
    );

    const unsubscribe = onValue(poolRef, (snapshot) => {

      if (snapshot.exists()) {

        const data = snapshot.val();

        setPoolData({
          lastSequence: Number(data.lastSequence || 0),
        });

      } else {

        setPoolData({
          lastSequence: 0,
        });

      }

      setLoading(false);

    });

    return () => unsubscribe();

  }, []);

  const totalMembers = poolData.lastSequence;

  const maxMembers = 120;

  const remainingMembers =
    Math.max(maxMembers - totalMembers, 0);

  const progress =
    Math.min(
      (totalMembers / maxMembers) * 100,
      100
    );

  let currentStep = 0;

  if (totalMembers >= 1 && totalMembers <= 3) {
    currentStep = 1;
  } else if (totalMembers <= 12) {
    currentStep = 2;
  } else if (totalMembers <= 39) {
    currentStep = 3;
  } else if (totalMembers <= 120) {
    currentStep = 4;
  }

  const completed =
    totalMembers >= maxMembers;

  if (loading) {

    return (
      <section className="admin-pool">

        <div className="pool-loading">
          Loading Pool 1...
        </div>

      </section>
    );

  }

  return (

    <section className="admin-pool">

      {/* HEADER */}

      <div className="admin-pool-header">

        <div>

          <span className="admin-pool-label">
            POOL MANAGEMENT
          </span>

          <h1>
            Pool 1
          </h1>

          <p>
            Pool 1 overview and progress monitoring
          </p>

        </div>

        <div
          className={`pool-status ${
            completed
              ? "completed"
              : "active"
          }`}
        >
          {completed
            ? "Completed"
            : "Active"}
        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="pool-summary-grid">

        <div className="pool-summary-card">

          <span className="pool-card-icon">
            👥
          </span>

          <div>

            <span>
              Pool Members
            </span>

            <strong>
              {totalMembers}
            </strong>

          </div>

        </div>


        <div className="pool-summary-card">

          <span className="pool-card-icon">
            🎯
          </span>

          <div>

            <span>
              Pool Capacity
            </span>

            <strong>
              {maxMembers}
            </strong>

          </div>

        </div>


        <div className="pool-summary-card">

          <span className="pool-card-icon">
            📊
          </span>

          <div>

            <span>
              Current Step
            </span>

            <strong>
              {currentStep === 0
                ? "-"
                : `Step ${currentStep}`}
            </strong>

          </div>

        </div>


        <div className="pool-summary-card">

          <span className="pool-card-icon">
            ⏳
          </span>

          <div>

            <span>
              Remaining
            </span>

            <strong>
              {remainingMembers}
            </strong>

          </div>

        </div>

      </div>
{/* =========================
    USER POOL SEARCH
========================= */}

<div className="pool-search-card">

  <div className="pool-section-title">

    <div>

      <span>
        USER POOL SEARCH
      </span>

      <h2>
        Search Pool 1 Member
      </h2>

    </div>

  </div>

  <div className="pool-search-box">

    <input
      type="text"
      placeholder="Enter User ID"
      value={userId}
      onChange={(e) => {
        setUserId(e.target.value);
        setSearchError("");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handlePoolUserSearch();
        }
      }}
    />

    <button
      onClick={handlePoolUserSearch}
      disabled={searching}
    >
      {searching ? "Searching..." : "Search"}
    </button>

  </div>

  {searchError && (
    <p className="pool-search-error">
      {searchError}
    </p>
  )}

</div>
{userData && (
  <div className="pool-user-details">

    <div className="pool-user-header">

      <div>

        <span>
          USER POOL PROFILE
        </span>

        <h2>
          {userData.userId || userId}
        </h2>

      </div>

      <div
        className={`pool-user-status ${
          userData.pools?.pool1?.completed
            ? "completed"
            : "active"
        }`}
      >
        {userData.pools?.pool1?.completed
          ? "Pool Completed"
          : "Pool Active"}
      </div>

    </div>

    <div className="pool-user-grid">

      <div>
        <span>Current Step</span>
        <strong>
          Step {userData.pools?.pool1?.currentStep || 1}
        </strong>
      </div>

      <div>
        <span>Total Members</span>
        <strong>
          {userData.pools?.pool1?.totalMembers || 0}
        </strong>
      </div>

      <div>
        <span>Step 1</span>
        <strong>
          {userData.pools?.pool1?.step1Count || 0} / 3
        </strong>
      </div>

      <div>
        <span>Step 2</span>
        <strong>
          {userData.pools?.pool1?.step2Count || 0} / 9
        </strong>
      </div>

      <div>
        <span>Step 3</span>
        <strong>
          {userData.pools?.pool1?.step3Count || 0} / 27
        </strong>
      </div>

      <div>
        <span>Step 4</span>
        <strong>
          {userData.pools?.pool1?.step4Count || 0} / 81
        </strong>
      </div>

      <div>
        <span>Total Income</span>
        <strong>
          ${userData.pools?.pool1?.totalIncome || 0}
        </strong>
      </div>

      <div>
        <span>Locked Amount</span>
        <strong>
          ${userData.pools?.pool1?.lockedAmount || 0}
        </strong>
      </div>

    </div>

    <div className="pool-user-meta">

      <div>
        <span>Sequence</span>
        <strong>
          {userData.pools?.pool1?.sequence || "-"}
        </strong>
      </div>

      <div>
        <span>Parent Sequence</span>
        <strong>
          {userData.pools?.pool1?.parentSequence || 0}
        </strong>
      </div>

      <div>
        <span>Position</span>
        <strong>
          {userData.pools?.pool1?.position || "-"}
        </strong>
      </div>

      <div>
        <span>Wallet Status</span>
        <strong>
          {userData.pools?.pool1?.isLocked
            ? "Locked"
            : "Unlocked"}
        </strong>
      </div>

    </div>

  </div>
)}
{userData && (
  <div className="pool-financial-card">

    <div className="section-label">
      POOL 1 FINANCIAL & UPGRADE
    </div>

    <h3>Completion & Wallet Status</h3>

    <div className="pool-financial-grid">

      <div className="financial-item">
        <span>Step 4 Income</span>
        <strong>${step4Income}</strong>
      </div>

      <div className="financial-item">
        <span>Required Direct</span>
        <strong>{requiredDirect}</strong>
      </div>

      <div className="financial-item">
        <span>User Direct</span>
        <strong>{directCount}</strong>
      </div>

      <div className="financial-item">
        <span>Direct Requirement</span>
        <strong>
          {directQualified ? "✓ Qualified" : "✕ Not Qualified"}
        </strong>
      </div>

      <div className="financial-item">
        <span>Pool 2 Entry</span>
        <strong>${pool2Entry}</strong>
      </div>

      <div className="financial-item">
        <span>Net Income</span>
        <strong>${netIncome}</strong>
      </div>
     <div className="financial-item">
  <span>Wallet Result</span>

  <strong>
    {!pool1Completed
      ? "⏳ Pool 1 Pending"
      : directQualified
        ? `✓ Main Wallet $${netIncome}`
        : `🔒 Locked $${netIncome}`}
  </strong>
</div>
    </div>

  </div>
)}
      {/* PROGRESS */}

      <div className="pool-progress-card">

        <div className="pool-section-title">

          <div>

            <span>
              POOL 1 PROGRESS
            </span>

            <h2>
              Member Distribution
            </h2>

          </div>

          <strong>
            {Math.round(progress)}%
          </strong>

        </div>


        <div className="pool-progress">

          <div
            className="pool-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <div className="pool-progress-info">

          <span>
            {totalMembers} / {maxMembers} Members
          </span>

          <span>
            {remainingMembers} Remaining
          </span>

        </div>

      </div>


      {/* STEPS */}

      <div className="pool-steps-card">

        <div className="pool-section-title">

          <div>

            <span>
              POOL STRUCTURE
            </span>

            <h2>
              Pool 1 Steps
            </h2>

          </div>

        </div>


        <div className="pool-steps">

          <div
            className={`pool-step ${
              totalMembers >= 3
                ? "completed"
                : currentStep === 1
                ? "active"
                : ""
            }`}
          >

            <div className="step-number">
              01
            </div>

            <div className="step-content">

              <h3>
                Step 1
              </h3>

              <p>
                3 Members
              </p>

            </div>

            <strong>
              $3
            </strong>

          </div>


          <div
            className={`pool-step ${
              totalMembers >= 12
                ? "completed"
                : currentStep === 2
                ? "active"
                : ""
            }`}
          >

            <div className="step-number">
              02
            </div>

            <div className="step-content">

              <h3>
                Step 2
              </h3>

              <p>
                9 Members
              </p>

            </div>

            <strong>
              $9
            </strong>

          </div>


          <div
            className={`pool-step ${
              totalMembers >= 39
                ? "completed"
                : currentStep === 3
                ? "active"
                : ""
            }`}
          >

            <div className="step-number">
              03
            </div>

            <div className="step-content">

              <h3>
                Step 3
              </h3>

              <p>
                27 Members
              </p>

            </div>

            <strong>
              $27
            </strong>

          </div>


          <div
            className={`pool-step ${
              totalMembers >= 120
                ? "completed"
                : currentStep === 4
                ? "active"
                : ""
            }`}
          >

            <div className="step-number">
              04
            </div>

            <div className="step-content">

              <h3>
                Step 4
              </h3>

              <p>
                81 Members
              </p>

            </div>

            <strong>
              $81
            </strong>

          </div>

        </div>

      </div>


      {/* POOL CONFIG */}

      <div className="pool-config-card">

        <div>

          <span>
            PLAN ENTRY
          </span>

          <strong>
            $7
          </strong>

        </div>

        <div>

          <span>
            POOL ENTRY
          </span>

          <strong>
            $2
          </strong>

        </div>

        <div>

          <span>
            BASE INCOME
          </span>

          <strong>
            $1
          </strong>

        </div>

        <div>

          <span>
            TOTAL INCOME
          </span>

          <strong>
            $120
          </strong>

        </div>

      </div>

    </section>

  );
}

export default AdminPool;