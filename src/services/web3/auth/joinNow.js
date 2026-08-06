import { loginWallet } from "./loginWallet";
import { switchNetwork } from "../walletService";
/**
 * Join Now Controller
 * ZORY GLOBAL Web3 Flow
 */

export async function joinNow() {

  const result = await loginWallet();
  if (!result.success && !result.wallet) {
  return result;
}
if (result.wallet?.chainId !== 56) {

  const switched = await switchNetwork();

  if (!switched) {
    throw new Error(
      "Please switch to BNB Smart Chain to continue."
    );
  }

  // Switch के बाद दोबारा Wallet Details लें
  return await joinNow();

}
  if (!result.success && result.action === "REGISTER") {
    return {
      action: "REGISTER",
      wallet: result.wallet,
    };
  }

  if (result.success && result.action === "LOGIN") {
    return {
      action: "LOGIN",
      userId: result.userId,
      wallet: result.wallet,
    };
  }

  return result;
}