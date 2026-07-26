import "./platformPreview.css";

function PlatformPreview() {
  return (
    <div className="platform-preview">

      <div className="platform-top">
        <span className="preview-badge">
          PLATFORM PREVIEW
        </span>

        <h3>ZORY GLOBAL</h3>

        <p>Smart Community Ecosystem</p>
      </div>

      <div className="platform-grid">

        <div className="platform-card">
          <div className="platform-icon">👥</div>
          <h4>Smart Team</h4>
          <p>Powerful Network Building</p>
        </div>

        <div className="platform-card">
          <div className="platform-icon">💰</div>
          <h4>Digital Wallet</h4>
          <p>Secure Transactions</p>
        </div>

        <div className="platform-card">
          <div className="platform-icon">🎁</div>
          <h4>Rewards</h4>
          <p>Achievement Based Benefits</p>
        </div>

        <div className="platform-card">
          <div className="platform-icon">📈</div>
          <h4>Analytics</h4>
          <p>Real-Time Growth Tracking</p>
        </div>

      </div>

      <button className="explore-platform-btn">
        Explore Platform →
      </button>

    </div>
  );
}

export default PlatformPreview;