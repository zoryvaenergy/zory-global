function RecentIncome({ user }) {

  const totalIncome =
    Number(user?.wallet?.directIncome || 0) +
    Number(user?.wallet?.levelIncome || 0) +
    Number(user?.wallet?.poolIncome || 0);

  if (totalIncome === 0) {
    return (
      <div className="dashboard-card recent-income">

        <h3>Recent Income History</h3>

        <div className="income-empty">

          <div className="income-empty-icon">
            💼
          </div>

          <h4>No Recent Income Yet</h4>

          <p>
            Your latest Direct, Level and Pool income
            will appear here automatically.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="dashboard-card recent-income">

      <h3>Recent Income History</h3>
      <p className="recent-subtitle">
  Your latest earnings will appear here automatically.
</p>
      <div className="income-history">

        <div className="history-row">
          <div>
            <strong>🤝 Direct Income</strong>
            <p>Latest Income</p>
          </div>

          <span>
            £{Number(user?.wallet?.directIncome || 0).toFixed(2)}
          </span>
        </div>

        <div className="history-row">
          <div>
            <strong>🎯 Level Income</strong>
            <p>Latest Income</p>
          </div>

          <span>
            £{Number(user?.wallet?.levelIncome || 0).toFixed(2)}
          </span>
        </div>

        <div className="history-row">
          <div>
            <strong>🏊 Pool Income</strong>
            <p>Latest Income</p>
          </div>

          <span>
            £{Number(user?.wallet?.poolIncome || 0).toFixed(2)}
          </span>
        </div>

      </div>

    </div>
  );
}

export default RecentIncome;