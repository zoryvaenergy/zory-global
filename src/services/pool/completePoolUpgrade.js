import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

import { assignPoolSequence } from "./assignPoolSequence";
import { updatePoolCounts } from "./updatePoolCounts";

export async function completePoolUpgrade(userId) {
console.log("🚀 completePoolUpgrade START");
console.log("User :", userId);
  // Current Pool
  const snapshot = await get(
    ref(database, `users/${userId}/pools/currentPool`)
  );

  if (!snapshot.exists()) {
    throw new Error("Current Pool Not Found");
  }

  const currentPool = snapshot.val();
console.log("Current Pool :", currentPool);
  // pool1 -> 1
  const currentNumber = Number(currentPool);

  // Max Pool
  if (currentNumber >= 10) {
    return;
  }

  // Next Pool
  const nextPool = `pool${currentNumber + 1}`;
console.log("Next Pool :", nextPool);
  // Join Next Pool
  const poolResult = await assignPoolSequence(
    userId,
    nextPool
  );
console.log("Pool Assigned :", poolResult);
  await updatePoolCounts(
    poolResult.parentSequence,
    nextPool
  );

  // Update Current Pool
  await update(
  ref(database, `users/${userId}`),
  {
    "pools/currentPool": currentNumber + 1,
  }
);
console.log("✅ completePoolUpgrade FINISHED");
  return poolResult;
}