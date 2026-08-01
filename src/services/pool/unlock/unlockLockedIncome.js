import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function unlockLockedIncome(userId, poolKey) {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("User not found");
      return false;
    }

    const user = snapshot.val();

    const poolData = user.pools?.[poolKey];

    if (!poolData) {
      console.log("Pool data not found");
      return false;
    }

    const lockedAmount = Number(poolData.lockedAmount || 0);

    if (lockedAmount <= 0) {
      console.log("No locked income");
      return false;
    }

    if (poolData.isUnlocked === true) {
      console.log("Already unlocked");
      return false;
    }

    // Wallet
    const currentAvailable =
      Number(user.wallet?.availableBalance || 0);

    await update(userRef, {

      // Wallet Update
      "wallet/availableBalance":
        currentAvailable + lockedAmount,

      // Pool Update
      [`pools/${poolKey}/lockedAmount`]: 0,

      [`pools/${poolKey}/isLocked`]: false,

      [`pools/${poolKey}/isUnlocked`]: true,

      [`pools/${poolKey}/unlockDate`]:
        Date.now(),

    });

    console.log(`${poolKey} unlocked successfully`);

    return true;

  } catch (error) {

    console.error("Unlock Error :", error);

    return false;

  }
}