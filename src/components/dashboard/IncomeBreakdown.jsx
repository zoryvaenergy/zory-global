function IncomeBreakdown({ user }) {
  return (
    <div className="income-breakdown">

      <h3>Income Breakdown</h3>

      <div className="income-list">

        <div className="income-row">
          <span>🤝 Direct Income</span>
          <strong>
            £{Number(user?.wallet?.directIncome || 0).toFixed(2)}
          </strong>
        </div>

        <div className="income-row">
          <span>🎯 Level Income</span>
          <strong>
            £{Number(user?.wallet?.levelIncome || 0).toFixed(2)}
          </strong>
        </div>

        <div className="income-row">
          <span>🏊 Pool Income</span>
          <strong>
            £{Number(user?.wallet?.poolIncome || 0).toFixed(2)}
          </strong>
        </div>

        <div className="income-row">
          <span>🪙 Token Balance</span>
          <strong>
            {user?.token?.balance || 0}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default IncomeBreakdown;