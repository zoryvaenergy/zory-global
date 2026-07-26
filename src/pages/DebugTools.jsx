import { repairDirectCount } from "../services/team/repairDirectCount";

function DebugTools() {

  async function handleRepair() {
    await repairDirectCount();
    alert("Repair Completed");
  }

  return (
    <div>
      <h1>Debug Tools</h1>

      <button onClick={handleRepair}>
        Repair Direct Count
      </button>

    </div>
  );
}

export default DebugTools;