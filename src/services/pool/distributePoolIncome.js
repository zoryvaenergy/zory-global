
import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { poolEntryEngine } from "./poolEntryEngine";
import { updatePoolWallet } from "../wallet/updatePoolWallet";
import { completePoolUpgrade } from "./completePoolUpgrade";
export async function distributePoolIncome(
  
  ownerUserId,
  poolKey = "pool1"
) {
console.log("===== distributePoolIncome START =====");
  // ===========================
  // User Pool Data
  // ===========================

  const poolSnapshot = await get(
    ref(database, `users/${ownerUserId}/pools/${poolKey}`)
  );

  if (!poolSnapshot.exists()) {
    return;
  }

  const pool = poolSnapshot.val();

  // ===========================
  // Current Pool Number
  // ===========================

  const currentPoolSnapshot = await get(
    ref(database, `users/${ownerUserId}/pools/currentPool`)
  );

  if (!currentPoolSnapshot.exists()) {
    return;
  }

  const currentPoolNumber = currentPoolSnapshot.val();

  // ===========================
  // Pool Financial Calculation
  // ===========================

  const entryResult = poolEntryEngine(currentPoolNumber);
console.log("Entry Result :", entryResult);
console.log("Auto Upgrade :", entryResult.autoUpgrade);
  console.log("Pool Entry Result :", entryResult);

  // ===========================
  // Direct Count
  // ===========================

  const directSnapshot = await get(
    ref(database, `users/${ownerUserId}/team/directCount`)
  );

  const directCount = directSnapshot.exists()
    ? directSnapshot.val()
    : 0;

  // ===========================
  // Required Direct Check
  // ===========================

  const requiredDirect = entryResult.requiredDirect;

  const isEligible = directCount >= requiredDirect;

  console.log("Direct Count :", directCount);
  console.log("Required Direct :", requiredDirect);
  console.log("Eligible :", isEligible);
// ===========================
// Pool Wallet Update
// ===========================

await updatePoolWallet(
  ownerUserId,
  entryResult.payableIncome,
  !isEligible
);

console.log(
  "✅ Pool Wallet Updated",
  entryResult.payableIncome
);
 await update(
  ref(database, `users/${ownerUserId}/pools/${poolKey}`),
  {
    lockedAmount: !isEligible
      ? entryResult.payableIncome
      : 0,

    isLocked: !isEligible,

    isUnlocked: isEligible,

    unlockDate: isEligible
      ? Date.now()
      : null,
  }
);

console.log("✅ Pool Lock Status Updated");
// ===========================
// Auto Pool Upgrade
// ===========================

if (entryResult.autoUpgrade) {

  console.log("🚀 Starting Pool Upgrade...");

  await completePoolUpgrade(ownerUserId);

  console.log("✅ Pool Upgrade Completed");

}

console.log("===== distributePoolIncome END =====");
return true;
}
