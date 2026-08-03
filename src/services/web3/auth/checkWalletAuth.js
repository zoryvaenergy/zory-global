import { checkWalletExists } from "../registration/checkWalletExists";

export async function checkWalletAuth(walletAddress) {

  const exists = await checkWalletExists(walletAddress);

  if (exists) {

    return {
      registered: true,
    };

  }

  return {
    registered: false,
  };

}