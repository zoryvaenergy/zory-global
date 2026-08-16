import React, { useState } from "react";

import { getUserDetails } from "../../services/admin/getUserDetails";

import "../../styles/admin/adminIncome.css";

import {
  getIncomeHistory
} from "../../services/income/incomeHistory";

import {
  verifyDirectCount
} from "../../services/team/verifyDirectCount";

import {
  directIncomeRepair
} from "../../services/income/directIncomeRepair";


function AdminIncome() {

  const [userId, setUserId] =
    useState("");

  const [userData, setUserData] =
    useState(null);

  const [searchError, setSearchError] =
    useState("");

  const [searching, setSearching] =
    useState(false);

  const [incomeHistory, setIncomeHistory] =
    useState([]);

  // ==============================
  // DIRECT INCOME VERIFICATION
  // ==============================

  const [actualDirect, setActualDirect] =
    useState(0);

  const [repairing, setRepairing] =
    useState(false);

  const [repairResult, setRepairResult] =
    useState(null);


  // ========================================
  // INCOME DATA
  // ========================================

  const income =
    userData?.income || {};

  const directIncome =
    Number(income.direct || 0);

  const levelIncome =
    Number(income.level || 0);

  const poolIncome =
    Number(income.pool || 0);

  const totalIncome =
    directIncome +
    levelIncome +
    poolIncome;


  // ========================================
  // HISTORY TOTAL
  // ========================================

  const historyTotal =
    incomeHistory.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );


  const incomeMatched =
    Math.abs(
      totalIncome - historyTotal
    ) < 0.001;


  // ========================================
  // DIRECT INCOME REPAIR DATA
  // ========================================

  const walletDirectIncome =
    Number(
      userData?.wallet?.directIncome || 0
    );

  const directIncomeRate = 5;

  const expectedDirectIncome =
    actualDirect * directIncomeRate;

  const repairDifference =
    expectedDirectIncome -
    walletDirectIncome;


  // ========================================
  // SEARCH USER
  // ========================================

  const handleIncomeSearch =
    async () => {

      const searchId =
        userId.trim();

      if (!searchId) {

        setSearchError(
          "Please enter User ID"
        );

        setUserData(null);
        setIncomeHistory([]);
        setRepairResult(null);

        return;
      }

      setSearching(true);

      setSearchError("");

      setUserData(null);
      setIncomeHistory([]);
      setRepairResult(null);
      setActualDirect(0);


      try {

        const user =
          await getUserDetails(
            searchId
          );


        if (!user) {

          setSearchError(
            "User Not Found"
          );

          return;
        }


        // ==============================
        // INCOME HISTORY
        // ==============================

        const history =
          await getIncomeHistory(
            searchId
          );


        // ==============================
        // ACTUAL DIRECT COUNT
        // ==============================

        const directCount =
          await verifyDirectCount(
            searchId
          );


        setIncomeHistory(
          history
        );

        setActualDirect(
          directCount
        );

        setUserData(
          user
        );

      } catch (error) {

        console.error(
          "Income Search Error :",
          error
        );

        setSearchError(
          "Unable to load income data"
        );

      } finally {

        setSearching(false);

      }

    };


  // ========================================
  // DIRECT INCOME REPAIR
  // ========================================

  const handleDirectIncomeRepair =
    async () => {

      const repairUserId =
        userData?.userId || userId.trim();


      if (!repairUserId) {

        setRepairResult({
          success: false,
          message:
            "Please search a user first.",
        });

        return;
      }


      // ==============================
      // CONFIRMATION
      // ==============================

      const confirmRepair =
        window.confirm(
          `Repair Direct Income for ${repairUserId}?\n\n` +
          `Actual Direct Users: ${actualDirect}\n` +
          `Expected Direct Income: $${expectedDirectIncome.toFixed(2)}\n` +
          `Current Direct Income: $${walletDirectIncome.toFixed(2)}\n` +
          `Repair Amount: +$${repairDifference.toFixed(2)}`
        );


      if (!confirmRepair) {
        return;
      }


      setRepairing(true);
      setRepairResult(null);


      try {

        const result =
          await directIncomeRepair(
            repairUserId
          );


        setRepairResult(
          result
        );


        // ==============================
        // REFRESH DATA AFTER REPAIR
        // ==============================

        if (result?.repaired) {

          const refreshedUser =
            await getUserDetails(
              repairUserId
            );


          const refreshedHistory =
            await getIncomeHistory(
              repairUserId
            );


          const refreshedDirect =
            await verifyDirectCount(
              repairUserId
            );


          setUserData(
            refreshedUser
          );

          setIncomeHistory(
            refreshedHistory
          );

          setActualDirect(
            refreshedDirect
          );

        }

      } catch (error) {

        console.error(
          "Direct Income Repair Error :",
          error
        );


        setRepairResult({
          success: false,
          message:
            "Direct Income Repair Failed",
        });

      } finally {

        setRepairing(false);

      }

    };


  return (

    <section className="admin-income">


      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-income-header">

        <div>

          <span className="admin-income-label">
            INCOME MANAGEMENT
          </span>

          <h1>
            Income
          </h1>

          <p>
            Search and monitor user income
            distribution.
          </p>

        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="income-search-card">

        <div className="income-section-title">

          <div>

            <span>
              USER INCOME SEARCH
            </span>

            <h2>
              Search User
            </h2>

          </div>

        </div>


        <div className="income-search-box">

          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => {

              setUserId(
                e.target.value
              );

              setSearchError("");

            }}
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleIncomeSearch();
              }

            }}
          />


          <button
            onClick={
              handleIncomeSearch
            }
            disabled={searching}
          >

            {searching
              ? "Searching..."
              : "Search"}

          </button>

        </div>


        {searchError && (

          <p className="income-search-error">
            {searchError}
          </p>

        )}

      </div>


      {/* =========================
          INCOME SUMMARY
      ========================= */}

      {userData && (

        <div className="income-summary-card">

          <div className="income-user-header">

            <div>

              <span>
                USER INCOME PROFILE
              </span>

              <h2>
                {userData.userId || userId}
              </h2>

            </div>

          </div>


          <div className="income-summary-grid">


            <div className="income-summary-item">

              <span>
                Direct Income
              </span>

              <strong>
                ${directIncome.toFixed(2)}
              </strong>

            </div>


            <div className="income-summary-item">

              <span>
                Level Income
              </span>

              <strong>
                ${levelIncome.toFixed(2)}
              </strong>

            </div>


            <div className="income-summary-item">

              <span>
                Pool Income
              </span>

              <strong>
                ${poolIncome.toFixed(2)}
              </strong>

            </div>


            <div className="income-summary-item total">

              <span>
                Total Income
              </span>

              <strong>
                ${totalIncome.toFixed(2)}
              </strong>

            </div>

          </div>

        </div>

      )}


      {/* =========================
          INCOME HISTORY
      ========================= */}

      {userData && (

        <div className="income-history-card">

          <div className="income-user-header">

            <div>

              <span>
                INCOME HISTORY
              </span>

              <h2>
                Recent Transactions
              </h2>

            </div>

          </div>


          {incomeHistory.length === 0 ? (

            <div className="income-empty">
              No income transactions found.
            </div>

          ) : (

            <div className="income-history-list">

              {incomeHistory.map(
                (item) => (

                  <div
                    className="income-history-row"
                    key={item.id}
                  >

                    <div className="history-type">

                      <strong>
                        {item.type?.toUpperCase()}
                      </strong>

                      <span>
                        {item.remark || "-"}
                      </span>

                    </div>


                    <div className="history-from">

                      <span>
                        From User
                      </span>

                      <strong>
                        {item.fromUserId || "-"}
                      </strong>

                    </div>


                    <div className="history-amount">

                      <strong>
                        $
                        {Number(
                          item.amount || 0
                        ).toFixed(2)}
                      </strong>

                    </div>


                    <div className="history-status">

                      <span>
                        {item.status || "SUCCESS"}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      )}


      {/* =========================
          INCOME VERIFICATION
      ========================= */}

      {userData && (

        <div className="income-verification-card">

          <div className="income-user-header">

            <div>

              <span>
                INCOME VERIFICATION
              </span>

              <h2>
                Income Integrity Check
              </h2>

            </div>

          </div>


          <div className="income-verification-grid">


            <div className="verification-item">

              <span>
                Saved Direct
              </span>

              <strong>
                ${directIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Saved Level
              </span>

              <strong>
                ${levelIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Saved Pool
              </span>

              <strong>
                ${poolIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Saved Total
              </span>

              <strong>
                ${totalIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                History Total
              </span>

              <strong>
                ${historyTotal.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item verification-status">

              <span>
                Status
              </span>

              <strong>

                {incomeMatched
                  ? "✓ Income Matched"
                  : "⚠ Income Mismatch"}

              </strong>

            </div>

          </div>

        </div>

      )}


      {/* =========================
          DIRECT INCOME REPAIR
      ========================= */}

      {userData && (

        <div className="income-verification-card">

          <div className="income-user-header">

            <div>

              <span>
                DIRECT INCOME REPAIR
              </span>

              <h2>
                Direct Income Integrity
              </h2>

            </div>

          </div>


          <div className="income-verification-grid">


            <div className="verification-item">

              <span>
                Actual Direct Users
              </span>

              <strong>
                {actualDirect}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Direct Income Rate
              </span>

              <strong>
                $5.00
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Expected Direct Income
              </span>

              <strong>
                ${expectedDirectIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Current Direct Income
              </span>

              <strong>
                ${walletDirectIncome.toFixed(2)}
              </strong>

            </div>


            <div className="verification-item">

              <span>
                Repair Difference
              </span>

              <strong>

                {repairDifference > 0
                  ? `+$${repairDifference.toFixed(2)}`
                  : `$${repairDifference.toFixed(2)}`}

              </strong>

            </div>


            <div className="verification-item verification-status">

              <span>
                Repair Status
              </span>

              <strong>

                {repairDifference === 0
                  ? "✓ Correct"
                  : repairDifference > 0
                    ? "⚠ Repair Required"
                    : "⚠ Overpaid"}

              </strong>

            </div>

          </div>


          {/* =========================
              REPAIR BUTTON
          ========================= */}

          {repairDifference > 0 && (

            <div
              style={{
                marginTop: "24px"
              }}
            >

              <button
                onClick={
                  handleDirectIncomeRepair
                }
                disabled={repairing}
              >

                {repairing
                  ? "Repairing..."
                  : "Repair Direct Income"}

              </button>

            </div>

          )}


          {repairDifference === 0 && (

            <p
              className="income-empty"
              style={{
                marginTop: "20px"
              }}
            >
              ✓ Direct Income is already correct.
            </p>

          )}


          {repairDifference < 0 && (

            <p
              className="income-search-error"
              style={{
                marginTop: "20px"
              }}
            >
              ⚠ Current Direct Income is higher
              than expected. No automatic deduction
              will be performed.
            </p>

          )}


          {/* =========================
              REPAIR RESULT
          ========================= */}

          {repairResult && (

            <div
              style={{
                marginTop: "20px"
              }}
            >

              <strong>

                {repairResult.success
                  ? "✅ "
                  : "❌ "}

                {repairResult.message}

              </strong>

            </div>

          )}

        </div>

      )}

    </section>

  );
}

export default AdminIncome;