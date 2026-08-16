import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateToken } from "./updateToken";
import { saveTokenHistory } from "./tokenHistory";
import { transactionGuard } from "../system/transactionGuard";

export async function levelTokenEngine(userId) {

  // ==========================
  // New User
  // ==========================

  const userRef = ref(database, `users/${userId}`);
  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    console.log("❌ User Not Found");
    return;
  }

  const user = userSnap.val();

  let currentSponsor = user.profile?.sponsorId;
  let level = 1;

  // ==========================
  // Level 1 → Level 5
  // ==========================

  while (currentSponsor && level <= 5) {

    console.log(`========== TOKEN LEVEL ${level} ==========`);

    // ==========================
    // Duplicate Protection
    // ==========================

    const transactionId = `LEVEL_TOKEN_${userId}_${level}`;

    const allowed = await transactionGuard(transactionId);

    if (!allowed) {

      console.log(
        `⚠️ Level ${level} Token Already Processed`
      );

    } else {

      // ==========================
      // Give 100 ZORY
      // ==========================

      await updateToken(currentSponsor, 100);

      // ==========================
      // Token History
      // ==========================

      await saveTokenHistory({
        userId: currentSponsor,
        amount: 100,
        fromUserId: userId,
        type: "level",
        remark: `Level ${level} Token Reward`,
      });

      console.log(
        `✅ Level ${level} Token +100 given to ${currentSponsor}`
      );
    }

    // ==========================
    // Next Sponsor
    // ==========================

    const sponsorRef = ref(
      database,
      `users/${currentSponsor}/profile`
    );

    const sponsorSnap = await get(sponsorRef);

    if (!sponsorSnap.exists()) {

      console.log(
        `❌ Sponsor Chain End At Level ${level}`
      );

      break;
    }

    currentSponsor = sponsorSnap.val().sponsorId;

    level++;
  }

  console.log("✅ Level Token Engine Finished");
}