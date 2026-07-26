import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function verifyTotalTeam(userId) {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return 0;
  }

  const users = snapshot.val();

  function countChildren(parentId) {

    let total = 0;

    Object.values(users).forEach((user) => {

      if (user.profile?.sponsorId === parentId) {

        total++;

        total += countChildren(user.profile.userId);

      }

    });

    return total;

  }

  return countChildren(userId);

}