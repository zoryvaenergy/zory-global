import { validateSponsor } from "./validateSponsor";
import { validateRegistration } from "./validateRegistration";
import { generateSequentialUserId } from "../user/generateSequentialUserId";
import { createUserModel } from "../../models/userModel";
import { saveUser } from "../user/saveUser";
import { completeRegistration } from "./completeRegistration";
import {
  acquireRegistrationLock,
  releaseRegistrationLock,
} from "../system/registrationLock";

export async function registerUser(data) {
  // Step 1
  validateRegistration(data);

  // Step 1.5
  await validateSponsor(data.sponsorId);

  // Registration Lock
  const lockAcquired = await acquireRegistrationLock(data.walletAddress);

  if (!lockAcquired) {
    throw new Error(
      "Registration is already in progress. Please wait a few seconds."
    );
  }

  try {
    // Step 2
    const userId = await generateSequentialUserId();

    console.log("User ID :", userId);

    // Step 3
    console.log("Wallet Address :", data.walletAddress);
console.log("Provider :", data.provider);
console.log("Network :", data.network);
console.log("Chain ID :", data.chainId);
   
const userData = createUserModel({
  firebaseUid: null,
  userId,
  sponsorId: data.sponsorId,

  walletAddress: data.walletAddress,
  provider: data.provider,
  network: data.network,
  chainId: data.chainId,
});
    console.log(userData);

    // Step 4
    await saveUser(userId, userData);

    console.log("User Saved Successfully");

    await completeRegistration(userId, data.sponsorId);

    console.log("✅ Registration Completed");

    return {
  success: true,
  userId,
  sponsorId: userData.profile.sponsorId,
  status: userData.auth.status,
};
  } finally {

  console.log("🔓 Releasing Lock :", data.walletAddress);

await releaseRegistrationLock(data.walletAddress);

console.log("✅ Lock Released :", data.walletAddress);

}
}
