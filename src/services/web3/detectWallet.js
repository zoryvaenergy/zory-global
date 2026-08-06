/**
 * ==========================================
 * ZORY GLOBAL
 * Detect Installed Wallet Browsers
 * ==========================================
 */

export function detectWalletBrowser() {

  const ethereum = window.ethereum;

  return {

    isOkx:
      !!ethereum?.isOkxWallet,

    isMetaMask:
      !!ethereum?.isMetaMask,

    isTrust:
      !!ethereum?.isTrust ||
      !!ethereum?.isTrustWallet,

    isTokenPocket:
      !!ethereum?.isTokenPocket,

  };

}