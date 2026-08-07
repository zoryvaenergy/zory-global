/**
 * ==========================================
 * ZORY GLOBAL
 * Wallet Browser Detector
 * ==========================================
 */

export function detectWalletBrowser() {

  console.log("========== BROWSER DETECT ==========");

  console.log("UserAgent :", navigator.userAgent);

  console.log("window.ethereum :", window.ethereum);

  console.log(
    "isTrust :",
    window.ethereum?.isTrust
  );

  console.log(
    "isTrustWallet :",
    window.ethereum?.isTrustWallet
  );

  console.log(
    "window.trustwallet :",
    window.trustwallet
  );

  const ua = navigator.userAgent.toLowerCase();

  return {

    isOkx: ua.includes("okx"),

    isMetaMask: ua.includes("metamask"),

    isTokenPocket: ua.includes("tokenpocket"),

    isTrust: ua.includes("trust"),

  };

}