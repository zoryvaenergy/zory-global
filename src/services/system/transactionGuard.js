import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function transactionGuard(transactionId) {

  const transactionRef = ref(
    database,
    `system/processedTransactions/${transactionId}`
  );

  const result = await runTransaction(
    transactionRef,
    (currentData) => {

      // Already processed
      if (currentData !== null) {
        return;
      }

      // First request wins
      return {
        processed: true,
        createdAt: Date.now(),
      };
    }
  );

  // Only the request that successfully
  // created the transaction is allowed
  return result.committed;
}