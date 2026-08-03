/**
 * ======================================
 * ZORY GLOBAL
 * OKX Universal Link Generator
 * ======================================
 */

export function createOkxUniversalLink(url = window.location.href) {

  // OKX Deep Link
  const deepLink =
    `okx://wallet/dapp/url?dappUrl=${encodeURIComponent(url)}`;

  // Official Universal Link
  const universalLink =
    `https://web3.okx.com/download?deeplink=${encodeURIComponent(deepLink)}`;

  return universalLink;

}