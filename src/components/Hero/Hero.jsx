import "./hero.css";
import PlatformPreview from "../PlatformPreview/PlatformPreview";

function Hero() {
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
  Build Your Future Through Technology & Community
</h2>

        <p className="hero-description">
          Empowering people through technology, smart networking,
secure digital infrastructure and community-driven growth.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Join Now
          </button>

          <button className="secondary-btn">
            Learn More
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