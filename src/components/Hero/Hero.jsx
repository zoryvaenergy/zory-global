import "./hero.css";
import PlatformPreview from "../PlatformPreview/PlatformPreview";
import { useNavigate } from "react-router-dom";
import { joinNow } from "../../services/web3/auth/joinNow";
import { useState } from "react";
import WalletModal from "../WalletModal/WalletModal";
import { detectEnvironment } from "../../services/web3/environment/detectEnvironment";
import { openTrustApp } from "../../services/web3/launch/openTrustApp";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import zoryToken from "../../assets/zorytoken.png";
function Hero() {

  const environment = detectEnvironment();

  const navigate = useNavigate();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
const [loading, setLoading] = useState(false);
const [loadingMessage, setLoadingMessage] = useState("");
  
async function handleJoinNow() {

  setLoading(true);
  setLoadingMessage("🔄 Connecting Wallet...");

  const result = await joinNow();
  await new Promise(resolve =>
  setTimeout(resolve, 1200)
);
  setLoadingMessage("🔍 Verifying Membership...");
    console.log(
      "Join Result :",
      JSON.stringify(result, null, 2)
    );

   if (result.action === "REGISTER") {

  setLoadingMessage("✨ New Wallet Detected...");

  await new Promise(resolve =>
    setTimeout(resolve, 500)
  );

  navigate("/register", {
    state: {
      wallet: result.wallet,
    },
  });

  return;
}

    if (result.action === "LOGIN") {

  setLoadingMessage("🚀 Opening Dashboard...");

  await new Promise(resolve =>
    setTimeout(resolve, 500)
  );

  navigate("/dashboard");

  return;
}
  }

  // ===============================
  // Primary Button Handler
  // ===============================
  function handlePrimaryButton() {

    // Android Chrome + Wallet not installed
    if (
      environment.isAndroid &&
      !window.ethereum
    ) {
      openTrustApp();
      return;
    }

    // Desktop / Trust Wallet Browser
    handleJoinNow();
  }

  return (
    <>
      <section className="hero">

        <div className="hero-bg">
          <div className="hero-glow hero-glow-1"></div>
          <div className="hero-glow hero-glow-2"></div>
        </div>

        {/* LEFT */}
        <div className="hero-left">

          <div className="hero-badge">
            🛡 Trusted Smart Platform
          </div>

          <h1 className="hero-title">
            ZORY <span>GLOBAL</span>
          </h1>

          <h2 className="hero-heading">
            Build Your Future Through Technology &
            Community
          </h2>

          <p className="hero-description">
            Empowering people through technology,
            smart networking, secure digital
            infrastructure and community-driven
            growth.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={handlePrimaryButton}
            >
              {
                environment.isAndroid &&
                !window.ethereum
                  ? "📲 Open Trust Wallet"
                  : "🔵 Connect Trust Wallet"
              }
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/wallet-setup")}
            >
              📱 New User? Setup Wallet
            </button>
<button
  className="download-wallet-btn"
  onClick={() =>
    window.open(
      "https://trustwallet.com/download",
      "_blank"
    )
  }
>
  📲 Download Trust Wallet
</button>
          </div>

          <div className="hero-features">

            <div className="feature-card">
              🛡 Secure Platform
            </div>

            <div className="feature-card">
              🌍 Global Community
            </div>

            <div className="feature-card">
              ⚡ Fast Registration
            </div>

          </div>

        </div>

       {/* RIGHT */}
<div className="hero-right">

  {/* ZORY TOKEN SHOWCASE */}
  <div className="token-showcase">

    <div className="token-image-wrap">
      <img
        src={zoryToken}
        alt="ZORY Token"
        className="zory-token-image"
      />
    </div>

    <div className="token-info-card">

      <h3 className="token-title">
  <img src={zoryToken} alt="ZORY Token" />
  <span>ZORY TOKEN</span>
</h3>
<div className="token-coming-soon">
  ✨ COMING SOON
</div>
      <div className="token-info-grid">

        <div className="token-info-item">
          <span>Symbol</span>
          <strong>ZORY</strong>
        </div>

        <div className="token-info-item">
          <span>Network</span>
          <strong>BNB Chain</strong>
        </div>

        <div className="token-info-item">
          <span>Total Supply</span>
          <strong>1 Billion</strong>
        </div>

      </div>

      <button
        className="tokenomics-btn"
        onClick={() => navigate("/#tokenomics")}
      >
        View Tokenomics →
      </button>

    </div>

  </div>

  {/* PLATFORM PREVIEW */}
  <PlatformPreview />

</div>

</section>

    {/*<WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        onConnected={handleJoinNow}
      />*/}
<LoadingOverlay
  show={loading}
  message={loadingMessage}
/>

    </>
  );
}

export default Hero;