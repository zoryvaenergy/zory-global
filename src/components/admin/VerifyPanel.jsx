import React from "react";
import "../../styles/admin/verifyPanel.css";

function VerifyPanel({

  savedDirect,
  actualDirect,

  savedTotalTeam,
  actualTotalTeam,

}) {

  const pass = savedDirect === actualDirect;
  const totalPass = savedTotalTeam === actualTotalTeam;

  return (

    <div className="verify-panel">

      <h3>Team Verification</h3>

      {/* Direct Verification */}

      <h4>Direct Verification</h4>

      <div className="verify-grid">

        <p><strong>Saved Direct Count</strong></p>
        <p>{savedDirect}</p>

        <p><strong>Actual Direct Count</strong></p>
        <p>{actualDirect}</p>

        <p><strong>Status</strong></p>
        <p className={pass ? "pass" : "fail"}>
          {pass ? "PASS ✅" : "FAIL ❌"}
        </p>

      </div>

      <hr />

      {/* Total Team Verification */}

      <h4>Total Team Verification</h4>

      <div className="verify-grid">

        <p><strong>Saved Total Team</strong></p>
        <p>{savedTotalTeam}</p>

        <p><strong>Actual Total Team</strong></p>
        <p>{actualTotalTeam}</p>

        <p><strong>Status</strong></p>
        <p className={totalPass ? "pass" : "fail"}>
          {totalPass ? "PASS ✅" : "FAIL ❌"}
        </p>

      </div>

    </div>

  );

}

export default VerifyPanel;