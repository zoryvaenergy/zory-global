import { ref, get } from "firebase/database";
import { database } from "../../../firebase/firebaseConfig";

import { connectWallet } from "../connectWallet";
import { getCurrentWallet } from "../getCurrentWallet";
import { checkWallet } from "./checkWallet";

/**
 * ==========================================
 * ZORY GLOBAL
 * Wallet Login Controller
 * ==========================================
 */

export async function loginWallet() {

  try {
    // Current Connected Wallet
let wallet = await getCurrentWallet();

console.log("Current Wallet :", wallet);

// Connect if not connected
if (!wallet) {

  console.log(
    "Wallet not connected -> Calling connectWallet()"
  );

  wallet = await connectWallet();

} else {

  console.log(
    "Wallet already connected"
  );

}

    if (!wallet || !wallet.success) {

      return {
        success: false,
        action: "CONNECT_FAILED",
        message: wallet?.message || "Wallet connection failed",
      };

    }

    // Wallet Index
    const userId = await checkWallet(
      wallet.walletAddress
    );

    if (!userId) {

      return {
        success: false,
        action: "REGISTER",
        wallet,
      };

    }

    // Read User
    const snapshot = await get(
      ref(database, `users/${userId}`)
    );

    if (!snapshot.exists()) {

      return {
        success: false,
        action: "REGISTER",
        wallet,
      };

    }

    const user = snapshot.val();

    return {

      success: true,

      action: "LOGIN",

      userId,

      user,

      wallet,

    };

  } catch (error) {

    console.error("loginWallet Error :", error);

    return {

      success: false,

      action: "ERROR",

      message: error.message,

    };

  }

}