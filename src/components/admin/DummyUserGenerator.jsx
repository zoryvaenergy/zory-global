import React, { useState } from "react";
import { generateDummyUsers } from "../../services/admin/dummyUserService";
function DummyUserGenerator() {
    const [loading, setLoading] = useState(false);
const [totalUsers, setTotalUsers] = useState(1);
async function handleGenerate() {
    console.log("🔥 Generate Button Clicked");
  try {
    setLoading(true);

    const result = await generateDummyUsers(totalUsers, "ZG2");

    console.log(result);

    alert("Dummy User Generated Successfully");

  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="admin-card">
      <h2>Dummy User Generator</h2>
<div style={{ marginBottom: "15px" }}>
  <label>Number of Users</label>

  <br />

  <input
    type="number"
    min="1"
    value={totalUsers}
    onChange={(e) => setTotalUsers(Number(e.target.value))}
    placeholder="Enter Number of Users"
  />
</div>
     <button onClick={handleGenerate} disabled={loading}>
  {loading ? "Generating..." : "Generate Dummy User"}
</button>
    </div>
  );
}

export default DummyUserGenerator;