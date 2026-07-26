import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updatePoolCounts(parentSequence, currentStep) {

  // Root User का Parent नहीं होता
  if (parentSequence === 0) {
    return;
  }

  // Sequence Index से Parent User ID निकालें
  const indexRef = ref(
    database,
    "poolSystem/pool1/sequenceIndex/" + parentSequence
  );

  const indexSnapshot = await get(indexRef);

  if (!indexSnapshot.exists()) {
    throw new Error("Parent User Not Found");
  }

  const parentUserId = indexSnapshot.val();

  // Parent User Data
  const parentRef = ref(database, "users/" + parentUserId);

  const parentSnapshot = await get(parentRef);

  if (!parentSnapshot.exists()) {
    throw new Error("Parent Data Not Found");
  }

  const parentData = parentSnapshot.val();

  const pool = parentData.pools.pool1 || {};

  const step1Count = pool.step1Count || 0;
  const totalMembers = pool.totalMembers || 0;

  await update(parentRef, {
    "pools/pool1/step1Count": step1Count + 1,
    "pools/pool1/totalMembers": totalMembers + 1,
  });

  console.log("✅ Parent Pool Updated :", parentUserId);

}