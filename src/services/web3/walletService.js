import { BrowserProvider } from "ethers";

/**
 * Wallet Service
 * ZORY GLOBAL Web3 Engine v1.0
 */

// Wallet Installed?
export function isWalletInstalled() {
  return typeof window !== "undefined" && !!window.ethereum;
}

// Provider
export function getWalletProvider() {
  if (!isWalletInstalled()) {
    throw new Error("Wallet not installed");
  }

  return new BrowserProvider(window.ethereum);
}

// Current Connected Wallet
export async function getCurrentAccount() {

  if (!isWalletInstalled()) {
    return null;
  }

  const provider = getWalletProvider();

  const accounts = await provider.send("eth_accounts", []);

  if (!accounts.length) {
    return null;
  }

  return accounts[0];
}
// Switch to BNB Smart Chain
export async function switchNetwork() {

  if (!isWalletInstalled()) {
    throw new Error("Wallet not installed");
  }
const confirmSwitch = window.confirm(
  "⚠️ ZORY GLOBAL works only on BNB Smart Chain.\n\nSwitch your wallet to BNB Smart Chain?"
);

if (!confirmSwitch) {
  return false;
}
  try {

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // BNB Smart Chain
    });

    return true;

  }
  catch (error) {

  console.error("Switch Network Error :", error);

  // Chain Not Added
  if (error.code === 4902) {

    try {

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            chainName: "BNB Smart Chain",
            nativeCurrency: {
              name: "BNB",
              symbol: "BNB",
              decimals: 18,
            },
            rpcUrls: [
              "https://bsc-dataseed.binance.org/",
            ],
            blockExplorerUrls: [
              "https://bscscan.com",
            ],
          },
        ],
      });

      return true;

    } catch (addError) {

      console.error(
        "Add Network Error :",
        addError
      );

      return false;

    }

  }

  return false;
}

}
// Wallet Signer
export async function getWalletSigner() {

  const provider = getWalletProvider();

  return await provider.getSigner();

}
// Current Network
export async function getCurrentNetwork() {

  const provider = getWalletProvider();

  return await provider.getNetwork();

}
// Verify Current Wallet
export async function verifyCurrentWallet(savedWallet) {

  try {

    const currentWallet = await getCurrentAccount();

    if (!currentWallet) {

      return {
        success: false,
        reason: "NOT_CONNECTED",
      };

    }

    if (
      currentWallet.toLowerCase() !==
      savedWallet.toLowerCase()
    ) {

      return {
        success: false,
        reason: "WALLET_CHANGED",
      };

    }

    return {
      success: true,
      wallet: currentWallet,
    };

  } catch (error) {

    return {
      success: false,
      reason: "ERROR",
      message: error.message,
    };

  }

}