import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentAccount } from "../../services/web3/walletService";
import { checkWalletExists } from "../../services/web3/registration/checkWalletExists";

function WalletGuard() {

  const navigate = useNavigate();

  useEffect(() => {

    async function checkWallet() {

      try {

        const wallet = await getCurrentAccount();

        if (!wallet) {
          return;
        }

        const user = await checkWalletExists(wallet);

        if (user) {

          localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
          );

          navigate("/dashboard");

        }

      } catch (error) {

        console.log(error);

      }

    }

    checkWallet();

  }, []);

  return null;

}

export default WalletGuard;