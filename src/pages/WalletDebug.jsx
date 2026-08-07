import { useState } from "react";

function WalletDebug() {

  const [data, setData] = useState(null);

  async function checkWallet() {

    const result = {
      userAgent: navigator.userAgent,
      href: window.location.href,
      ethereum: !!window.ethereum,
      isTrust: window.ethereum?.isTrust,
      isTrustWallet: window.ethereum?.isTrustWallet,
      chainId: null,
      accounts: [],
    };

    try {

      if (window.ethereum) {

        result.chainId =
          await window.ethereum.request({
            method: "eth_chainId",
          });

        result.accounts =
          await window.ethereum.request({
            method: "eth_accounts",
          });

      }

    } catch (e) {

      result.error = e.message;

    }

    setData(result);

  }

  return (

    <div
      style={{
        padding:40,
        color:"#fff",
        background:"#050b25",
        minHeight:"100vh"
      }}
    >

      <h1>Wallet Debug</h1>

      <button
        onClick={checkWallet}
      >
        Check Wallet
      </button>

      <pre
        style={{
          marginTop:20,
          whiteSpace:"pre-wrap"
        }}
      >
        {JSON.stringify(data,null,2)}
      </pre>

    </div>

  );

}

export default WalletDebug;