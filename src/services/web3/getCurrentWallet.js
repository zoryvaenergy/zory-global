import { BrowserProvider } from "ethers";

/**
 * ==========================================
 * ZORY GLOBAL
 * Get Current Connected Wallet
 * ==========================================
 */

export async function getCurrentWallet() {

  if (!window.ethereum) {
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);

  const accounts = await provider.send(
    "eth_accounts",
    []
  );

  if (!accounts.length) {
    return null;
  }

  const signer = await provider.getSigner();

  const walletAddress = await signer.getAddress();

  const network = await provider.getNetwork();

  let walletType = "Unknown";

  if (window.ethereum?.isOkxWallet) {

    walletType = "OKX Wallet";

  } else if (
    window.ethereum?.isTrust ||
    window.ethereum?.isTrustWallet
  ) {

    walletType = "Trust Wallet";

  } else if (window.ethereum?.isMetaMask) {

    walletType = "MetaMask";

  }

  return {

    success: true,

    walletAddress,

    walletType,

    network: network.name,

    chainId: Number(network.chainId),

  };

}