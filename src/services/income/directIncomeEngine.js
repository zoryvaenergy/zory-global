import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateWallet } from "../wallet/updateWallet";
import { saveIncomeHistory } from "./incomeHistory";
import { transactionGuard } from "../system/transactionGuard";
import { updateIncome } from "./updateIncome";
export async function directIncomeEngine(userId) {
  // Registered User
  const userRef = ref(database, `users/${userId}`);
  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    console.log("❌ User Not Found");
    return;
  }

  const user = userSnap.val();
  const sponsorId = user.profile?.sponsorId;
  // Duplicate Protection
const transactionId = `DIRECT_${userId}`;

const allowed = await transactionGuard(transactionId);

if (!allowed) {
  console.log("⚠️ Direct Income Already Processed");
  return;
}

  // No Sponsor
  if (!sponsorId) {
    console.log("❌ Sponsor Not Found");
    return;
  }

  // Sponsor Exists?
  const sponsorRef = ref(database, `users/${sponsorId}`);
  const sponsorSnap = await get(sponsorRef);

  if (!sponsorSnap.exists()) {
    console.log("❌ Invalid Sponsor");
    return;
  }

  // Give Direct Income
  await updateWallet(sponsorId, "direct", 2);
  await updateIncome(sponsorId, "direct", 2);
await saveIncomeHistory({
  userId: sponsorId,
  type: "direct",
  amount: 2,
  fromUserId: userId,
  remark: "Direct Referral Income",
});
  console.log(`✅ Direct Income +2 given to ${sponsorId}`);
}