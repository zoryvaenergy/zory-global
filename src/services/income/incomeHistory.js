import { ref, push, set, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

/* ==========================
   Save Income History
========================== */

export async function saveIncomeHistory({
  userId,
  type,
  amount,
  fromUserId,
  remark,
}) {
  const historyRef = ref(database, `users/${userId}/incomeHistory`);

  const newHistoryRef = push(historyRef);

  await set(newHistoryRef, {
    transactionId: newHistoryRef.key,

    type, // direct | level | pool
    amount,
    fromUserId,
    remark,

    createdAt: Date.now(),
    status: "SUCCESS",
  });
}

/* ==========================
   Get Income History
========================== */

export async function getIncomeHistory(userId) {
  try {
    const historyRef = ref(
      database,
      `users/${userId}/incomeHistory`
    );

    const snapshot = await get(historyRef);

    if (!snapshot.exists()) {
      return [];
    }

    const history = [];

    snapshot.forEach((child) => {
      history.push({
        id: child.key,
        ...child.val(),
      });
    });

    history.sort((a, b) => b.createdAt - a.createdAt);

    return history;
  } catch (error) {
    console.error("Income History Error:", error);
    return [];
  }
}