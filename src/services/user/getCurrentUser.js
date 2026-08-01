import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";

export async function getCurrentUser(userId) {
  try {
    const userRef = ref(database, `users/${userId}`);

    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val();
  } catch (error) {
    console.error("Get Current User Error :", error);
    return null;
  }
}