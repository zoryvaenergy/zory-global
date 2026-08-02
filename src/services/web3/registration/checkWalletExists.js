import { ref, get } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

export async function checkWalletExists(walletAddress) {

  if (!walletAddress) {
    return false;
  }

  const snapshot = await get(ref(database, "users"));

  if (!snapshot.exists()) {
    return false;
  }

  const users = snapshot.val();

  for (const userId in users) {

    const user = users[userId];

    const savedWallet =
      user.wallet?.address || "";

    if (
      savedWallet &&
      savedWallet.toLowerCase() ===
        walletAddress.toLowerCase()
    ) {
      return true;
    }
  }

  return false;
}