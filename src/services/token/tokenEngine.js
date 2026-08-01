import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateToken } from "./updateToken";
import { saveTokenHistory } from "./tokenHistory";
import { transactionGuard } from "../system/transactionGuard";

export async function tokenEngine(userId) {
  // New User
  const userRef = ref(database, `users/${userId}`);
  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    console.log("❌ User Not Found");
    return;
  }

  const user = userSnap.val();
  const sponsorId = user.profile?.sponsorId;

  // Duplicate Protection
  const transactionId = `TOKEN_REG_${userId}`;

  const allowed = await transactionGuard(transactionId);

  if (!allowed) {
    console.log("⚠️ Token Bonus Already Processed");
    return;
  }

  // 1. New User Bonus
  await updateToken(userId, 500);

  await saveTokenHistory({
    userId,
    amount: 500,
    fromUserId: "SYSTEM",
    type: "registration",
    remark: "Registration Bonus",
  });

  // 2. Sponsor Bonus
  if (sponsorId) {
    const sponsorRef = ref(database, `users/${sponsorId}`);
    const sponsorSnap = await get(sponsorRef);

    if (sponsorSnap.exists()) {
      await updateToken(sponsorId, 100);

      await saveTokenHistory({
        userId: sponsorId,
        amount: 100,
        fromUserId: userId,
        type: "referral",
        remark: "Referral Token Bonus",
      });
    }
  }

  console.log("✅ Token Bonus Distributed");
}