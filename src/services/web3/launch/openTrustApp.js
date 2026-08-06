/**
 * ==========================================
 * ZORY GLOBAL
 * Open Trust Wallet App
 * ==========================================
 */

export function openTrustApp() {

  const currentUrl = window.location.href;

  const trustUrl =
    `https://link.trustwallet.com/open_url?url=${encodeURIComponent(currentUrl)}`;

  console.log("Opening Trust Wallet...");
  console.log("Target URL :", currentUrl);
  console.log("Trust URL :", trustUrl);

  window.location.href = trustUrl;
}