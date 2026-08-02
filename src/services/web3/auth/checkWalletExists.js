import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function checkWalletExists(walletAddress) {
if (!walletAddress) {
  return null;
}
  const usersRef = ref(database, "users");

  const snapshot = await get(usersRef);

  if (!snapshot.exists()) {
    return null;
  }

  const users = snapshot.val();

  for (const userId in users) {

    const user = users[userId];

    if (
    user?.wallet?.address?.toLowerCase() ===
walletAddress.toLowerCase()
    ) {
      return user;
    }

  }

  return null;
}