/**
 * ==========================================
 * ZORY GLOBAL
 * Universal Wallet Launcher
 * ==========================================
 */

import { launchOkx } from "./okxLauncher";

export async function launchWallet(walletId) {

  try {

    switch (walletId) {

      case "okx":
        return await launchOkx();

      case "tokenpocket":
        console.log("Launch TokenPocket");
        return;

      case "metamask":
        console.log("Launch MetaMask");
        return;

      case "trustwallet":
        console.log("Launch Trust Wallet");
        return;

      default:
        console.warn("Unknown Wallet :", walletId);
        return;

    }

  } catch (error) {

    console.error("Wallet Launch Error :", error);

    return {
      success: false,
      message: error.message
    };

  }

}