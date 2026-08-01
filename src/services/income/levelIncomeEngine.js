import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateWallet } from "../wallet/updateWallet";
import { updateIncome } from "./updateIncome";
import { saveIncomeHistory } from "./incomeHistory";
import { transactionGuard } from "../system/transactionGuard";
export async function levelIncomeEngine(userId) {
  // Registered User
  const userRef = ref(database, `users/${userId}`);
  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    console.log("❌ User Not Found");
    return;
  }

  const user = userSnap.val();

  let currentSponsor = user.profile?.sponsorId;

  let level = 1;

  while (currentSponsor && level <= 10) {
    console.log(`Level ${level} Sponsor : ${currentSponsor}`);
   // Duplicate Protection
const transactionId = `LEVEL_${userId}_${level}`;

const allowed = await transactionGuard(transactionId);

if (allowed) {

  await updateWallet(currentSponsor, "level", 0.20);

  await updateIncome(currentSponsor, "level", 0.20);

  await saveIncomeHistory({
    userId: currentSponsor,
    type: "level",
    amount: 0.20,
    fromUserId: userId,
    remark: `Level ${level} Income`,
  });

  console.log(
    `✅ Level ${level} Income +0.20 given to ${currentSponsor}`
  );
}
    const sponsorRef = ref(database, `users/${currentSponsor}/profile`);
    const sponsorSnap = await get(sponsorRef);

    if (!sponsorSnap.exists()) {
      break;
    }

    currentSponsor = sponsorSnap.val().sponsorId;

    level++;
  }
}