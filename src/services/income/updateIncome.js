import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateIncome(userId, incomeType, amount) {
  const incomeRef = ref(database, `users/${userId}/income`);

  await runTransaction(incomeRef, (income) => {
    if (!income) {
      income = {
        direct: 0,
        level: 0,
        pool: 0,
      };
    }

    switch (incomeType) {
      case "direct":
        income.direct = (income.direct || 0) + amount;
        break;

      case "level":
        income.level = (income.level || 0) + amount;
        break;

      case "pool":
        income.pool = (income.pool || 0) + amount;
        break;

      default:
        break;
    }

    return income;
  });
}