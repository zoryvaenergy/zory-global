import { launchWallet } from "../../services/web3/launch/launchWallet";
import "./walletModal.css";
import { saveSelectedWallet } from "../../services/web3/storage/saveSelectedWallet";
import {
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

const wallets = [
  {
    id: "trustwallet",
    name: "Trust Wallet",
    status: "Recommended",
    active: true,
    icon: "🔵",
  },
];

function WalletModal({
  isOpen,
  onClose,
  onConnected,
}) {

  if (!isOpen) return null;

  async function handleWallet(wallet) {

    if (!wallet.active) {
      
      return;
    }

    saveSelectedWallet(wallet.id);

    console.log("Selected Wallet :", wallet.id);

    const result = await launchWallet(wallet.id);

    console.log("LAUNCH RESULT :", result);

    if (!result?.success) {
      alert(result.message);
      return;
    }

    onClose();

    onConnected();

  }

  return (
    <div
      className="wallet-overlay"
      onClick={onClose}
    >
      <div
        className="wallet-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="wallet-close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2>Connect Trust Wallet</h2>

        <p>
          Securely connect your Trust Wallet to continue.
        </p>

        <div className="wallet-items">

          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              className="wallet-item"
              onClick={() => handleWallet(wallet)}
            >

              <div className="wallet-left">

                <div className="wallet-icon">
                  {wallet.icon}
                </div>

                <div>
                  <h3>{wallet.name}</h3>
                  <span>{wallet.status}</span>
                </div>

              </div>

              <FaChevronRight />

            </button>
          ))}

        </div>

      </div>
    </div>
  );

}

export default WalletModal;