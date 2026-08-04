import { launchWallet } from "../../services/web3/launch/launchWallet";
import "./walletModal.css";
import {
  FaTimes,
  FaChevronRight
} from "react-icons/fa";

const wallets = [
  {
    id: "okx",
    name: "OKX Wallet",
    status: "Recommended",
    active: true,
    icon: "🟢"
  },
  {
    id: "tokenpocket",
    name: "TokenPocket",
    status: "Coming Soon",
    active: false,
    icon: "🟣"
  },
  {
    id: "metamask",
    name: "MetaMask",
    status: "Coming Soon",
    active: false,
    icon: "🦊"
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    status: "Coming Soon",
    active: false,
    icon: "🔵"
  }
];

function WalletModal({
  isOpen,
  onClose
}) {

  if (!isOpen) return null;

  function handleWallet(wallet){

    if (!wallet.active) {
  alert(`${wallet.name} will be available soon.`);
  return;
}

launchWallet(wallet.id);

  }

  return (

    <div
      className="wallet-overlay"
      onClick={onClose}
    >

      <div
        className="wallet-modal"
        onClick={(e)=>e.stopPropagation()}
      >

        <button
          className="wallet-close"
          onClick={onClose}
        >
          <FaTimes/>
        </button>

        <h2>
          Connect Wallet
        </h2>

        <p>
          Select your preferred Web3 Wallet
        </p>

        <div className="wallet-items">

          {

            wallets.map(wallet=>(

              <button

                key={wallet.id}

                className="wallet-item"

                onClick={()=>handleWallet(wallet)}

              >

                <div className="wallet-left">

                  <div className="wallet-icon">
                    {wallet.icon}
                  </div>

                  <div>

                    <h3>
                      {wallet.name}
                    </h3>

                    <span>
                      {wallet.status}
                    </span>

                  </div>

                </div>

                <FaChevronRight/>

              </button>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default WalletModal;