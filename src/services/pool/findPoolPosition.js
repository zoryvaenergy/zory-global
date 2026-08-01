import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function findPoolPosition(sequence, poolKey = "pool1") {

  const poolRef = ref(database, `poolSystem/${poolKey}`);

  const snapshot = await get(poolRef);

  if (!snapshot.exists()) {
    throw new Error(`Pool data not found: ${poolKey}`);
  }

  const poolData = snapshot.val();
let step = 1;
let parentSequence = 0;

// Root User
// Root User
if (sequence === 1) {

  step = 1;
  parentSequence = 0;

} else {

  parentSequence = Math.floor((sequence - 2) / 3) + 1;

}
return {
  sequence,
  step,
  parentSequence,
  poolData,
};
}