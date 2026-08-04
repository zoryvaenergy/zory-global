/**
 * ==========================================
 * ZORY GLOBAL
 * Wallet Browser Detector
 * ==========================================
 */

export function detectWalletBrowser() {

  const ua = navigator.userAgent.toLowerCase();

  return {

    isOkx:
      ua.includes("okx"),

    isMetaMask:
      ua.includes("metamask"),

    isTokenPocket:
      ua.includes("tokenpocket"),

    isTrust:
      ua.includes("trust"),

  };

}