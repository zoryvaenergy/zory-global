export function validateRegistration(data) {

  // Wallet Required
  if (!data.walletAddress) {
    throw new Error("Please connect your OKX Wallet.");
  }

  // Sponsor Required
  if (!data.sponsorId?.trim()) {
    throw new Error("Sponsor ID is required.");
  }

  return true;
}