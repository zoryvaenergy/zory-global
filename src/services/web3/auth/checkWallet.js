import { ref, get } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

/**
 * Check Wallet Registration
 */

export async function checkWallet(walletAddress) {

  if (!walletAddress) {
    throw new Error("Wallet Address Required");
  }

  const snapshot = await get(
    ref(database, `walletIndex/${walletAddress}`)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();

}