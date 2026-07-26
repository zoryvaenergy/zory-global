import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { updateTeamSummary } from "./updateTeamSummary";

export async function updateSponsorChain(sponsorId) {

  let currentSponsor = sponsorId;

  while (currentSponsor) {

    await updateTeamSummary(currentSponsor);
     
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