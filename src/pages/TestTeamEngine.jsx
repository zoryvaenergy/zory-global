import { useState } from "react";
import {
  calculateDirectCount,
  calculateTotalTeam,
} from "../services/team/teamEngine";

import { calculateLevelCounts } from "../services/team/calculateLevelCounts";

export default function TestTeamEngine() {

  const [userId, setUserId] = useState("");
  const [directCount, setDirectCount] = useState(null);
  const [totalTeam, setTotalTeam] = useState(null);
  const [levelCounts, setLevelCounts] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {

    if (!userId.trim()) {
      alert("Enter User ID");
      return;
    }

    setLoading(true);

    try {

      const direct = await calculateDirectCount(userId.trim());

      const total = await calculateTotalTeam(userId.trim());

const levels = await calculateLevelCounts(userId.trim());

setDirectCount(direct);

setTotalTeam(total);

setLevelCounts(levels);

    } catch (error) {

      console.error(error);

      alert("Error while checking Team Engine");

    }

    setLoading(false);

  }

  return (
    <div style={{ padding: 30 }}>

      <h2>Team Engine Test</h2>

      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Checking..." : "Check Team"}
      </button>

      <br />
      <br />

      <h3>Results</h3>

      <p>
        <strong>Direct Count :</strong> {directCount}
      </p>

      <p>
        <strong>Total Team :</strong> {totalTeam}
      </p>
       {levelCounts && (

  <div>

    <h3>Level Counts</h3>

    <pre>
      {JSON.stringify(levelCounts, null, 2)}
    </pre>

  </div>

)}
    </div>
  );

}