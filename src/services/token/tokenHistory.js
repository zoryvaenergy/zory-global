import { ref, push, set } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function saveTokenHistory({
  userId,
  amount,
  fromUserId,
  type,
  remark,
}) {
  const historyRef = ref(database, `users/${userId}/tokenHistory`);

  const newHistoryRef = push(historyRef);

  await set(newHistoryRef, {
    transactionId: newHistoryRef.key,

    type,               // registration | referral | bonus
    amount,
    fromUserId,
    remark,

    createdAt: Date.now(),
    status: "SUCCESS",
  });
}