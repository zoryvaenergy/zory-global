import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateLevelCounts } from "./updateLevelCounts";

export async function updateLevelSponsorChain(sponsorId) {
  let currentSponsor = sponsorId;

  while (currentSponsor) {
    await updateLevelCounts(currentSponsor);

    const profileRef = ref(
      database,
      `users/${currentSponsor}/profile`
    );

    const snapshot = await get(profileRef);

    if (!snapshot.exists()) {
      break;
    }

    currentSponsor = snapshot.val().sponsorId;
  }
}