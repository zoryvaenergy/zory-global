import { BrowserProvider } from "ethers";

export async function connectWalletByType(walletId) {

  let ethereum = null;

  // OKX
  if (walletId === "okx") {

    ethereum =
      window.okxwallet ||
      window.okexchain ||
      window.ethereum;

  }

  // MetaMask
  else if (walletId === "metamask") {

    ethereum = window.ethereum;

  }

  // Trust Wallet
  else if (walletId === "trustwallet") {

    ethereum = window.trustwallet || window.ethereum;

  }

  if (!ethereum) {
    throw new Error("Wallet not installed");
  }

  await ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider = new BrowserProvider(ethereum);

  const signer = await provider.getSigner();

  const address = await signer.getAddress();

  const network = await provider.getNetwork();

  return {
    walletAddress: address,
    chainId: Number(network.chainId),
    network: network.name,
  };

}