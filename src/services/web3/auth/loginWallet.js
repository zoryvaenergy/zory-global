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

    // Step 1 : Current Connected Wallet
    let wallet = await getCurrentWallet();

    // Step 2 : Connect if not connected
    if (!wallet) {

      wallet = await connectWallet();

    }

    // Step 3 : Connection Failed
    if (!wallet || !wallet.success) {

      return {
        success: false,
        action: "CONNECT_FAILED",
        message: wallet?.message || "Wallet connection failed",
      };

    }

    // Step 4 : Wallet Registered?
    const userId = await checkWallet(wallet.walletAddress);

    // New User
    if (!userId) {

      return {
        success: false,
        action: "REGISTER",
        wallet,
      };

    }

    // Existing User
    return {

      success: true,
      action: "LOGIN",
      userId,
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