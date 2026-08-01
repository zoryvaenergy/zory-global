import { ref, runTransaction } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function updateToken(userId, amount) {
  const tokenRef = ref(database, `users/${userId}/token`);

  await runTransaction(tokenRef, (token) => {
    if (!token) return token;

    token.balance = (token.balance || 0) + amount;
    token.lifetimeEarned = (token.lifetimeEarned || 0) + amount;

    return token;
  });
}