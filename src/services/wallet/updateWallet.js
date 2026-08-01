import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateWallet(userId, incomeType, amount) {
  const walletRef = ref(database, `users/${userId}/wallet`);

  await runTransaction(walletRef, (wallet) => {
    if (!wallet) return wallet;

    // Main Wallet
    wallet.mainWallet = (wallet.mainWallet || 0) + amount;

    // Total Income
    wallet.totalIncome = (wallet.totalIncome || 0) + amount;

    // Income Type Wise
    switch (incomeType) {
      case "direct":
        wallet.directIncome = (wallet.directIncome || 0) + amount;
        break;

      case "level":
        wallet.levelIncome = (wallet.levelIncome || 0) + amount;
        break;

      case "pool":
        wallet.poolIncome = (wallet.poolIncome || 0) + amount;
        break;

      default:
        break;
    }

    return wallet;
  });
}