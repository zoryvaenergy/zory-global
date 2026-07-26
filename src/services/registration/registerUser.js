
import { validateSponsor } from "./validateSponsor";
import { updateDirectCount } from "../team/updateDirectCount";
import { updateSponsorChain } from "../team/updateSponsorChain";
import { validateRegistration } from "./validateRegistration";
import { generateSequentialUserId } from "../user/generateSequentialUserId";
import { createUserModel } from "../../models/userModel";
import { saveUser } from "../user/saveUser";
import { assignPoolSequence } from "../pool/assignPoolSequence";
import { updatePoolCounts } from "../pool/updatePoolCounts";

export async function registerUser(data) {

  // Step 1
  validateRegistration(data);
  // Step 1.5 : Check Founder Registration
  await validateSponsor(data.sponsorId);
  // Step 2
  const userId = await generateSequentialUserId();

  console.log("User ID :", userId);

  // Step 3
  const userData = createUserModel({
    firebaseUid: null,
    userId,
    fullName: data.fullName,
    mobile: data.mobile,
    email: data.email,
    password: data.password,
    sponsorId: data.sponsorId,
  });

  console.log(userData);

  // Step 4
  await saveUser(userId, userData);

  console.log("User Saved Successfully");
// Step 5 : Assign Pool Sequence
const poolResult = await assignPoolSequence(userId);

console.log("Pool Result :", poolResult);

// Parent Count Update
await updatePoolCounts(
  poolResult.parentSequence,
  poolResult.currentStep
);
console.log("✅ Pool Count Updated");

console.log("➡️ Calling updateDirectCount");

await updateDirectCount(data.sponsorId);

console.log("✅ updateDirectCount Finished");
    await updateSponsorChain(data.sponsorId);

console.log("✅ Sponsor Chain Updated");
// Update Level Counts (Sponsor Chain)


console.log("✅ Level Counts Updated");
 return {
  success: true,
  userId,
  fullName: userData.profile.fullName,
  sponsorId: userData.profile.sponsorId,
  status: userData.auth.status,
};
}