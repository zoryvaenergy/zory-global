import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function verifyDirectCount(userId) {

  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return 0;
  }

  const users = snapshot.val();

  let count = 0;

  Object.values(users).forEach((user) => {

    if (user.profile?.sponsorId === userId) {
      count++;
    }

  });

  return count;

}