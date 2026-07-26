import "./stats.css";

function Stats() {
  return (
    <section className="stats-section">

      <div className="stats-card">
        <span className="stats-icon">👥</span>
        <h2>125K+</h2>
        <p>Community Members</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon">🌍</span>
        <h2>25+</h2>
        <p>Countries</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon">⚡</span>
        <h2>10</h2>
        <p>Auto Pools</p>
      </div>

      <div className="stats-card">
        <span className="stats-icon">🛡️</span>
        <h2>24×7</h2>
        <p>Secure Platform</p>
      </div>

    </section>
  );
}

export default Stats;