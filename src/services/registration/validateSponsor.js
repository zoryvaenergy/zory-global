import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { checkFirstUser } from "./checkFirstUser";

export async function validateSponsor(sponsorId) {

  // Check First User
  const isFirstUser = await checkFirstUser();

  // Founder Registration
  if (isFirstUser) {
    return true;
  }

  // Sponsor Required
  if (!sponsorId) {
    throw new Error("Sponsor ID is required");
  }

  // Check Sponsor Exists
  const sponsorRef = ref(database, `users/${sponsorId}`);

  const snapshot = await get(sponsorRef);

  if (!snapshot.exists()) {
    throw new Error("Invalid Sponsor ID");
  }

  return true;
}