function MatrixCard({
  matrixNo,
  status,
  currentStep,
  totalSteps,
  progress,
  partners,
}) {
  const active = status === "Active";

  return (
    <div
      className={`matrix-card ${active ? "active" : "locked"}`}
    >
      <div className="matrix-header">
        <h3>Matrix {matrixNo}</h3>

        <span
          className={`matrix-status ${
            active ? "status-active" : "status-locked"
          }`}
        >
          {active ? "🟢 Active" : "🔒 Locked"}
        </span>
      </div>

      <div className="matrix-body">
        <p>
          Step {currentStep} / {totalSteps}
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <small>
          {partners} Partners
        </small>
      </div>
    </div>
  );
}

export default MatrixCard;