import { getWalletProvider } from "./walletService";

/**
 * Connect Wallet
 * ZORY GLOBAL Web3 Engine
 */

export async function connectWallet() {

  try {

    // Wallet Installed?
    if (!window.ethereum) {

      const install = window.confirm(
        "No Web3 Wallet Found.\n\nInstall OKX Wallet?"
      );

      if (install) {

        window.location.href =
  "https://web3.okx.com";

      }

      return {

        success: false,

        message: "Wallet not installed",

      };

    }

    const provider = getWalletProvider();

    // Request Permission
    await provider.send("eth_requestAccounts", []);

    const accounts = await provider.send("eth_accounts", []);

    console.log("==================================");
    console.log("ALL ACCOUNTS :", accounts);

    const signer = await provider.getSigner();

    const walletAddress = await signer.getAddress();

    console.log("SIGNER ADDRESS :", walletAddress);
    console.log("==================================");

    const network = await provider.getNetwork();

    const chainId = Number(network.chainId);

    let walletType = "Unknown";

    if (window.ethereum?.isOkxWallet) {

      walletType = "OKX Wallet";

    } else if (window.ethereum?.isTrust) {

      walletType = "Trust Wallet";

    } else if (window.ethereum?.isMetaMask) {

      walletType = "MetaMask";

    }

    return {

      success: true,

      walletAddress,

      walletType,

      network: network.name,

      chainId,

    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

      message: error.message,

    };

  }

}