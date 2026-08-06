/**
 * ==========================================
 * ZORY GLOBAL
 * Trust Wallet Launcher
 * ==========================================
 */

import { connectTrust } from "../connect/connectTrust";
import { detectEnvironment } from "../environment/detectEnvironment";
import { detectWalletBrowser } from "../browser/detectWalletBrowser";
import { chooseLaunchStrategy } from "../strategy/chooseLaunchStrategy";
import { openTrustApp } from "../actions/openTrustApp";

export async function launchTrust() {
alert("VERSION 8");
  const environment = detectEnvironment();

  const browser = detectWalletBrowser();

  const strategy = chooseLaunchStrategy(
    environment,
    browser,
    "trustwallet"
  );

  console.log("Environment :", environment);
  console.log("Browser :", browser);
  console.log("Strategy :", strategy);
alert(
  "Environment\n\n" +
  "Android : " + environment.isAndroid +
  "\nTrust Browser : " + browser.isTrust +
  "\nStrategy : " + strategy
);
  switch (strategy) {

    case "DIRECT_CONNECT": {

      const result = await connectTrust();

      console.log(result);

      return result;

    }

    case "OPEN_TRUST_APP":

      openTrustApp();

      return {
        success: false,
        message: "Opening Trust Wallet App..."
      };

    case "WALLET_CONNECT": {

      if (
        window.ethereum?.isTrust ||
        window.ethereum?.isTrustWallet
      ) {

        const result = await connectTrust();

        console.log(result);

        return result;

      }

      const install = window.confirm(
        "Trust Wallet Extension is not installed.\n\nInstall Trust Wallet?"
      );

      if (install) {

        window.open(
          "https://chromewebstore.google.com/search/trust%20wallet",
          "_blank"
        );

      }

      return {
        success: false,
        message: "Trust Wallet not installed"
      };

    }

    case "IOS_DEEPLINK":

      alert("Open Trust Wallet on iPhone");

      return {
        success: false,
        message: "Open Trust Wallet on iPhone"
      };

    default:

      return {
        success: false,
        message: "Unknown Environment"
      };

  }

}