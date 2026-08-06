import { getCurrentNetwork } from "../walletService";
import { Contract, parseUnits, formatUnits } from "ethers";
import { APP_CONFIG } from "../../../config/appConfig";
import { COMPANY_WALLET } from "./companyWallet";
import { USDT_CONTRACT } from "./usdtContract";
import {
  getWalletSigner,
  switchNetwork
} from "../walletService";

export async function sendPayment() {

  console.log("Starting Payment...");

const network = await getCurrentNetwork();

if (Number(network.chainId) !== 56) {

  const switched = await switchNetwork();

  if (!switched) {
    throw new Error(
      "Please switch to BNB Smart Chain."
    );
  }

}

console.log(window.ethereum);
console.log("isMetaMask:", window.ethereum?.isMetaMask);
console.log("isOKXWallet:", window.ethereum?.isOKXWallet);
 const signer = await getWalletSigner();

const currentNetwork = await signer.provider.getNetwork();

console.log("Network Name:", network.name);
console.log("Chain ID:", Number(network.chainId));
console.log("USDT Contract:", USDT_CONTRACT.contractAddress);

const usdtContract = new Contract(
  USDT_CONTRACT.contractAddress,
  USDT_CONTRACT.abi,
  signer
);
const walletAddress = await signer.getAddress();

const balance = await usdtContract.balanceOf(walletAddress);

console.log("Wallet :", walletAddress);

const readableBalance = formatUnits(
  balance,
  USDT_CONTRACT.decimals
);

console.log("USDT Balance :", readableBalance);
  const amount = parseUnits(
    COMPANY_WALLET.amount.toString(),
    USDT_CONTRACT.decimals
  );
if (balance < amount) {

  if (APP_CONFIG.DEV_MODE) {

    console.log("================================");
    console.log("DEVELOPER MODE ENABLED");
    console.log("Payment Skipped");
    console.log("Registration Can Continue");
    console.log("================================");

    return {
      success: true,
      paymentSkipped: true,
      txHash: "DEV_MODE",
    };

  }

  throw new Error("Insufficient USDT Balance");

}
console.log("Payment Amount :", formatUnits(amount, USDT_CONTRACT.decimals));
console.log("Company Wallet :", COMPANY_WALLET.walletAddress);
}
