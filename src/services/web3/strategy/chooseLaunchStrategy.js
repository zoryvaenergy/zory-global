/**
 * ==========================================
 * ZORY GLOBAL
 * Launch Strategy Selector
 * ==========================================
 */

export function chooseLaunchStrategy(environment, browser) {

  // Already inside OKX DApp Browser
  if (browser.isOkx) {
    return "DIRECT_CONNECT";
  }

  // Android Chrome
  if (environment.isAndroid) {
    return "OPEN_OKX_APP";
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