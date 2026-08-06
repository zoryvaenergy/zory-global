/**
 * ==========================================
 * ZORY GLOBAL
 * Open Trust Wallet App (Android Intent Test)
 * ==========================================
 */

export function openTrustApp(dappUrl = window.location.href) {

  console.log("Opening Trust Wallet...");

  const intentUrl =
    `intent://${dappUrl.replace(/^https?:\/\//, "")}` +
    `#Intent;scheme=https;package=com.wallet.crypto.trustapp;end`;

  window.location.href = intentUrl;

}