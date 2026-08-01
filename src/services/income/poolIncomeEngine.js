import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { POOL_PLANS } from "../../config/poolPlans";
import { distributePoolIncome } from "../pool/distributePoolIncome";
import { updateWallet } from "../wallet/updateWallet";
import { updateIncome } from "./updateIncome";
import { saveIncomeHistory } from "./incomeHistory";

export async function poolIncomeEngine(poolSequence, poolKey = "pool1") {
console.log("🔥 poolIncomeEngine START");
console.log("Pool Sequence :", poolSequence);
console.log("Pool Key :", poolKey);
  // ===========================
  // Sequence -> Owner UserId
  // ===========================

  const ownerSnapshot = await get(
    
    ref(
      database,
      `poolSystem/${poolKey}/sequenceIndex/${poolSequence}`
    )
  );

  if (!ownerSnapshot.exists()) {
    return;
  }

  const ownerUserId = ownerSnapshot.val();
console.log("Owner User :", ownerUserId);
  // ===========================
  // Owner Pool Data
  // ===========================

  const poolRef = ref(
    database,
    `users/${ownerUserId}/pools/${poolKey}`
  );

  const poolSnapshot = await get(poolRef);

  if (!poolSnapshot.exists()) {
    return;
  }

  const pool = poolSnapshot.val();

  // ===========================
  // Pool Plan
  // ===========================

  const plan = POOL_PLANS[poolKey];

  // Running Total Income
  let totalIncome = pool.totalIncome || 0;

  // ===========================
  // Step Income Engine
  // ===========================

  const steps = ["step1", "step2", "step3"];

  for (const stepKey of steps) {

    const config = plan.steps[stepKey];

    if (!config) {
      continue;
    }

    const count = pool[`${stepKey}Count`] || 0;
    const paid = pool[`${stepKey}Paid`] || false;

    // Step Not Complete
    if (count < config.users) {
      continue;
    }

    // Already Paid
    if (paid) {
      continue;
    }

    // Wallet
    await updateWallet(
      ownerUserId,
      "pool",
      config.income
    );

    // Income
    await updateIncome(
      ownerUserId,
      "pool",
      config.income
    );

    // History
    await saveIncomeHistory({
      userId: ownerUserId,
      type: "pool",
      amount: config.income,
      fromUserId: "POOL",
      remark: `${stepKey.toUpperCase()} Income`,
    });

    // Update Total Income
    totalIncome += config.income;

    // Mark Paid
    await update(poolRef, {
      [`${stepKey}Paid`]: true,
      totalIncome,
    });

    console.log(
      `✅ ${stepKey} Income Paid`,
      ownerUserId,
      config.income
    );

  }
  // ===========================
// Step 4 Financial Engine
// ===========================

const step4Config = plan.steps.step4;

const step4Count = pool.step4Count || 0;
const step4Paid = pool.step4Paid || false;
console.log("========== STEP4 DEBUG ==========");
console.log("Step4 Count :", step4Count);
console.log("Required :", step4Config.users);
console.log("Step4 Paid :", step4Paid);
console.log("=================================");
if (
  step4Config &&
  step4Count >= step4Config.users &&
  !step4Paid
) {

  console.log("🚀 Step4 Completed");
console.log("Calling distributePoolIncome...");
  const paid = await distributePoolIncome(
  ownerUserId,
  poolKey
);
console.log("Distribute Result :", paid);
if (paid) {

  await update(poolRef, {
    step4Paid: true,
  });

  console.log("✅ Step4 Marked As Paid");

}

}

}