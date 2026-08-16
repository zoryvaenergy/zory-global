import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateToken } from "./updateToken";
import { saveTokenHistory } from "./tokenHistory";
import { transactionGuard } from "../system/transactionGuard";

export async function tokenEngine(userId) {

  // ==========================
  // New User
  // ==========================

  const userRef = ref(database, `users/${userId}`);
  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    console.log("❌ User Not Found");
    return;
  }

  // ==========================
  // Duplicate Protection
  // ==========================

  const transactionId = `TOKEN_REG_${userId}`;

  const allowed = await transactionGuard(transactionId);

  if (!allowed) {
    console.log("⚠️ Registration Token Already Processed");
    return;
  }

  // ==========================
  // Registration Bonus
  // ==========================

  await updateToken(userId, 500);

  await saveTokenHistory({
    userId,
    amount: 500,
    fromUserId: "SYSTEM",
    type: "registration",
    remark: "Registration Bonus",
  });

  console.log("✅ Registration Token Bonus +500 given");

}