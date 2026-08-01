import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { buildAncestorChain } from "./buildAncestorChain";
import { poolIncomeEngine } from "../income/poolIncomeEngine";

export async function updatePoolCounts(parentSequence, poolKey = "pool1") {

  // Root User
  if (parentSequence === 0) {
    return;
  }

  // सभी Parent ऊपर तक निकालो
  const ancestorChain = await buildAncestorChain(parentSequence, poolKey);

  console.log("========================================");
  console.log("🚀 updatePoolCounts Started");
  console.log("Parent Sequence :", parentSequence);
  console.log("Ancestor Chain Length :", ancestorChain.length);
  console.log("========================================");

  for (let i = 0; i < ancestorChain.length; i++) {

    const ancestor = ancestorChain[i];

    const userRef = ref(database, "users/" + ancestor.userId);

    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      console.log("❌ User Not Found :", ancestor.userId);
      continue;
    }

    const userData = snapshot.val();

    const pool = userData?.pools?.[poolKey] || {};

    const step1Count = pool.step1Count || 0;
    const step2Count = pool.step2Count || 0;
    const step3Count = pool.step3Count || 0;
    const step4Count = pool.step4Count || 0;
    const totalMembers = pool.totalMembers || 0;

    const updates = {
      [`pools/${poolKey}/totalMembers`]: totalMembers + 1,
    };

    let newStep1 = step1Count;
    let newStep2 = step2Count;
    let newStep3 = step3Count;
    let newStep4 = step4Count;

    // Level = Ancestor Distance
    const level = i + 1;

    console.log("----------------------------------------");
    console.log("👤 User :", ancestor.userId);
    console.log("Sequence :", ancestor.sequence);
    console.log("Parent Sequence :", ancestor.parentSequence);
    console.log("Level :", level);

    console.log("Old Counts :", {
      step1Count,
      step2Count,
      step3Count,
      step4Count,
      totalMembers,
    });

    switch (level) {

      case 1:
        newStep1++;
        updates[`pools/${poolKey}/step1Count`] = newStep1;
        break;

      case 2:
        newStep2++;
        updates[`pools/${poolKey}/step2Count`] = newStep2;
        break;

      case 3:
        newStep3++;
        updates[`pools/${poolKey}/step3Count`] = newStep3;
        break;

      case 4:
        newStep4++;
        updates[`pools/${poolKey}/step4Count`] = newStep4;
        break;

      default:
        break;
    }

    let currentStep = pool.currentStep || 1;

// पहले Pool Complete था या नहीं
const wasCompleted = pool.completed || false;

// अभी की Current Status
let completed = wasCompleted;

    // Step Progress
    if (newStep1 >= 3) {
      currentStep = 2;
    }

    if (newStep2 >= 9) {
      currentStep = 3;
    }

    if (newStep3 >= 27) {
      currentStep = 4;
    }

    if (newStep4 >= 81) {
      currentStep = 4;
      completed = true;
    }
    // यह Registration से पहली बार Complete हुआ है?
const justCompleted = !wasCompleted && completed;
    updates[`pools/${poolKey}/currentStep`] = currentStep;
    updates[`pools/${poolKey}/completed`] = completed;

    console.log("New Counts :", {
      newStep1,
      newStep2,
      newStep3,
      newStep4,
      currentStep,
      completed,
    });

    console.log("Firebase Updates :", updates);

    await update(userRef, updates);

    console.log("✅ Firebase Updated :", ancestor.userId);

    // Pool Income Engine
    // यदि Pool पहले से Complete नहीं है तभी Income Engine चलाओ
   console.log(
  "DEBUG =>",
  ancestor.userId,
  "completed:",
  completed,
  "step4:",
  newStep4
);
    // Registration के बाद भी चलाओ,
// और Pool पहली बार Complete होने पर भी चलाओ.
if (!wasCompleted || justCompleted) {

  await poolIncomeEngine(
    ancestor.sequence,
    poolKey
  );

  console.log(
    "💰 Income Engine Executed :",
    ancestor.userId
  );

}

    console.log("----------------------------------------");
  }

  console.log("🏁 updatePoolCounts Finished");
  console.log("========================================");
}