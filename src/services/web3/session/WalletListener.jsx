import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WalletListener() {

  const navigate = useNavigate();

  useEffect(() => {

    if (!window.ethereum) return;

    const handleAccountsChanged = () => {

      localStorage.removeItem("currentUser");

      alert("Wallet changed. Please connect again.");

      navigate("/auth");

    };
      const handleChainChanged = () => {

  localStorage.removeItem("currentUser");

  alert("Network changed. Please reconnect your wallet.");

  navigate("/auth");

};
    window.ethereum.on(
      "accountsChanged",
      handleAccountsChanged
    );
window.ethereum.on(
  "chainChanged",
  handleChainChanged
);
    return () => {

      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
     window.ethereum.removeListener(
  "chainChanged",
  handleChainChanged
);
    };

  }, [navigate]);

  return null;

}

export default WalletListener;