/**
 * ==========================================
 * ZORY GLOBAL
 * Launch Strategy Selector
 * ==========================================
 */

export function chooseLaunchStrategy(
  environment,
  browser,
  walletId
) {

  // Already inside OKX DApp Browser
  if (browser.isOkx) {
    return "DIRECT_CONNECT";
  }

  // Android Chrome
if (environment.isAndroid) {

  switch (walletId) {

    case "okx":
      return "OPEN_OKX_APP";

    case "trustwallet":
      return "OPEN_TRUST_APP";

    default:
      return "UNKNOWN";

  }

}

  // Desktop Browser
  if (environment.isDesktop) {
    return "WALLET_CONNECT";
  }

  // iPhone Safari
  if (environment.isIOS) {
    return "IOS_DEEPLINK";
  }

  return "UNKNOWN";

}