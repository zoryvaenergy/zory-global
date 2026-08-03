import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { connectWallet } from "../services/web3/connectWallet";
import { checkWalletAuth } from "../services/web3/auth/checkWalletAuth";
import "../styles/web3Auth.css";
function Web3Auth() {

  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const handleConnect = async () => {

  try {

    setLoading(true);

    // Wallet Connect
    const wallet = await connectWallet();

    if (!wallet.success) {
      alert(wallet.message);
      return;
    }

    console.log("Wallet :", wallet.walletAddress);

    // Firebase Check
    const result = await checkWalletAuth(wallet.walletAddress);

console.log(result);

if (result.registered) {

  console.log("✅ Existing User");

  navigate("/dashboard");

} else {

  console.log("🆕 New User");

  navigate("/register", {
    state: {
      walletAddress: wallet.walletAddress,
    },
  });

}
    if (result.registered) {

  console.log("✅ Existing User");

  // अभी Navigate नहीं करेंगे

} else {

  console.log("🆕 New User");

  // अभी Navigate नहीं करेंगे

}
  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};
  return (

   <div className="web3-auth">

      <div className="web3-card">

        <h1 className="web3-logo">
          ZORY GLOBAL
        </h1>

        <p className="web3-text">
          Connect your wallet to continue
        </p>

        <button
  className="web3-button"
  onClick={handleConnect}
  disabled={loading}
>

  {
    loading
      ? "Connecting..."
      : "🔗 Connect Wallet"
  }

</button>

      </div>

    </div>

  );

}

export default Web3Auth;