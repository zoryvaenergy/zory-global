import React from "react";
import "../../styles/admin/memberDetails.css";

function MemberDetails({ user, onClose }) {
  if (!user) {
    return null;
  }

  // ================= ACCOUNT =================

  const userId =
    user.userId ||
    user.profile?.userId ||
    "-";

  const sponsorId =
    user.profile?.sponsorId ||
    user.sponsorId ||
    "-";

  const status =
    user.auth?.status ||
    "UNKNOWN";

  const provider =
    user.wallet?.provider ||
    "-";


  // ================= WALLET =================

  const walletAddress =
    user.wallet?.address ||
    user.walletAddress ||
    "-";

  const network =
    user.wallet?.network ||
    "-";

  const chainId =
    user.wallet?.chainId ||
    "-";


  // ================= TEAM / LEVEL =================

  const directCount =
    user.team?.directCount ?? 0;

  const totalTeam =
    user.team?.totalTeam ?? 0;

  const level1 =
    user.team?.level1Count ?? 0;

  const level2 =
    user.team?.level2Count ?? 0;

  const level3 =
    user.team?.level3Count ?? 0;

  const level4 =
    user.team?.level4Count ?? 0;

  const level5 =
    user.team?.level5Count ?? 0;

  const level6 =
    user.team?.level6Count ?? 0;

  const level7 =
    user.team?.level7Count ?? 0;

  const level8 =
    user.team?.level8Count ?? 0;

  const level9 =
    user.team?.level9Count ?? 0;

  const level10 =
    user.team?.level10Count ?? 0;


  // ================= POOL =================

  const pool1 =
    user.pools?.pool1 || {};

  const currentPool =
    user.pools?.currentPool ??
    user.pool?.currentPool ??
    1;

  const sequence =
    pool1.sequence ?? "-";

  const parentSequence =
    pool1.parentSequence ?? "-";

  const currentStep =
    pool1.currentStep ?? "-";


  // ================= TOKEN =================

  const zoryBalance =
    user.token?.zoryBalance ??
    user.token?.balance ??
    user.wallet?.zoryBalance ??
    user.wallet?.balance ??
    0;


  // ================= INCOME =================

  const totalIncome =
    user.income?.totalIncome ??
    user.income?.total ??
    0;

  const availableIncome =
    user.income?.availableIncome ??
    user.income?.available ??
    0;

  const withdrawnIncome =
    user.income?.withdrawn ??
    user.income?.withdrawnIncome ??
    0;


  return (
    <div className="member-details">

      {/* ================= HEADER ================= */}

      <div className="member-details-header">

        <div>

          <span className="member-details-label">
            MEMBER DETAILS
          </span>

          <h2>
            {userId}
          </h2>

        </div>

        <div className="member-details-actions">

          <span
            className={
              status === "ACTIVE"
                ? "member-details-status active"
                : "member-details-status"
            }
          >
            {status}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="member-details-close"
          >
            Close
          </button>

        </div>

      </div>


      {/* ================= ACCOUNT ================= */}

      <div className="member-details-section">

        <h3>Account Information</h3>

        <div className="member-details-grid">

          <div className="member-detail-item">
            <span>User ID</span>
            <strong>{userId}</strong>
          </div>

          <div className="member-detail-item">
            <span>Status</span>
            <strong>{status}</strong>
          </div>

          <div className="member-detail-item">
            <span>Sponsor ID</span>
            <strong>{sponsorId}</strong>
          </div>

          <div className="member-detail-item">
            <span>Provider</span>
            <strong>{provider}</strong>
          </div>

        </div>

      </div>


      {/* ================= WALLET ================= */}

      <div className="member-details-section">

        <h3>Wallet Information</h3>

        <div className="member-details-grid">

          <div className="member-detail-item full">

            <span>Wallet Address</span>

            <strong className="wallet-address">
              {walletAddress}
            </strong>

          </div>

          <div className="member-detail-item">

            <span>Network</span>

            <strong>
              {network}
            </strong>

          </div>

          <div className="member-detail-item">

            <span>Chain ID</span>

            <strong>
              {chainId}
            </strong>

          </div>

        </div>

      </div>


      {/* ================= TEAM & LEVEL ================= */}

      <div className="member-details-section">

        <h3>Team & Level Details</h3>

        <div className="member-details-grid">

          <div className="member-detail-item">
            <span>Direct Team</span>
            <strong>{directCount}</strong>
          </div>

          <div className="member-detail-item">
            <span>Total Team</span>
            <strong>{totalTeam}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 1</span>
            <strong>{level1}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 2</span>
            <strong>{level2}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 3</span>
            <strong>{level3}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 4</span>
            <strong>{level4}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 5</span>
            <strong>{level5}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 6</span>
            <strong>{level6}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 7</span>
            <strong>{level7}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 8</span>
            <strong>{level8}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 9</span>
            <strong>{level9}</strong>
          </div>

          <div className="member-detail-item">
            <span>Level 10</span>
            <strong>{level10}</strong>
          </div>

        </div>

      </div>


      {/* ================= POOL ================= */}

      <div className="member-details-section">

        <h3>Pool Information</h3>

        <div className="member-details-grid">

          <div className="member-detail-item">
            <span>Current Pool</span>
            <strong>{currentPool}</strong>
          </div>

          <div className="member-detail-item">
            <span>Sequence</span>
            <strong>{sequence}</strong>
          </div>

          <div className="member-detail-item">
            <span>Parent Sequence</span>
            <strong>{parentSequence}</strong>
          </div>

          <div className="member-detail-item">
            <span>Current Step</span>
            <strong>{currentStep}</strong>
          </div>

        </div>

      </div>


      {/* ================= ZORY TOKEN ================= */}

      <div className="member-details-section">

        <h3>ZORY Token</h3>

        <div className="member-details-grid">

          <div className="member-detail-item">

            <span>ZORY Balance</span>

            <strong>
              {zoryBalance}
            </strong>

          </div>

        </div>

      </div>


      {/* ================= INCOME ================= */}

      <div className="member-details-section">

        <h3>Income</h3>

        <div className="member-details-grid">

          <div className="member-detail-item">

            <span>Total Income</span>

            <strong>
              {totalIncome}
            </strong>

          </div>

          <div className="member-detail-item">

            <span>Available Income</span>

            <strong>
              {availableIncome}
            </strong>

          </div>

          <div className="member-detail-item">

            <span>Withdrawn</span>

            <strong>
              {withdrawnIncome}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MemberDetails;