import {
  ref,
  runTransaction,
  update,
} from "firebase/database";
import { findPoolPosition } from "./findPoolPosition";
import { database } from "../../firebase/firebaseConfig";

export async function assignPoolSequence(userId) {

  // Pool 1 Sequence Counter
  const sequenceRef = ref(database, "poolSystem/pool1/lastSequence");

  // Atomic Sequence Generate
  const result = await runTransaction(sequenceRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });

  if (!result.committed) {
    throw new Error("Pool Sequence Generate Failed");
  }

  const sequence = result.snapshot.val();

  // Pool Position
  const poolPosition = await findPoolPosition(sequence);

 // Save User Pool Data
await update(ref(database, "users/" + userId), {

  "pools/pool1/sequence": sequence,

  "pools/pool1/parentSequence": poolPosition.parentSequence,

  "pools/pool1/currentStep": poolPosition.step,

});

// Create Sequence Index
await update(ref(database, "poolSystem/pool1"), {

  ["sequenceIndex/" + sequence]: userId,

});

  console.log("Pool Position :", poolPosition);

  return {
  sequence,
  parentSequence: poolPosition.parentSequence,
  currentStep: poolPosition.step,
};
}