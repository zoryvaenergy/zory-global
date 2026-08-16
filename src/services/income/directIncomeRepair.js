import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateWallet } from "../wallet/updateWallet";
import { updateIncome } from "./updateIncome";
import { saveIncomeHistory } from "./incomeHistory";
import { verifyDirectCount } from "../team/verifyDirectCount";
import { transactionGuard } from "../system/transactionGuard";

const DIRECT_INCOME_AMOUNT = 5;

export async function directIncomeRepair(userId) {

  // ==========================
  // User Check
  // ==========================

  const userRef = ref(
    database,
    `users/${userId}`
  );

  const userSnap = await get(userRef);

  if (!userSnap.exists()) {
    return {
      success: false,
      message: "User Not Found",
    };
  }

  // ==========================
  // Actual Direct Count
  // ==========================

  const actualDirect =
    await verifyDirectCount(userId);

  // ==========================
  // Expected Direct Income
  // ==========================

  const expectedDirect =
    actualDirect *
    DIRECT_INCOME_AMOUNT;

  // ==========================
  // Current Wallet
  // ==========================

  const walletRef = ref(
    database,
    `users/${userId}/wallet`
  );

  const walletSnap =
    await get(walletRef);

  if (!walletSnap.exists()) {
    return {
      success: false,
      message: "Wallet Not Found",
    };
  }

  const wallet =
    walletSnap.val();

  const savedDirect =
    Number(
      wallet.directIncome || 0
    );

  // ==========================
  // Difference
  // ==========================

  const difference =
    expectedDirect -
    savedDirect;

  // ==========================
  // Already Correct
  // ==========================

  if (
    Math.abs(difference) < 0.001
  ) {

    return {
      success: true,
      repaired: false,
      actualDirect,
      expectedDirect,
      savedDirect,
      difference: 0,
      message:
        "Direct Income Already Correct",
    };
  }

  // ==========================
  // Overpaid Protection
  // ==========================

  if (difference < 0) {

    return {
      success: false,
      repaired: false,
      actualDirect,
      expectedDirect,
      savedDirect,
      difference,
      message:
        "Saved Direct Income is higher than expected. No automatic deduction performed.",
    };
  }

  // ==========================
  // REPAIR TRANSACTION GUARD
  // ==========================

  const transactionId =
    `DIRECT_REPAIR_${userId}`;

  const allowed =
    await transactionGuard(
      transactionId
    );

  if (!allowed) {

    return {
      success: false,
      repaired: false,
      actualDirect,
      expectedDirect,
      savedDirect,
      difference,
      message:
        "Direct Income Repair Already Processed",
    };
  }

  // ==========================
  // Repair Missing Income
  // ==========================

  await updateWallet(
    userId,
    "direct",
    difference
  );

  await updateIncome(
    userId,
    "direct",
    difference
  );

  // ==========================
  // Repair History
  // ==========================

  await saveIncomeHistory({
    userId,
    type: "repair",
    amount: difference,
    fromUserId: "SYSTEM",
    remark:
      `Direct Income Repair: ${actualDirect} Direct Users × $${DIRECT_INCOME_AMOUNT}`,
  });

  // ==========================
  // Result
  // ==========================

  console.log(
    `🔧 Direct Income Repaired +$${difference} for ${userId}`
  );

  return {
    success: true,
    repaired: true,
    actualDirect,
    expectedDirect,
    savedDirect,
    difference,
    message:
      "Direct Income Repaired Successfully",
  };
}