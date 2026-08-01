import { loginWallet } from "../services/web3/auth/loginWallet";

function Web3Test() {

  async function handleConnect() {

    const result = await loginWallet();

    console.log("Web3 Result :", result);

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleConnect}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default Web3Test;