import { ref, get, update } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateIncome(userId, incomeType, amount) {
  const incomeRef = ref(database, `users/${userId}/income`);

  const snap = await get(incomeRef);

  let income = {
    direct: 0,
    level: 0,
    pool: 0,
  };

  if (snap.exists()) {
    income = snap.val();
  }

  const updates = {};

  switch (incomeType) {
    case "direct":
      updates.direct = (income.direct || 0) + amount;
      break;

    case "level":
      updates.level = (income.level || 0) + amount;
      break;

    case "pool":
      updates.pool = (income.pool || 0) + amount;
      break;

    default:
      return;
  }

  await update(incomeRef, updates);

  console.log("✅ Income Updated");
}