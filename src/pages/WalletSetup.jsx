import { useNavigate } from "react-router-dom";

function WalletSetup() {

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050B25",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#101935",
          border: "1px solid #2D3B6B",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Wallet Setup Guide
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#AAB4C5",
            marginBottom: "35px",
          }}
        >
          Complete these steps before joining ZORY GLOBAL.
        </p>

        <div style={{ lineHeight: "34px" }}>

          <p>✅ Step 1 — Install OKX Wallet</p>

          <p>✅ Step 2 — Create New Wallet</p>

          <p>✅ Step 3 — Save Your Secret Phrase</p>

          <p>✅ Step 4 — Confirm Secret Phrase</p>

          <p>✅ Step 5 — Switch to BNB Smart Chain</p>

          <p>✅ Step 6 — Return to ZORY GLOBAL</p>

        </div>

        <div
          style={{
            marginTop: "35px",
            padding: "18px",
            borderRadius: "12px",
            background: "rgba(239,68,68,.12)",
            border: "1px solid rgba(239,68,68,.35)",
          }}
        >
          <strong>⚠ Never share your Secret Phrase.</strong>

          <p
            style={{
              marginTop: "10px",
              color: "#d1d5db",
            }}
          >
            ZORY GLOBAL will never ask for your Secret Phrase.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "35px",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#2563eb",
              color: "#fff",
              fontWeight: "700",
            }}
            onClick={() =>
              window.open(
                "https://web3.okx.com",
                "_blank"
              )
            }
          >
            Install OKX Wallet
          </button>

          <button
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              border: "1px solid #2563eb",
              background: "transparent",
              color: "#fff",
              fontWeight: "700",
            }}
            onClick={() => navigate("/auth")}
          >
            I Already Have Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default WalletSetup;