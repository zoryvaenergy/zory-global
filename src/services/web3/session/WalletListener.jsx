import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WalletListener() {

  const navigate = useNavigate();

  useEffect(() => {

    if (!window.ethereum) return;

   const handleAccountsChanged = (accounts) => {

  console.log("Accounts Changed :", accounts);

};
     const handleChainChanged = () => {

  console.log("Chain Changed");

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