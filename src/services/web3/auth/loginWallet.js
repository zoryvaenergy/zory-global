import { connectWallet } from "../connectWallet";
import { checkWallet } from "./checkWallet";

/**
 * Wallet Login Controller
 */

export async function loginWallet() {

  // Connect Wallet
  const wallet = await connectWallet();

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