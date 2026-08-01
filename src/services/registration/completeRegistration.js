import { assignPoolSequence } from "../pool/assignPoolSequence";
import { updatePoolCounts } from "../pool/updatePoolCounts";
import { updateDirectCount } from "../team/updateDirectCount";
import { updateSponsorChain } from "../team/updateSponsorChain";
import { directIncomeEngine } from "../income/directIncomeEngine";
import { tokenEngine } from "../token/tokenEngine";
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
  // Step 5 : Direct Income
  await directIncomeEngine(userId);

  console.log("✅ Direct Income Added");
await levelIncomeEngine(userId);

console.log("✅ Level Income Added");
  // Step 6 : Token Bonus
  await tokenEngine(userId);

  console.log("✅ Token Bonus Added");

  return poolResult;
}