import { createOkxUniversalLink } from "./createOkxUniversalLink";

/**
 * ======================================
 * ZORY GLOBAL
 * Open OKX Wallet
 * ======================================
 */

export function openOkxWallet(url = window.location.href) {

  const universalLink = createOkxUniversalLink(url);

  console.log("Current URL :", url);
  console.log("Universal Link :", universalLink);

  // Temporary Debug
  alert("Opening OKX Wallet...");

  window.location.href = universalLink;

}