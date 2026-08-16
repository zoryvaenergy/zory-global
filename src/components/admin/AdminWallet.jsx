import React, { useState } from "react";
import "../../styles/admin/adminWallet.css";
import { getUserDetails } from "../../services/admin/getUserDetails";

function AdminWallet() {

  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);

  const handleWalletUserSearch = async () => {

    const searchId = userId.trim();

    if (!searchId) {
      setSearchError("Please enter User ID");
      setUserData(null);
      return;
    }

    setSearching(true);
    setSearchError("");
    setUserData(null);

    try {

      const user = await getUserDetails(searchId);

      if (!user) {
        setSearchError("User Not Found");
        return;
      }

      if (!user.wallet) {
        setSearchError("Wallet data not found for this user");
        return;
      }

      setUserData(user);

    } catch (error) {

      console.error(
        "Wallet User Search Error :",
        error
      );

      setSearchError(
        "Unable to load user wallet data"
      );

    } finally {

      setSearching(false);

    }
  };

  const wallet = userData?.wallet || {};

  const mainWallet =
    Number(wallet.mainWallet || 0);

  const lockedWallet =
    Number(wallet.lockedWallet || 0);

  const availableBalance =
  Number(wallet.mainWallet || 0);

  const directIncome =
    Number(wallet.directIncome || 0);

  const levelIncome =
    Number(wallet.levelIncome || 0);

  const poolIncome =
    Number(wallet.poolIncome || 0);

  const totalIncome =
    Number(wallet.totalIncome || 0);
    
    const walletTotal =
  mainWallet + lockedWallet;

const walletMatched =
  Math.abs(walletTotal - totalIncome) < 0.001;

const incomeTotal =
  directIncome +
  levelIncome +
  poolIncome;

const incomeMatched =
  Math.abs(incomeTotal - totalIncome) < 0.001;

 return (

  <div className="admin-wallet">

    {/* =========================
        HEADER
    ========================= */}

    <div className="admin-wallet-header">

      <span className="admin-wallet-label">
        USER WALLET SEARCH
      </span>

      <h1>
        Wallet Management
      </h1>

      <p>
        Search and verify user wallet balances
      </p>

    </div>


    {/* =========================
        SEARCH
    ========================= */}

    <div className="wallet-search-card">

      <div className="wallet-section-title">

        <span>
          USER WALLET
        </span>

        <h2>
          Search User
        </h2>

      </div>

      <div className="wallet-search-box">

        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleWalletUserSearch();
            }
          }}
        />

        <button
          onClick={handleWalletUserSearch}
          disabled={searching}
        >
          {searching
            ? "Searching..."
            : "Search"}
        </button>

      </div>

      {searchError && (
        <p className="wallet-search-error">
          {searchError}
        </p>
      )}

    </div>


    {/* =========================
        USER WALLET
    ========================= */}

    {userData && (

      <div className="wallet-summary-card">

        <div className="wallet-user-header">

          <div>

            <span>
              USER WALLET PROFILE
            </span>

            <h2>
              {userData.userId || userId}
            </h2>

          </div>

          <div className="wallet-status">
            Wallet Active
          </div>

        </div>


        {/* =========================
            WALLET SUMMARY
        ========================= */}

        <div className="wallet-summary-grid">

          <div className="wallet-summary-item">

            <span>
              Main Wallet
            </span>

            <strong>
              ${mainWallet.toFixed(2)}
            </strong>

          </div>


          <div className="wallet-summary-item">

            <span>
              Locked Wallet
            </span>

            <strong>
              ${lockedWallet.toFixed(2)}
            </strong>

          </div>


          <div className="wallet-summary-item">

            <span>
              Available Balance
            </span>

            <strong>
              ${availableBalance.toFixed(2)}
            </strong>

          </div>


          <div className="wallet-summary-item">

            <span>
              Total Income
            </span>

            <strong>
              ${totalIncome.toFixed(2)}
            </strong>

          </div>

        </div>


        {/* =========================
            INCOME BREAKDOWN
        ========================= */}

        <div className="wallet-income-section">

          <div className="wallet-section-title">

            <span>
              INCOME BREAKDOWN
            </span>

            <h2>
              Income Sources
            </h2>

          </div>


          <div className="wallet-income-grid">

            <div className="wallet-income-item">

              <span>
                Direct Income
              </span>

              <strong>
                ${directIncome.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-income-item">

              <span>
                Level Income
              </span>

              <strong>
                ${levelIncome.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-income-item">

              <span>
                Pool Income
              </span>

              <strong>
                ${poolIncome.toFixed(2)}
              </strong>

            </div>

          </div>

        </div>


        {/* =========================
            WALLET VERIFICATION
        ========================= */}

        <div className="wallet-verification-section">

          <div className="wallet-section-title">

            <span>
              WALLET VERIFICATION
            </span>

            <h2>
              Balance Integrity Check
            </h2>

          </div>


          <div className="wallet-verification-grid">

            <div className="wallet-verification-item">

              <span>
                Main Wallet
              </span>

              <strong>
                ${mainWallet.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-verification-item">

              <span>
                Locked Wallet
              </span>

              <strong>
                ${lockedWallet.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-verification-item">

              <span>
                Wallet Total
              </span>

              <strong>
                ${walletTotal.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-verification-item">

              <span>
                Recorded Total Income
              </span>

              <strong>
                ${totalIncome.toFixed(2)}
              </strong>

            </div>


            <div className="wallet-verification-item">

              <span>
                Income Calculation
              </span>

              <strong>
                ${incomeTotal.toFixed(2)}
              </strong>

            </div>


            <div
              className={`wallet-verification-item ${
                walletMatched && incomeMatched
                  ? "verification-success"
                  : "verification-warning"
              }`}
            >

              <span>
                Verification Status
              </span>

              <strong>
                {walletMatched && incomeMatched
                  ? "✓ Wallet Matched"
                  : "⚠ Wallet Mismatch"}
              </strong>

            </div>

          </div>

        </div>

      </div>

    )}

  </div>

);
}

export default AdminWallet;