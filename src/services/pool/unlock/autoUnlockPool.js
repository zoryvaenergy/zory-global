import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { POOL_PLANS } from "../../config/poolPlans";
import { unlockLockedIncome } from "./unlockLockedIncome";

export async function autoUnlockPool(userId) {
  try {
    // User Data
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("User not found");
      return false;
    }

    const user = snapshot.val();

    // Current Pool
    const currentPoolNumber = user.pools?.currentPool;

    if (!currentPoolNumber) {
      console.log("Current Pool not found");
      return false;
    }

    const poolKey = `pool${currentPoolNumber}`;

    // Pool Plan
    const plan = POOL_PLANS[poolKey];

    if (!plan) {
      console.log("Pool Plan not found");
      return false;
    }

    // Required Direct
    const requiredDirect = plan.requiredDirect;

    // User Direct Count
    const directCount = user.team?.directCount || 0;

    // Pool Data
    const poolData = user.pools?.[poolKey];

    if (!poolData) {
      console.log("Pool data not found");
      return false;
    }

    // Already Unlocked
    if (poolData.isUnlocked === true) {
      return false;
    }

    // Nothing Locked
    if ((poolData.lockedAmount || 0) <= 0) {
      return false;
    }

    // Condition Not Complete
    if (directCount < requiredDirect) {
      return false;
    }

    // Unlock
    await unlockLockedIncome(userId, poolKey);

    return true;

  } catch (error) {
    console.error("Auto Unlock Error :", error);
    return false;
  }
}