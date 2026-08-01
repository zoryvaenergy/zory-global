function StepDetails({ stepNo, totalPartners, onBack }) {
  return (
    <div className="step-details">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="matrix-title">
        Matrix 1 - Step {stepNo}
      </h2>

      <div className="step-summary-card">

        <div className="summary-header">
          <h3>Progress</h3>
          <span className="status-badge active">
            Active
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: "0%" }}
          />
        </div>

        <p className="progress-text">
          0 / {totalPartners} Partners
        </p>

      </div>

      <div className="partner-list-card">

        <div className="partner-list-header">
          <h3>Partner List</h3>
        </div>

        <div className="empty-partner">
          No Partners Found
        </div>

      </div>

    </div>
  );
}

export default StepDetails;