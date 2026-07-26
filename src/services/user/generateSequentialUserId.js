import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function generateSequentialUserId() {

  const counterRef = ref(database, "system/nextUserId");

  const result = await runTransaction(counterRef, (currentValue) => {

    if (currentValue === null) {
      return 2;
    }

    return currentValue + 1;

  });

  if (!result.committed) {
    throw new Error("User ID generation failed.");
  }

  const nextNumber = result.snapshot.val() - 1;

  return `ZG${nextNumber}`;

}