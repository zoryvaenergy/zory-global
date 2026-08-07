import { loginWallet } from "./loginWallet";
import { switchNetwork } from "../walletService";

/**
 * ==========================================
 * Join Now Controller
 * ZORY GLOBAL Web3 Flow
 * ==========================================
 */

export async function joinNow() {

  const result = await loginWallet();

  // Login Engine Error
  if (!result.success && !result.wallet) {
    return result;
  }

  // Network Check
  if (result.wallet?.chainId !== 56) {

    const switched = await switchNetwork();

    if (!switched) {

      throw new Error(
        "Please switch to BNB Smart Chain to continue."
      );

    }

    return await joinNow();

  }

  // New User
  if (
    !result.success &&
    result.action === "REGISTER"
  ) {

    return {

      action: "REGISTER",

      wallet: result.wallet,

    };

  }

  // Existing User
  if (
    result.success &&
    result.action === "LOGIN"
  ) {

    return {

      action: "LOGIN",

      userId: result.userId,

      user: result.user,

      wallet: result.wallet,

    };

  }

  return result;

}