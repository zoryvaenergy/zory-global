import { connectWallet } from "../connectWallet";
import { getCurrentWallet } from "../getCurrentWallet";
import { checkWallet } from "./checkWallet";

/**
 * Wallet Login Controller
 */

export async function loginWallet() {

  // Check if wallet is already connected
let wallet = await getCurrentWallet();

// If not connected, connect now
if (!wallet) {

  wallet = await connectWallet();

}

  if (!wallet.success) {
    return wallet;
  }

  // Check Wallet
  const userId = await checkWallet(wallet.walletAddress);

  if (!userId) {

    return {
  success: false,
  action: "REGISTER",
  wallet,
};

  }

  return {
  success: true,
  action: "LOGIN",
  userId,
  wallet,
};

}