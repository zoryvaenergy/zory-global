import { assignPoolSequence } from "../pool/assignPoolSequence";
import { updatePoolCounts } from "../pool/updatePoolCounts";
import { updateDirectCount } from "../team/updateDirectCount";
import { updateSponsorChain } from "../team/updateSponsorChain";
import { directIncomeEngine } from "../income/directIncomeEngine";
import { tokenEngine } from "../token/tokenEngine";
import { levelTokenEngine } from "../token/levelTokenEngine";
import { levelIncomeEngine } from "../income/levelIncomeEngine";
import { updateLevelSponsorChain } from "../team/updateLevelSponsorChain";

export async function completeRegistration(userId, sponsorId) {

  // Step 1 : Pool Entry
  const poolResult = await assignPoolSequence(userId);

  console.log("Pool Result :", poolResult);

  // Step 2 : Pool Count Update
  await updatePoolCounts(poolResult.parentSequence);

  console.log("✅ Pool Count Updated");

  // Step 3 : Direct Team Update
  await updateDirectCount(sponsorId);

  console.log("✅ Direct Team Updated");

  // Step 4 : Sponsor Chain Update
  await updateSponsorChain(sponsorId);

  console.log("✅ Sponsor Chain Updated");

  await updateLevelSponsorChain(sponsorId);

  console.log("✅ Level Sponsor Chain Updated");

  // =====================================
  // Step 5 : Direct Income
  // =====================================

  try {

    await directIncomeEngine(userId);

    console.log("✅ Direct Income Added");

  } catch (error) {

    console.error("❌ DIRECT INCOME ERROR :", error);

    throw error;

  }

  // =====================================
  // Step 6 : Level Income
  // =====================================

  try {

    await levelIncomeEngine(userId);

    console.log("✅ Level Income Added");

  } catch (error) {

    console.error("❌ LEVEL INCOME ERROR :", error);

    throw error;

  }

  // =====================================
  // Step 7 : Token Engine
  // =====================================

  try {

    await tokenEngine(userId);

    console.log("✅ Token Bonus Added");

  } catch (error) {

    console.error("❌ TOKEN ENGINE ERROR :", error);

    throw error;

  }
// =====================================
// Step 8 : Level Token Engine
// =====================================

try {

  await levelTokenEngine(userId);

  console.log("✅ Level Token Bonus Added");

} catch (error) {

  console.error("❌ LEVEL TOKEN ENGINE ERROR :", error);

  throw error;

}
  console.log("✅ Registration Completed");

  return poolResult;
}