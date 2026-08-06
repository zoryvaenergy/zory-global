/**
 * ==========================================
 * ZORY GLOBAL
 * Save Selected Wallet
 * ==========================================
 */

const STORAGE_KEY = "zory_selected_wallet";

export function saveSelectedWallet(walletId) {

  sessionStorage.setItem(
    STORAGE_KEY,
    walletId
  );

}