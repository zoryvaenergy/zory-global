import { ref, get, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function transactionGuard(transactionId) {
  const transactionRef = ref(
    database,
    `system/processedTransactions/${transactionId}`
  );

  const snapshot = await get(transactionRef);

  // Already Processed
  if (snapshot.exists()) {
    return false;
  }

  // Mark as Processed
  await set(transactionRef, {
    processed: true,
    createdAt: Date.now(),
  });

  return true;
}