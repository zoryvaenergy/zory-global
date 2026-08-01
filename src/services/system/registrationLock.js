import { ref, runTransaction, remove } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

// Registration Lock Create
export async function acquireRegistrationLock(mobile) {
  const lockRef = ref(database, `system/registrationLocks/${mobile}`);

  const result = await runTransaction(lockRef, (currentData) => {
    // अगर Lock पहले से मौजूद है
    if (currentData !== null) {
      return;
    }

    // नया Lock बनाओ
    return {
      processing: true,
      createdAt: Date.now(),
    };
  });
console.log("==================================");
console.log("Mobile :", mobile);
console.log("Committed :", result.committed);
console.log("Snapshot :", result.snapshot.val());
console.log("==================================");
  return result.committed;
}

// Registration Lock Remove
export async function releaseRegistrationLock(mobile) {
  const lockRef = ref(database, `system/registrationLocks/${mobile}`);

  await remove(lockRef);
}