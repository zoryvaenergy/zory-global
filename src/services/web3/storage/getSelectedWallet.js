/**
 * ==========================================
 * ZORY GLOBAL
 * Get Selected Wallet
 * ==========================================
 */

const STORAGE_KEY = "zory_selected_wallet";

export function getSelectedWallet() {

  return sessionStorage.getItem(STORAGE_KEY);

}