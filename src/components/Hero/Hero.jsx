import "./hero.css";
import PlatformPreview from "../PlatformPreview/PlatformPreview";
import { useNavigate } from "react-router-dom";
import { joinNow } from "../../services/web3/auth/joinNow";

function Hero() {
  const navigate = useNavigate();

  async function handleJoinNow() {
    const result = await joinNow();

    console.log(
      "Join Result :",
      JSON.stringify(result, null, 2)
    );

   if (result.action === "REGISTER") {
  navigate("/register", {
    state: {
      walletAddress: result.wallet.walletAddress,
    },
  });

  return;
}
    if (result.action === "LOGIN") {
      navigate("/dashboard");
      return;
    }
  }

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      {/* LEFT SIDE */}
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
            onClick={handleJoinNow}
          >
            🔗 Connect Wallet
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/wallet-setup")}
          >
            📱 New User? Setup Wallet
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

      {/* RIGHT SIDE */}
      <div className="hero-right">
        <PlatformPreview />
      </div>

    </section>
  );
}

export default Hero;