import { useNavigate } from "react-router-dom";

function WalletSetup() {

  const navigate = useNavigate();

  const loginUrl =
    "https://global.zoryvaenergy.in/login";

  const registerUrl =
    "https://global.zoryvaenergy.in/register";

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
          Trust Wallet Setup Guide
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#AAB4C5",
            marginBottom: "35px",
          }}
        >
          Follow these steps before joining ZORY GLOBAL.
        </p>

        {/* SETUP STEPS */}

        <div style={{ lineHeight: "34px" }}>

          <p>✅ Step 1 — Install Trust Wallet</p>

          <p>✅ Step 2 — Create or Import Your Wallet</p>

          <p>✅ Step 3 — Secure Your Recovery Phrase</p>

          <p>✅ Step 4 — Switch to BNB Smart Chain</p>

          <p>✅ Step 5 — Open Trust Wallet DApp Browser</p>

          <p>✅ Step 6 — Open ZORY GLOBAL</p>

        </div>

        {/* SECURITY WARNING */}

        <div
          style={{
            marginTop: "35px",
            padding: "18px",
            borderRadius: "12px",
            background: "rgba(239,68,68,.12)",
            border: "1px solid rgba(239,68,68,.35)",
          }}
        >

          <strong>
            ⚠ Never share your Recovery Phrase.
          </strong>

          <p
            style={{
              marginTop: "10px",
              color: "#d1d5db",
              lineHeight: "24px",
            }}
          >
            ZORY GLOBAL will never ask for your Recovery
            Phrase, private key or wallet password.
          </p>

        </div>

        {/* TRUST WALLET BUTTON */}

        <button
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            background: "#2563eb",
            color: "#fff",
            fontWeight: "700",
            fontSize: "15px",
          }}
          onClick={() =>
            window.open(
              "https://trustwallet.com/download",
              "_blank"
            )
          }
        >
          📲 Install Trust Wallet
        </button>

        {/* EXISTING MEMBER */}

        <div
          style={{
            marginTop: "30px",
            padding: "22px",
            borderRadius: "14px",
            background: "#162248",
            border: "1px solid #2D3B6B",
          }}
        >

          <h2
            style={{
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            🔐 Already a Member?
          </h2>

          <p
            style={{
              color: "#AAB4C5",
              lineHeight: "24px",
              marginBottom: "18px",
            }}
          >
            Open the Login link inside your Trust Wallet
            DApp Browser and connect your registered wallet.
          </p>

          <button
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#4f46e5",
              color: "#fff",
              fontWeight: "700",
              fontSize: "15px",
            }}
            onClick={() => navigate("/login")}
          >
            🔐 Login to ZORY GLOBAL
          </button>

          <p
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: "#7f8da8",
              wordBreak: "break-all",
            }}
          >
            {loginUrl}
          </p>

        </div>

        {/* NEW USER */}

        <div
          style={{
            marginTop: "20px",
            padding: "22px",
            borderRadius: "14px",
            background: "#162248",
            border: "1px solid #2D3B6B",
          }}
        >

          <h2
            style={{
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            ✨ New User?
          </h2>

          <p
            style={{
              color: "#AAB4C5",
              lineHeight: "24px",
            }}
          >
            Ask your Sponsor for their personal Referral Link.
            Open that link directly inside the Trust Wallet
            DApp Browser to register under your Sponsor.
          </p>

          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              borderRadius: "8px",
              background: "#0b132e",
              color: "#94a3b8",
              fontSize: "13px",
              wordBreak: "break-all",
            }}
          >
            Example:
            <br />
            {registerUrl}?ref=YOUR_SPONSOR_ID
          </div>

        </div>

        {/* BACK TO HOME */}

        <button
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            border: "1px solid #2563eb",
            background: "transparent",
            color: "#fff",
            fontWeight: "700",
          }}
          onClick={() => navigate("/")}
        >
          ← Back to ZORY GLOBAL
        </button>

      </div>

    </div>
  );
}

export default WalletSetup;