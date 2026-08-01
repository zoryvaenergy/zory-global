import {
  ref,
  runTransaction,
  update,
} from "firebase/database";
import { findPoolPosition } from "./findPoolPosition";
import { database } from "../../firebase/firebaseConfig";

export async function assignPoolSequence(userId, poolKey = "pool1") {

  // Pool 1 Sequence Counter
  const sequenceRef = ref(database, `poolSystem/${poolKey}/lastSequence`);

  // Atomic Sequence Generate
  const result = await runTransaction(sequenceRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });

  if (!result.committed) {
    throw new Error("Pool Sequence Generate Failed");
  }

  const sequence = result.snapshot.val();

  // Pool Position
  const poolPosition = await findPoolPosition(sequence, poolKey);

 
// Save User Pool Data
await update(ref(database, "users/" + userId), {

  [`pools/${poolKey}/sequence`]: sequence,

  [`pools/${poolKey}/parentSequence`]:
    poolPosition.parentSequence,

  [`pools/${poolKey}/currentStep`]:
    poolPosition.step,
 
    
  
  // New Fields
  [`pools/${poolKey}/completed`]: false,

  [`pools/${poolKey}/joinedAt`]:
    Date.now(),

  [`pools/${poolKey}/lockedAmount`]: 0,

  [`pools/${poolKey}/isLocked`]: false,

  [`pools/${poolKey}/isUnlocked`]: false,

  [`pools/${poolKey}/unlockDate`]: null,

});
// Create Sequence Index
await update(ref(database, `poolSystem/${poolKey}`), {

  ["sequenceIndex/" + sequence]: userId,

});

  console.log("Pool Position :", poolPosition);

  return {
  sequence,
  parentSequence: poolPosition.parentSequence,
  currentStep: poolPosition.step,
  position: poolPosition.position,
};
}