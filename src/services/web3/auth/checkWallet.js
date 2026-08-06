import { ref, get } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

/**
 * ==========================================
 * ZORY GLOBAL
 * Check Wallet Registration
 * ==========================================
 */

export async function checkWallet(walletAddress) {

  try {

    if (!walletAddress) {
      throw new Error("Wallet Address Required");
    }

    console.log("Checking Wallet :", walletAddress);

    const walletRef = ref(
      database,
      `walletIndex/${walletAddress}`
    );

    const snapshot = await get(walletRef);

    if (!snapshot.exists()) {

      console.log("Wallet Not Registered");

      return null;

    }

    const userId = snapshot.val();

    console.log("Wallet Registered :", userId);

    return userId;

  } catch (error) {

    console.error("checkWallet Error :", error);

    throw error;

  }

}