/**
 * ==========================================
 * ZORY GLOBAL
 * Connect Trust Wallet
 * ==========================================
 */

import { BrowserProvider } from "ethers";
import { switchNetwork } from "../walletService";

export async function connectTrust() {

  try {
        alert("Ethereum : " + !!window.ethereum);

alert("Providers : " + !!window.ethereum?.providers);

alert("Trust Wallet : " + !!window.trustwallet);

alert(navigator.userAgent);
    if (!window.ethereum) {

      return {
        success: false,
        message: "Trust Wallet not found",
      };

    }

    const provider = new BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const walletAddress = await signer.getAddress();

    const network = await provider.getNetwork();
if (Number(network.chainId) !== 56) {

  const switched = await switchNetwork();

  if (!switched) {

    return {
      success: false,
      message: "Please switch to BNB Smart Chain",
    };

  }

  // Network बदलने के बाद दोबारा Connect करें
  return await connectTrust();

}
    return {

      success: true,

      walletAddress,

      chainId: Number(network.chainId),

      network: network.name,

    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: error.message,

    };

  }

}