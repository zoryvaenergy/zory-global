export function validateRegistration(data) {

  // Wallet Required
  if (!data.walletAddress) {
    throw new Error("Please connect your OKX Wallet.");
  }

  // Sponsor validation यहाँ नहीं होगी
  // इसे validateSponsor() handle करेगा

  return true;
}