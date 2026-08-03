export function detectWallets() {

  return [

    {
      id: "okx",
      name: "OKX Wallet",
      installed: !!window.okxwallet,
    },

    {
      id: "metamask",
      name: "MetaMask",
      installed: !!window.ethereum?.isMetaMask,
    },

    {
      id: "trustwallet",
      name: "Trust Wallet",
      installed:
        !!window.trustwallet ||
        !!window.ethereum?.isTrust,
    },

  ];

}