import { ref, set, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function saveUser(userId, userData) {

  // Save User
  await set(
    ref(database, "users/" + userId),
    userData
  );

  // Save Wallet Index
  const walletAddress = userData.wallet.address;

  if (walletAddress) {

    await update(ref(database), {
      [`walletIndex/${walletAddress.toLowerCase()}`]: userId,
    });

    console.log(
      "Wallet Index Saved :",
      walletAddress.toLowerCase(),
      "=>",
      userId
    );

  }

}