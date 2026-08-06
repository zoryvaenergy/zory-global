import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateWallet(userId, incomeType, amount) {
  const walletRef = ref(database, `users/${userId}/wallet`);

  const snap = await get(walletRef);

  if (!snap.exists()) {
    throw new Error("Wallet not found");
  }

  const wallet = snap.val();

  const updates = {
    mainWallet: (wallet.mainWallet || 0) + amount,
    totalIncome: (wallet.totalIncome || 0) + amount,
  };

  switch (incomeType) {
    case "direct":
      updates.directIncome = (wallet.directIncome || 0) + amount;
      break;

    case "level":
      updates.levelIncome = (wallet.levelIncome || 0) + amount;
      break;

    case "pool":
      updates.poolIncome = (wallet.poolIncome || 0) + amount;
      break;
  }

  await update(walletRef, updates);

  console.log("✅ Wallet Updated");
}