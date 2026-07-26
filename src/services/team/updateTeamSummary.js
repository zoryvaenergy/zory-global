import { ref, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

import {
  calculateDirectCount,
  calculateTotalTeam,
} from "./teamEngine";

import { calculateLevelCounts } from "./calculateLevelCounts";

export async function updateTeamSummary(userId) {

  if (!userId) return;

  const directCount = await calculateDirectCount(userId);

  const totalTeam = await calculateTotalTeam(userId);

  const levelCounts = await calculateLevelCounts(userId);

  await update(
    ref(database, `users/${userId}/team`),
    {
      directCount,
      totalTeam,
      ...levelCounts,
    }
  );

}