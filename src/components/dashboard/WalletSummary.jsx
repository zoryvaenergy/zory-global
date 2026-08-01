import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { PiCoinsFill } from "react-icons/pi";
import { FaWallet } from "react-icons/fa";

function WalletSummary() {
  const [wallet, setWallet] = useState({});
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("currentUser") || "null"
        );

        if (!savedUser?.profile?.userId) {
          setError("User not found.");
          setLoading(false);
          return;
        }

        const userRef = ref(
          database,
          `users/${savedUser.profile.userId}`
        );

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          setWallet(data.wallet || {});
          setToken(data.token || {});
        } else {
          setError("Wallet data not found.");
        }
      } catch (err) {
        console.error("Wallet Error :", err);
        setError("Failed to load wallet.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-card">
        <h3>💰 My Wallet</h3>
        <p>Loading Wallet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-card">
        <h3>💰 My Wallet</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="wallet-grid">

      {/* Wallet Card */}

      <div className="dashboard-card wallet-card">

        <h3 className="wallet-heading">
    <FaWallet className="wallet-icon" />
    <span>Wallet Summary</span>
</h3>

        <div className="wallet-summary">

          <WalletRow
            title="Main Wallet"
            value={`£${Number(wallet.mainWallet || 0).toFixed(2)}`}
          />

          <WalletRow
            title="Direct Income"
            value={`£${Number(wallet.directIncome || 0).toFixed(2)}`}
          />

          <WalletRow
            title="Level Income"
            value={`£${Number(wallet.levelIncome || 0).toFixed(2)}`}
          />

          <WalletRow
            title="Pool Income"
            value={`£${Number(wallet.poolIncome || 0).toFixed(2)}`}
          />

          <div className="wallet-total">

    <WalletRow
        title="Total Income"
        value={`£${Number(wallet.totalIncome || 0).toFixed(2)}`}
    />

</div>

        </div>

      </div>

      {/* Token Card */}

      <div className="dashboard-card token-card">

      <h3 className="wallet-heading">
    <PiCoinsFill className="wallet-icon" />
    <span>ZORY Token</span>
</h3>

        <div className="wallet-summary">

          <WalletRow
            title="Current Token"
            value={token.balance || 0}
          />

          <WalletRow
            title="Lifetime Earned"
            value={token.lifetimeEarned || 0}
          />

          <WalletRow
            title="Lifetime Spent"
            value={token.lifetimeSpent || 0}
          />

        </div>

      </div>

    </div>
  );
}

function WalletRow({ title, value }) {
  return (
    <div className="wallet-row">
      <span className="wallet-title">
        {title}
      </span>

      <span className="wallet-value">
        {value}
      </span>
    </div>
  );
}

export default WalletSummary;