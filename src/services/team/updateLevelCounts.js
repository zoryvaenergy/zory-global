import { ref, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { calculateLevelCounts } from "./calculateLevelCounts";

export async function updateLevelCounts(userId) {
  try {
    const result = await calculateLevelCounts(userId);

    const levelCounts = result.levelCounts;
    const levelMembers = result.levelMembers;

    // Convert Array -> Object
    const formattedLevelMembers = {};

    Object.keys(levelMembers).forEach((level) => {
      formattedLevelMembers[level] = {};

      levelMembers[level].forEach((memberId) => {
        formattedLevelMembers[level][memberId] = true;
      });
    });

    await update(ref(database, `users/${userId}/team`), {
      ...levelCounts,
      levelMembers: formattedLevelMembers,
    });

    console.log("✅ Level Counts Updated :", userId);
  } catch (error) {
    console.error("❌ updateLevelCounts Error :", error);
    throw error;
  }
}