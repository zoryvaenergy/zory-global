/**
 * ==========================================
 * ZORY GLOBAL
 * Open OKX App (Android Intent Test)
 * ==========================================
 */

export function openOkxApp(dappUrl = window.location.href) {

  console.log("Opening OKX App...");

  const intentUrl =
    `intent://${dappUrl.replace(/^https?:\/\//, "")}` +
    `#Intent;scheme=https;package=com.okinc.okex.gp;end`;

  window.location.href = intentUrl;

}