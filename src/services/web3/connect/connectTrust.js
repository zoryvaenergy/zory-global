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
       
  
if (!window.ethereum) {

      return {
        success: false,
        message: "Trust Wallet not found",
      };

    }

    const provider = new BrowserProvider(window.ethereum);

//alert("STEP 1");

await provider.send("eth_requestAccounts", []);

//alert("STEP 2");

const signer = await provider.getSigner();

//alert("STEP 3");

const walletAddress = await signer.getAddress();

//alert("Wallet : " + walletAddress);

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

  console.error("CONNECT ERROR:", error);

  return {
    success: false,
    message: error.message || String(error),
    error,
  };

}

}