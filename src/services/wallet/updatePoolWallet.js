import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updatePoolWallet(
  userId,
  amount,
  isLocked = false
) {

  const walletRef = ref(database, `users/${userId}/wallet`);

  await runTransaction(walletRef, (wallet) => {

    if (!wallet) {
      return wallet;
    }

    // Lifetime Income
    wallet.poolIncome = (wallet.poolIncome || 0) + amount;
    wallet.totalIncome = (wallet.totalIncome || 0) + amount;

    if (isLocked) {

      // Locked Wallet
      wallet.lockedWallet =
        (wallet.lockedWallet || 0) + amount;

    } else {

      // Main Wallet
      wallet.mainWallet =
        (wallet.mainWallet || 0) + amount;

    }

    return wallet;

  });

}