import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { checkFirstUser } from "./checkFirstUser";

export async function validateSponsor(sponsorId) {

  const isFirstUser = await checkFirstUser();

  console.log("isFirstUser =", isFirstUser);

  const snapshot = await get(ref(database, "users"));
  console.log("users exists =", snapshot.exists());
  console.log("users value =", snapshot.val());

  if (isFirstUser) {
    console.log("Founder Registration");
    return true;
  }

  if (!sponsorId) {
    throw new Error("Sponsor ID is required");
  }

  const sponsorRef = ref(database, `users/${sponsorId}`);
  const sponsorSnapshot = await get(sponsorRef);

  if (!sponsorSnapshot.exists()) {
    throw new Error("Invalid Sponsor ID");
  }

  return true;
}