import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateDirectCount(sponsorId) {

  console.log("======================================");
  console.log("🚀 updateDirectCount START");
  console.log("📌 Sponsor ID :", sponsorId);

  // Founder Case
  if (!sponsorId) {
    console.log("⚠️ Founder Registration - No Sponsor");
    return;
  }

  const teamRef = ref(database, `users/${sponsorId}/team`);

  console.log("📍 Team Path :", `users/${sponsorId}/team`);

  const result = await runTransaction(teamRef, (team) => {

    console.log("--------------------------------------");
    console.log("🔥 Transaction Callback");
    console.log("Current Team :", team);

    // Team Node Missing
    if (team === null) {

      console.log("⚠️ Team Node Missing - Creating Team");

      return {
        directCount: 1,

        level1Count: 0,
        level2Count: 0,
        level3Count: 0,
        level4Count: 0,
        level5Count: 0,
        level6Count: 0,
        level7Count: 0,
        level8Count: 0,
        level9Count: 0,
        level10Count: 0,

        totalTeam: 1,
      };

    }

    console.log("Direct Before :", team.directCount);
    console.log("Total Before :", team.totalTeam);

    const updatedTeam = {
      ...team,
      directCount: (team.directCount || 0) + 1,
      totalTeam: (team.totalTeam || 0) + 1,
    };

    console.log("✅ Updated Team :", updatedTeam);

    return updatedTeam;

  });

  console.log("======================================");
  console.log("🏁 Transaction Finished");
  console.log("Committed :", result.committed);

  if (result.snapshot.exists()) {
    console.log("📦 Final Team :", result.snapshot.val());
  }

  console.log("======================================");

}