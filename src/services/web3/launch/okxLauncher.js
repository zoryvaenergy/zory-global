/**
 * ==========================================
 * ZORY GLOBAL
 * OKX Wallet Launcher
 * ==========================================
 */
import { connectOkx } from "../connect/connectOkx";
import { detectEnvironment } from "../environment/detectEnvironment";
import { detectWalletBrowser } from "../browser/detectWalletBrowser";
import { chooseLaunchStrategy } from "../strategy/chooseLaunchStrategy";
import { openOkxApp } from "../actions/openOkxApp";
export async function launchOkx() {

  const environment = detectEnvironment();

  const browser = detectWalletBrowser();

 const strategy = chooseLaunchStrategy(
  environment,
  browser,
  "okx"
);

  console.log("Environment :", environment);
  console.log("Browser :", browser);
  console.log("Strategy :", strategy);

  switch (strategy) {

    case "DIRECT_CONNECT": {

  const result = await connectOkx();

  console.log(result);

  break;

}

    case "OPEN_OKX_APP":
  openOkxApp();
  break;

    case "WALLET_CONNECT": {

  if (window.ethereum?.isOkxWallet) {

    const result = await connectOkx();

    console.log(result);

    break;

  }

  const install = window.confirm(
    "OKX Wallet Extension is not installed.\n\nInstall OKX Wallet?"
  );

  if (install) {
   window.open(
  "https://www.okx.com/download",
  "_blank"
);
  }

  break;

}
    case "IOS_DEEPLINK":
      alert("Open OKX on iPhone");
      break;

    default:
      alert("Unknown Environment");
      break;

  }

}