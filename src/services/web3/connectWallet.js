import { getWalletProvider } from "./walletService";

/**
 * ==========================================
 * ZORY GLOBAL
 * Connect Wallet
 * ==========================================
 */

export async function connectWallet() {

  try {

    // Wallet Installed?
    if (!window.ethereum) {

      return {

        success: false,

        action: "INSTALL_TRUST",

        message: "Trust Wallet not found",

      };

    }

    const provider = getWalletProvider();

    // Request Permission
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const walletAddress = await signer.getAddress();

    const network = await provider.getNetwork();

    const chainId = Number(network.chainId);

    let walletType = "Unknown";

    if (
      window.ethereum?.isTrust ||
      window.ethereum?.isTrustWallet
    ) {

      walletType = "Trust Wallet";

    } else if (window.ethereum?.isMetaMask) {

      walletType = "MetaMask";

    } else if (window.ethereum?.isOkxWallet) {

      walletType = "OKX Wallet";

    }

    console.log("========== CONNECT WALLET ==========");
    console.log("Wallet :", walletAddress);
    console.log("Wallet Type :", walletType);
    console.log("Network :", network.name);
    console.log("Chain :", chainId);
    console.log("====================================");

    return {

      success: true,

      walletAddress,

      walletType,

      network: network.name,

      chainId,

    };

  } catch (error) {

    console.error("Connect Wallet Error :", error);

    return {

      success: false,

      action: "CONNECT_FAILED",

      message: error.message,

    };

  }

}