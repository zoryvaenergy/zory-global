/**
 * Official USDT Contract
 * BNB Smart Chain
 */

export const USDT_CONTRACT = {

  network: "bsc",

  chainId: 56,

  symbol: "USDT",

  decimals: 18,

  contractAddress: "0x55d398326f99059fF775485246999027B3197955",
   abi: [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
],

};