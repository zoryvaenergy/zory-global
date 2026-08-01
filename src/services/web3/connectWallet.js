import { getWalletProvider } from "./walletService";

/**
 * Connect Wallet
 * ZORY GLOBAL Web3 Engine
 */

export async function connectWallet() {
  try {
    const provider = getWalletProvider();

    // Request Wallet Permission
    await provider.send("eth_requestAccounts", []);

    // Signer
    const signer = await provider.getSigner();

    // Wallet Address
    const walletAddress = await signer.getAddress();

    // Network
    const network = await provider.getNetwork();

    // Chain ID
    const chainId = Number(network.chainId);

    // Wallet Type
    let walletType = "Unknown";

    if (window.ethereum?.isTrust) {
      walletType = "Trust Wallet";
    } else if (window.ethereum?.isMetaMask) {
      walletType = "MetaMask";
    } else if (window.ethereum?.isOkxWallet) {
      walletType = "OKX Wallet";
    }

    console.log("✅ Wallet Connected");

    return {
      success: true,
      walletAddress,
      walletType,
      network: network.name,
      chainId,
    };

  } catch (error) {

    console.error("❌ Wallet Connection Failed", error);

    return {
      success: false,
      message: error.message,
    };

  }
}