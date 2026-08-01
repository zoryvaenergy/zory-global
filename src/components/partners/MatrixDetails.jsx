function MatrixDetails({
  onBack,
  userPool,
}) {

  const steps = [
    {
      id: 1,
      title: "Step 1",
      partners: userPool?.step1Count || 0,
      total: 3,
    },
    {
      id: 2,
      title: "Step 2",
      partners: userPool?.step2Count || 0,
      total: 9,
    },
    {
      id: 3,
      title: "Step 3",
      partners: userPool?.step3Count || 0,
      total: 27,
    },
    {
      id: 4,
      title: "Step 4",
      partners: userPool?.step4Count || 0,
      total: 81,
    },
  ];

  return (
    <div className="matrix-details">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="matrix-title">
        Matrix 1
      </h2>

      {/* Matrix Summary */}

      <div className="partner-summary">

        <div className="partner-card">
          <h3>My Sequence</h3>
          <h2>{userPool?.sequence || 0}</h2>
        </div>

        <div className="partner-card">
          <h3>Parent Sequence</h3>
          <h2>{userPool?.parentSequence || 0}</h2>
        </div>

        <div className="partner-card">
          <h3>Current Step</h3>
          <h2>{userPool?.currentStep || 1}</h2>
        </div>

        <div className="partner-card">
          <h3>Total Members</h3>
          <h2>{userPool?.totalMembers || 0}</h2>
        </div>

      </div>

      {/* Step Progress */}

      <div className="step-grid">

        {steps.map((step) => {

          const progress = Math.min(
            (step.partners / step.total) * 100,
            100
          );

          let status = "Locked";

          if (step.partners >= step.total) {

            status = "Completed";

          } else if (userPool?.currentStep === step.id) {

            status = "Active";

          }

          return (

            <div
              key={step.id}
              className={`step-card ${
                status === "Completed"
                  ? "completed-step"
                  : status === "Active"
                  ? "active-step"
                  : "locked-step"
              }`}
            >

              <div className="step-header">

                <h3>{step.title}</h3>

                <span>

                  {status === "Completed"
                    ? "✅ Completed"
                    : status === "Active"
                    ? "🟢 Active"
                    : "🔒 Locked"}

                </span>

              </div>

              <p>

                {step.partners} / {step.total} Members

              </p>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default MatrixDetails;