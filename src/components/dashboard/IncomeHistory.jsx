import { useEffect, useState } from "react";
import { getIncomeHistory } from "../../services/income/incomeHistory";

function IncomeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("currentUser") || "null"
        );

        if (!savedUser?.profile?.userId) {
          setLoading(false);
          return;
        }

        const data = await getIncomeHistory(
          savedUser.profile.userId
        );

        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="dashboard-card income-history">
      

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No Income History Found</p>
      ) : (
        <>
          <table className="income-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>From</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.slice(0, 5).map((item) => (
                <tr key={item.id}>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td>
                    <span className={`income-type ${item.type}`}>
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <span className="from-user">
                      {item.fromUserId}
                    </span>
                  </td>

                  <td className="income-amount">
                    £{Number(item.amount).toFixed(2)}
                  </td>

                  <td>
                    <span className="status-success">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
        </>
      )}
    </div>
  );
}

export default IncomeHistory;